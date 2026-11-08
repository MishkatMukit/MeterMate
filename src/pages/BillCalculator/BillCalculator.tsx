import { useState, useEffect, useCallback, type ReactNode } from 'react'
import { KeyRound, RotateCcw, Bot, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Seo } from '@/components/common/seo'
import { WebAppStructuredData } from '@/components/common/structured-data'
import { useTranslation } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import { ChatContainer } from '@/components/chat/chat-container'
import { ChatInput } from '@/components/chat/chat-input'
import { BillSummary } from '@/components/chat/bill-summary'
import { ApiKeyDialog, ApiKeyNotice } from '@/components/chat/api-key-dialog'
import {
  sendGroqChat,
  getGroqApiKey,
  buildSystemPrompt,
  type GroqMessage,
  type GroqApplianceItem,
} from '@/lib/groq'
import { calculateBillFromItems, formatBillAsText } from '@/lib/bill-calculator'
import {
  loadPersistedChat,
  savePersistedChat,
  clearPersistedChat,
} from '@/lib/chat-storage'
import { checkRateLimit, recordRequest } from '@/lib/rate-limiter'
import type { ChatMessage, BillResult } from '@/types/bill-calculator.types'

export default function BillCalculatorPage() {
  const { lang, t } = useTranslation()
  const isBn = lang === 'bn'

  const [hasApiKey, setHasApiKey] = useState(() => Boolean(getGroqApiKey()))
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [groqHistory, setGroqHistory] = useState<GroqMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [billResult, setBillResult] = useState<BillResult | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  const makeId = () => Math.random().toString(36).substring(2, 9)

  // Initialize bot welcome fresh
  const buildInitialMessages = useCallback((): {
    initialMessages: ChatMessage[]
    initialGroq: GroqMessage[]
  } => {
    const welcome = t('bill.welcome')
    const initialGroq: GroqMessage[] = [
      {
        role: 'system',
        content: buildSystemPrompt(isBn ? 'bn' : 'en'),
      },
      {
        role: 'assistant',
        content: welcome,
      },
    ]

    const initialMessages: ChatMessage[] = [
      {
        id: makeId(),
        role: 'bot',
        content: welcome,
        timestamp: Date.now(),
        quickReplies: [
          {
            label: isBn ? '💡 লাইট ও ফ্যান' : '💡 Lights & Fans',
            value: isBn ? 'আমার ৪টি LED লাইট ও ২টি ফ্যান আছে' : 'I have 4 LED lights and 2 ceiling fans',
          },
          {
            label: isBn ? '❄️ এসি ও ফ্রিজ' : '❄️ AC & Refrigerator',
            value: isBn ? 'আমার ১টি ফ্রিজ ও ১টি ১.৫ টন এসি আছে' : 'I have 1 refrigerator and 1 1.5-ton AC',
          },
        ],
      },
    ]

    return { initialMessages, initialGroq }
  }, [t, isBn])

  // Load persisted chat on mount
  useEffect(() => {
    if (isInitialized) return

    const persisted = loadPersistedChat()
    if (persisted && persisted.messages.length > 0) {
      setMessages(persisted.messages)
      setGroqHistory(persisted.groqHistory)
      setBillResult(persisted.billResult)
    } else {
      const { initialMessages, initialGroq } = buildInitialMessages()
      setMessages(initialMessages)
      setGroqHistory(initialGroq)
    }
    setIsInitialized(true)
  }, [isInitialized, buildInitialMessages])

  // Auto-save chat session to localStorage whenever state changes
  useEffect(() => {
    if (!isInitialized || messages.length === 0) return
    savePersistedChat({
      messages,
      groqHistory,
      billResult,
    })
  }, [messages, groqHistory, billResult, isInitialized])

  // Reset / Clear chat
  const handleResetChat = () => {
    clearPersistedChat()
    const { initialMessages, initialGroq } = buildInitialMessages()
    setMessages(initialMessages)
    setGroqHistory(initialGroq)
    setBillResult(null)
    toast.success(t('bill.chatCleared'))
  }

  // Refresh API key status
  const refreshApiKeyStatus = () => {
    setHasApiKey(Boolean(getGroqApiKey()))
  }

  // Send message to Groq
  const handleSendMessage = async (userText: string) => {
    // 1. Check rate limit
    const rateCheck = checkRateLimit()
    if (!rateCheck.allowed) {
      toast.warning(t('bill.rateLimited'))
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: 'bot',
          content: `⏳ ${t('bill.rateLimited')}`,
          timestamp: Date.now(),
        },
      ])
      return
    }

    const apiKey = getGroqApiKey()
    if (!apiKey) {
      setApiKeyModalOpen(true)
      toast.error(t('bill.apiKeyRequiredNotice'))
      return
    }

    // Record request timestamp for rate limiting
    recordRequest()

    // 2. Add user message to UI and history
    const userMsgId = makeId()
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    }

    const updatedGroqHistory: GroqMessage[] = [
      ...groqHistory,
      {
        role: 'user',
        content: userText,
      },
    ]

    setMessages((prev) => [...prev, userMessage])
    setGroqHistory(updatedGroqHistory)
    setIsTyping(true)

    try {
      // 3. Call Groq API
      const response = await sendGroqChat({
        apiKey,
        messages: updatedGroqHistory,
      })

      // 4. Handle Tool Call (calculate_bill)
      if (response.toolCall && response.toolCall.name === 'calculate_bill') {
        const appliances: GroqApplianceItem[] = response.toolCall.arguments.appliances || []
        const calculated = calculateBillFromItems(appliances)
        setBillResult(calculated)

        const botReplyText =
          response.content ||
          (isBn
            ? 'আপনার সম্মতিক্রমে আমি মাসিক বিদ্যুৎ বিল হিসাব সম্পন্ন করেছি। নিচে বিস্তারিত দেখুন:'
            : 'As confirmed, I have calculated your estimated monthly electricity bill. Here is the breakdown:')

        const toolResultMsg: GroqMessage = {
          role: 'tool',
          content: JSON.stringify({ status: 'success', bill: calculated }),
          tool_call_id: response.toolCall.id,
        }

        setGroqHistory((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: response.content,
            tool_calls: [
              {
                id: response.toolCall!.id,
                type: 'function',
                function: {
                  name: response.toolCall!.name,
                  arguments: JSON.stringify(response.toolCall!.arguments),
                },
              },
            ],
          },
          toolResultMsg,
        ])

        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: 'bot',
            content: botReplyText,
            timestamp: Date.now(),
            component: 'bill-summary',
            componentProps: { result: calculated },
          },
        ])
      } else if (response.content) {
        // Plain bot reply
        setGroqHistory((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: response.content,
          },
        ])

        // Check if bot asked for confirmation to provide convenient Yes/No quick replies
        const lower = response.content.toLowerCase()
        const isAskingConfirmation =
          lower.includes('finalize') ||
          lower.includes('calculate') ||
          lower.includes('confirm') ||
          lower.includes('চূড়ান্ত') ||
          lower.includes('হিসাব করতে চান') ||
          lower.includes('সম্মতি')

        setMessages((prev) => [
          ...prev,
          {
            id: makeId(),
            role: 'bot',
            content: response.content!,
            timestamp: Date.now(),
            quickReplies: isAskingConfirmation
              ? [
                  {
                    label: isBn ? '✅ হ্যাঁ, হিসাব করুন' : '✅ Yes, calculate bill',
                    value: isBn ? 'হ্যাঁ, চূড়ান্ত বিল হিসাব করুন' : 'Yes, finalize and calculate my bill',
                  },
                  {
                    label: isBn ? '➕ আরও যন্ত্র যোগ করব' : '➕ Add more appliances',
                    value: isBn ? 'আমি আরও কিছু যন্ত্রপাতি যোগ করতে চাই' : 'I want to add more appliances first',
                  },
                ]
              : undefined,
          },
        ])
      }
    } catch (err: unknown) {
      console.error('Groq chat error:', err)
      const errorMsg =
        err instanceof Error ? err.message : 'An error occurred while connecting to Groq AI.'
      const isRateLimit =
        errorMsg.toLowerCase().includes('rate limit') ||
        errorMsg.includes('429')

      if (isRateLimit) {
        toast.warning(t('bill.rateLimited'))
      } else {
        toast.error(errorMsg)
      }

      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: 'bot',
          content: isRateLimit
            ? `⏳ ${t('bill.rateLimited')}`
            : isBn
              ? `⚠️ দুঃখিত, সংযোগে সমস্যা হয়েছে: ${errorMsg}\nঅনুগ্রহ করে আপনার Groq API Key পরীক্ষা করুন।`
              : `⚠️ Sorry, connection error: ${errorMsg}\nPlease check your Groq API key.`,
          timestamp: Date.now(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Handle copy summary
  const handleCopySummary = async () => {
    if (!billResult) return
    try {
      const text = formatBillAsText(billResult, t)
      await navigator.clipboard.writeText(text)
      toast.success(t('bill.summary.copied'))
    } catch {
      toast.error('Copy failed')
    }
  }

  // Render inline custom components
  const renderMessageComponent = (message: ChatMessage): ReactNode => {
    if (message.component === 'bill-summary' && billResult) {
      return (
        <BillSummary
          result={billResult}
          onCopy={handleCopySummary}
          onRestart={handleResetChat}
        />
      )
    }
    return null
  }

  const suggestions = [
    t('bill.suggestion1'),
    t('bill.suggestion2'),
    t('bill.suggestionConfirm'),
  ]

  return (
    <div className="mx-auto flex flex-col h-[calc(100dvh-5.5rem)] sm:h-[calc(100dvh-7rem)] max-w-2xl px-0.5 sm:px-4">
      <Seo
        title={t('bill.title')}
        description={t('bill.description')}
      />
      <WebAppStructuredData
        path="/bill-calculator"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: t('bill.title'), path: '/bill-calculator' },
        ]}
      />

      {/* Header bar */}
      <div className="mb-2 flex items-center justify-between rounded-xl border bg-card/40 px-3 py-2 text-xs backdrop-blur-xs">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <Bot className="size-4 text-primary" />
          <span>{t('bill.title')}</span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono text-primary">
            <Sparkles className="size-2.5" />
            Groq AI (GPT-OSS 120B)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setApiKeyModalOpen(true)}
            className="h-7 gap-1 px-2 text-xs"
            title="Configure Groq API Key"
          >
            <KeyRound className="size-3.5" />
            <span className="hidden sm:inline">
              {hasApiKey ? 'Groq Key ✓' : t('bill.apiKeyConfigure')}
            </span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleResetChat}
            className="size-7"
            title="Reset Chat"
            aria-label="Reset Chat"
          >
            <RotateCcw className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Notice if no API key is present */}
      {!hasApiKey && (
        <div className="mb-2">
          <ApiKeyNotice onConfigure={() => setApiKeyModalOpen(true)} />
        </div>
      )}

      {/* Chat container + input */}
      <div className="flex-1 overflow-hidden flex flex-col rounded-2xl border bg-card/50 shadow-xs">
        <ChatContainer
          messages={messages}
          isTyping={isTyping}
          onQuickReply={handleSendMessage}
          renderComponent={renderMessageComponent}
        />

        <ChatInput
          onSend={handleSendMessage}
          disabled={isTyping}
          placeholder={t('bill.chatPlaceholder')}
          suggestions={suggestions}
        />
      </div>

      {/* API Key Modal */}
      <ApiKeyDialog
        open={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onSaved={refreshApiKeyStatus}
      />
    </div>
  )
}
