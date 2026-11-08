const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GROQ_STORAGE_KEY = 'metermate_groq_api_key'
export const GROQ_MODELS = [
  'openai/gpt-oss-120b',
  'llama-3.1-8b-instant',
  'llama-3.3-70b-versatile',
]
export const GROQ_MODEL = GROQ_MODELS[0]

export function getGroqApiKey(): string {
  const envKey = import.meta.env.VITE_GROQ_API_KEY
  if (envKey && typeof envKey === 'string' && envKey.trim().length > 0) {
    return envKey.trim()
  }
  return localStorage.getItem(GROQ_STORAGE_KEY)?.trim() || ''
}

export function setGroqApiKey(key: string): void {
  const trimmed = key.trim()
  if (trimmed) {
    localStorage.setItem(GROQ_STORAGE_KEY, trimmed)
  } else {
    localStorage.removeItem(GROQ_STORAGE_KEY)
  }
}

export interface GroqApplianceItem {
  name: string
  wattage: number
  quantity: number
  hoursPerDay: number
}

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string | null
  tool_calls?: Array<{
    id: string
    type: 'function'
    function: {
      name: string
      arguments: string
    }
  }>
  tool_call_id?: string
}

export const GROQ_TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'calculate_bill',
      description:
        'Calculates the monthly electricity bill using Bangladesh BPDB prepaid slab tariffs. Only call this after summarizing all appliances and receiving the user\'s explicit confirmation to finalize and calculate the bill.',
      parameters: {
        type: 'object',
        properties: {
          appliances: {
            type: 'array',
            description: 'List of all appliances, their wattage, quantity, and daily usage hours.',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the appliance (e.g., LED Bulb, Ceiling Fan, Refrigerator, AC)',
                },
                wattage: {
                  type: 'number',
                  description: 'Wattage rating in Watts (e.g., 10 for LED bulb, 75 for fan, 150 for fridge, 1500 for 1-ton AC)',
                },
                quantity: {
                  type: 'number',
                  description: 'Quantity / count of this appliance (e.g., 4)',
                },
                hoursPerDay: {
                  type: 'number',
                  description: 'Average hours used per day (between 0.1 and 24)',
                },
              },
              required: ['name', 'wattage', 'quantity', 'hoursPerDay'],
            },
          },
        },
        required: ['appliances'],
      },
    },
  },
]

export function buildSystemPrompt(lang: 'en' | 'bn'): string {
  if (lang === 'bn') {
    return `আপনি MeterMate-এর একজন বন্ধুত্বপূর্ণ এবং দক্ষ বিদ্যুৎ বিল ক্যালকুলেটর অ্যাসিস্ট্যান্ট।
আপনার উদ্দেশ্য হলো ব্যবহারকারীকে তার বাসায় ব্যবহৃত বৈদ্যুতিক যন্ত্রপাতি (ফ্যান, লাইট, ফ্রিজ, এসি, টিভি, ইত্যাদি) এবং ব্যবহারের সময় সম্পর্কে সহজ বাংলায় প্রশ্ন করে তথ্য সংগ্রহ করা এবং মাসিক বিদ্যুৎ বিল হিসাব করে দেওয়া।

নিয়মাবলী:
1. ব্যবহারকারীর ভাষার সাথে মিল রেখে সহজ, অমায়িক ও সাবলীল বাংলায় কথা বলুন।
2. ধাপে ধাপে প্রশ্ন করুন:
   - কোন কোন যন্ত্রপাতি ব্যবহার করেন এবং কয়টি করে আছে? (যেমন: কয়টি ফ্যান, কয়টি লাইট, ফ্রিজ ইত্যাদি)
   - প্রতিটি যন্ত্র দৈনিক আনুমানিক কত ঘণ্টা করে চলে?
3. যদি ব্যবহারকারী কোনো যন্ত্রের ওয়াট (Watt) না জানেন, তবে বাংলাদেশের সাধারণ মান ধরে নিন বা জানান (যেমন: LED লাইট ১০ ওয়াট, সিলিং ফ্যান ৭৫ ওয়াট, ফ্রিজ ১৫০ ওয়াট গড়, ১ টন এসি ১২০০ ওয়াট, ১.৫ টন এসি ১৮০০ ওয়াট, টিভি ৬০ ওয়াট, ওয়াইফাই রাউটার ১২ ওয়াট, ওয়াটার পাম্প ৭৫০ ওয়াট, মাইক্রোওয়েভ ১০০০ ওয়াট)।
4. ব্যবহারকারী একসাথে একাধিক তথ্য দিতে পারেন (যেমন: "আমার ৩টা ফ্যান ১২ ঘণ্টা আর ৪টা লাইট ৬ ঘণ্টা চলে") - সেক্ষেত্রে বুদ্ধিমানের মতো তথ্যগুলো গ্রহণ করুন এবং বাকি তথ্য চান।
5. **সবচেয়ে গুরুত্বপূর্ণ নিয়ম**: সব যন্ত্রপাতি ও ব্যবহারের সময় পাওয়ার পর, একটি পরিষ্কার তালিকা বা বুলেট পয়েন্টে সারাংশ প্রদর্শন করুন এবং ব্যবহারকারীর কাছে বিল হিসাব করার জন্য নিশ্চিতকরণ (Confirmation) চান। উদাহরণ:
   "আপনার দেওয়া তথ্যের সারাংশ:
   • ৪টি LED লাইট (১০ ওয়াট) - ৬ ঘণ্টা/দিন
   • ২টি সিলিং ফ্যান (৭৫ ওয়াট) - ১২ ঘণ্টা/দিন
   • ১টি ফ্রিজ (১৫০ ওয়াট) - ২৪ ঘণ্টা/দিন

   আপনি কি এই তথ্যের ভিত্তিতে চূড়ান্ত বিল হিসাব করতে চান?"
6. ব্যবহারকারী যখন সম্মতি দিবেন (যেমন: "হ্যাঁ", "হিসাব করুন", "ঠিক আছে", "confirm", ইত্যাদি), শুধুমাত্র তখনই 'calculate_bill' টুলটি কল করুন। সম্মতি ছাড়া কখনই 'calculate_bill' কল করবেন না।`
  }

  return `You are MeterMate's friendly and helpful electricity bill assistant for Bangladesh.
Your goal is to guide the user to calculate their monthly electricity bill by asking about their household appliances (lights, fans, fridge, AC, TV, electronics, etc.), quantities, and daily usage hours.

Rules:
1. Speak in friendly, clear English (or Bengali if the user speaks in Bengali).
2. Guide the user step-by-step:
   - Ask what appliances they have and how many of each.
   - Ask for their approximate daily usage hours.
3. If the user doesn't know the exact wattage of an appliance, suggest or use typical Bangladesh ratings (e.g., LED Bulb 10W, Ceiling Fan 75W, Refrigerator 150W avg, 1 Ton AC 1200W, 1.5 Ton AC 1800W, TV 60W, Router 12W, Water Pump 750W, Microwave 1000W).
4. Allow users to provide multiple appliances in natural language at once (e.g. "I have 4 LED lights running 6 hours and 2 fans running 12 hours").
5. **CRITICAL CONFIRMATION RULE**: Once you have collected all appliances, list a clear bulleted summary of all items (appliance, quantity, wattage, hours/day) and EXPLICITLY ASK FOR CONFIRMATION to finalize and calculate the bill. Example:
   "Here is the summary of your appliances:
   • 4× LED Bulb (10W) — 6 hrs/day
   • 2× Ceiling Fan (75W) — 12 hrs/day
   • 1× Refrigerator (150W) — 24 hrs/day

   Would you like to finalize and calculate your monthly bill now?"
6. ONLY call the 'calculate_bill' tool AFTER the user explicitly confirms (e.g., "yes", "calculate it", "sure", "proceed", "ঠিক আছে"). Never call 'calculate_bill' without user confirmation.`
}

export async function sendGroqChat({
  apiKey,
  messages,
}: {
  apiKey: string
  messages: GroqMessage[]
}): Promise<{
  content: string | null
  toolCall?: {
    id: string
    name: string
    arguments: { appliances: GroqApplianceItem[] }
  }
}> {
  if (!apiKey) {
    throw new Error('Groq API Key is missing. Please provide a valid Groq API key.')
  }

  let lastErrorMsg = ''

  for (const model of GROQ_MODELS) {
    try {
      const isReasoningModel = model.startsWith('openai/')
      const bodyPayload: Record<string, unknown> = {
        model,
        messages,
        tools: GROQ_TOOLS,
        tool_choice: 'auto',
        temperature: 1,
        max_completion_tokens: 2048,
        top_p: 1,
        stop: null,
      }
      if (isReasoningModel) {
        bodyPayload.reasoning_effort = 'medium'
      }

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(bodyPayload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorMsg =
          errorData?.error?.message || `Groq API error (${response.status}: ${response.statusText})`
        lastErrorMsg = errorMsg

        // If the model does not exist or user doesn't have access, try next model in GROQ_MODELS
        if (
          errorMsg.toLowerCase().includes('does not exist') ||
          errorMsg.toLowerCase().includes('access') ||
          response.status === 404
        ) {
          console.warn(`Model ${model} not available on this Groq key, trying fallback...`)
          continue
        }
        throw new Error(errorMsg)
      }

      const data = await response.json()
      const choice = data.choices?.[0]
      if (!choice) {
        throw new Error('Empty response received from Groq API.')
      }

      const message = choice.message
      let toolCallResult:
        | { id: string; name: string; arguments: { appliances: GroqApplianceItem[] } }
        | undefined

      if (message.tool_calls && message.tool_calls.length > 0) {
        const call = message.tool_calls[0]
        if (call.function.name === 'calculate_bill') {
          try {
            const parsedArgs = JSON.parse(call.function.arguments)
            toolCallResult = {
              id: call.id,
              name: call.function.name,
              arguments: parsedArgs,
            }
          } catch (err) {
            console.error('Failed to parse tool call arguments:', err)
          }
        }
      }

      return {
        content: message.content ?? null,
        toolCall: toolCallResult,
      }
    } catch (err) {
      if (err instanceof Error && err.message.toLowerCase().includes('does not exist')) {
        continue
      }
      throw err
    }
  }

  throw new Error(lastErrorMsg || 'All candidate Groq models failed. Please check your Groq API key.')
}
