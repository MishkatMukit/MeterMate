export type Language = 'en' | 'bn'

type TranslationValue = string | ((...args: string[]) => string)

type TranslationMap = Record<string, TranslationValue>

type Translations = Record<Language, TranslationMap>

export const translations: Translations = {
  en: {
    'nav.formatter': 'Formatter',
    'nav.meterCodes': 'Meter Codes',
    'nav.history': 'History',
    'nav.settings': 'Settings',
    'nav.about': 'About',

    'home.title': 'Prepaid Meter Tokens, Made Simple',
    'home.subtitle': 'Paste your prepaid meter SMS → MeterMate automatically extracts and formats the tokens.',
    'home.badge': '6 providers \u00b7 fully offline',
    'home.getStarted': 'Start Formatting',
    'home.feature.detect': 'Auto-Detect Provider',
    'home.feature.detectDesc': 'Auto-detects BPDB, BREB, DESCO, DPDC, NESCO & WZPDCL.',
    'home.feature.format': 'Readable Format',
    'home.feature.formatDesc': 'Splits long tokens into neat 4-digit groups.',
    'home.feature.privacy': '100% Private',
    'home.feature.privacyDesc': 'All processing stays in your browser. Zero uploads.',

    'home.howItWorks': 'How It Works',
    'home.before': 'Before',
    'home.after': 'After',
    'home.beforeExample': '3217407773201949846325910358843419948233',
    'home.afterExample': '3217 4077 7320 1949 8463\n2591 0358 8434 1994 8233',

    'home.providers': 'Supported Providers',

    'home.privacyTitle': 'Your Privacy Matters',
    'home.privacyText': 'All processing happens entirely in your browser. No SMS content, token digits, or meter information is ever transmitted, stored, or logged.',

    'home.demoTitle': 'See It in Action',
    'home.demoInput': 'Input SMS',
    'home.demoReady': 'Ready to Copy',
    'home.step1Title': 'Paste SMS',
    'home.step1Desc': 'Copy your recharge SMS here',
    'home.step2Title': 'Auto Format',
    'home.step2Desc': 'Provider & tokens detected instantly',
    'home.step3Title': 'Copy & Recharge',
    'home.step3Desc': 'Use tokens in your meter',
    'home.providersTitle': 'Auto-Detects Your Provider',
    'home.trust1': '100% Local Processing',
    'home.trust2': 'No Data Uploaded',
    'home.trust3': 'No Account Required',
    'home.trustTitle': 'Why Trust MeterMate',

    'home.moreFeatures': 'More Features',
    'home.meterCodes': 'Meter Codes',
    'home.meterCodesDesc': 'Browse verified keypad codes for supported meter brands and models.',
    'home.tokenHistory': 'Token History',
    'home.tokenHistoryDesc': 'View previously formatted tokens and quickly access past recharges.',
    'home.languageSupport': 'Language Support',
    'home.languageSupportDesc': 'Available in Bangla and English.',
    'home.localProcessing': 'Local Processing',
    'home.localProcessingDesc': 'All SMS parsing and formatting happens entirely in your browser. No data is uploaded or stored.',

    'formatter.title': 'Token Formatter',
    'formatter.subtitle': 'Paste your prepaid meter SMS to extract and format tokens.',
    'formatter.inputTitle': 'Input SMS',
    'formatter.placeholder': 'Paste your SMS here\u2026 e.g. BPDB: Meter 1234567890 Tk 500.00 Token: 3217407773201949846325910358843419948233',
    'formatter.parse': 'Parse Tokens',

    'token.copy': 'Copy Token',
    'token.copyAll': (count: string) => `Copy All (${count})`,
    'token.copied': (label: string) => `${label} copied`,
    'token.copyFailed': 'Clipboard copy failed. Check permissions.',
    'token.navLabel': 'Token navigation',
    'token.prev': 'Prev',
    'token.next': 'Next',
    'token.reinsertTitle': 'Reinsert this token?',
    'token.reinsertMessage': 'This token was previously marked as used. Do you want to use it again?',
    'token.reinsertConfirm': 'Reinsert Token',
    'token.reinsertCancel': 'Cancel',

    'token.skipTitle': 'Jump to this token?',
    'token.skipMessage': 'This will skip one or more tokens that haven\u2019t been used yet. Do you want to continue?',
    'token.skipConfirm': 'Jump to Token',
    'token.skipCancel': 'Cancel',

    'token.progress': (current: string, total: string) => `Token ${current} of ${total}`,
    'token.remaining': (count: string) => `${count} remaining`,
    'token.completed.title': 'All tokens completed!',
    'token.completed.count': (count: string) => `You have successfully processed all ${count} tokens.`,
    'token.completed.parseAnother': 'Parse Another SMS',
    'token.allDone': 'All done!',

    'provider.unknown': 'Unknown Provider',
    'provider.parsedSuccess': 'Parsed successfully',

    'meterInfo.title': 'Meter Information',
    'meterInfo.meterNumber': 'Meter Number',
    'meterInfo.rechargeAmount': 'Recharge Amount',
    'meterInfo.energyCost': 'Energy Cost',
    'meterInfo.totalCharge': 'Total Charge',
    'meterInfo.meterRent': 'Meter Rent',
    'meterInfo.demandCharge': 'Demand Charge',
    'meterInfo.vat': 'VAT',
    'meterInfo.rebate': 'Rebate',
    'meterInfo.transactionId': 'Transaction ID',
    'meterInfo.sequenceNumber': 'Sequence Number',

    'error.noDigits': 'No numeric token data found in this message.',
    'error.wrongLength': (count: string) =>
      `Found ${count} digits \u2014 expected a multiple of 20. Check for a missing or extra digit.`,

    'settings.title': 'Settings',
    'settings.subtitle': 'Adjust your preferences.',
    'settings.appearance': 'Appearance',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.system': 'System',
    'settings.language': 'Language',
    'settings.langEn': 'English',
    'settings.langBn': 'বাংলা',
    'settings.autoNext': 'Auto-next after copy',

    'about.title': 'About',
    'about.subtitle': 'MeterMate \u2014 Bangladesh Prepaid Meter Token Formatter',
    'about.purpose': 'Purpose',
    'about.purpose1':
      'Electricity providers in Bangladesh send prepaid recharge confirmations by SMS. These messages often contain multiple 20-digit tokens concatenated together with no clear separator.',
    'about.purpose2':
      'MeterMate automatically detects the provider, extracts the token digits, splits them into valid 20-digit tokens, and formats each into readable 4-digit blocks.',
    'about.providers': 'Supported Providers',
    'about.privacy': 'Privacy',
    'about.privacyText':
      'All processing happens entirely in your browser. No SMS content, token digits, or meter information is ever transmitted, stored, or logged. You can verify this by inspecting the network tab in your browser\u2019s developer tools.',

    'history.title': 'History',
    'history.comingSoon': 'Coming soon.',
    'history.empty': 'Your parsed token history will appear here in a future update.',
    'history.smsCopied': 'Original SMS copied',
    'history.smsCopyFailed': 'Clipboard copy failed.',

    'favorites.title': 'Favorites',
    'favorites.comingSoon': 'Coming soon.',
    'favorites.empty': 'Your saved meters will appear here in a future update.',

    'footer.privacy': 'MeterMate \u2014 - Easy • Fast • Reliable',
    'footer.tagline': 'Prepaid Meter Token Formatter',
    'footer.version': 'v1.0.0',

    'meterCodes.title': 'Meter Codes',
    'meterCodes.subtitle': 'USSD and service codes for prepaid electricity meters in Bangladesh.',
    'meterCodes.searchPlaceholder': 'Search by code or purpose\u2026',
    'meterCodes.codes': 'codes',
    'meterCodes.verified': 'Verified',
    'meterCodes.copied': (label: string) => `${label} copied`,
    'meterCodes.copyCode': 'Copy code',
    'meterCodes.noResults': 'No codes found matching your search.',
    'meterCodes.disclaimer': 'Available codes may vary depending on your electricity provider and meter firmware version. Contact your provider for the most up-to-date information.',

    'theme.title': (theme: string) => `Theme: ${theme}`,
  },

  bn: {
    'nav.formatter': 'ফরম্যাটার',
    'nav.meterCodes': 'মিটার কোড',
    'nav.history': 'ইতিহাস',
    'nav.settings': 'সেটিংস',
    'nav.about': 'সম্পর্কে',

    'home.title': 'প্রিপেইড মিটারের টোকেন, এখন আরও সহজ',
    'home.subtitle':
      'আপনার এসএমএস পেস্ট করুন → MeterMate স্বয়ংক্রিয়ভাবে টোকেন বের করে ফরম্যাট করে।',
    'home.badge': '৬টি প্রোভাইডার \u00b7 সম্পূর্ণ অফলাইন',
    'home.getStarted': 'ফরম্যাটিং শুরু করুন',
    'home.feature.detect': 'স্বয়ংক্রিয়ভাবে প্রোভাইডার শনাক্ত',
    'home.feature.detectDesc':
      'BPDB, BREB, DESCO, DPDC, NESCO ও WZPDCL স্বয়ংক্রিয় শনাক্ত করে।',
    'home.feature.format': 'সহজে পড়ার মতো ফরম্যাট',
    'home.feature.formatDesc': 'লম্বা টোকেন ৪ সংখ্যার গ্রুপে সাজায়।',
    'home.feature.privacy': 'সম্পূর্ণ নিরাপদ',
    'home.feature.privacyDesc':
      'সবকিছু আপনার ব্রাউজারেই হয়। কোনো তথ্য আপলোড হয় না।',

    'home.howItWorks': 'কিভাবে কাজ করে',
    'home.before': 'আগে',
    'home.after': 'পরে',
    'home.beforeExample': '3217407773201949846325910358843419948233',
    'home.afterExample': '3217 4077 7320 1949 8463\n2591 0358 8434 1994 8233',

    'home.providers': 'সমর্থিত প্রোভাইডার',

    'home.privacyTitle': 'গোপনীয়তা',
    'home.privacyText': 'সকল প্রক্রিয়াকরণ আপনার ব্রাউজারেই হয়। কোনো এসএমএস, টোকেন বা মিটারের তথ্য কখনও পাঠানো, সংরক্ষণ বা লগ করা হয় না।',

    'home.demoTitle': 'লাইভ উদাহরণ',
    'home.demoInput': 'ইনপুট এসএমএস',
    'home.demoReady': 'কপি করার জন্য প্রস্তুত',
    'home.step1Title': 'এসএমএস পেস্ট',
    'home.step1Desc': 'আপনার রিচার্জ এসএমএস পেস্ট করুন',
    'home.step2Title': 'অটো ফরম্যাট',
    'home.step2Desc': 'প্রোভাইডার ও টোকেন সাথে সাথে শনাক্ত',
    'home.step3Title': 'কপি ও রিচার্জ',
    'home.step3Desc': 'মিটারে ব্যবহার করুন',
    'home.providersTitle': 'স্বয়ংক্রিয় প্রোভাইডার শনাক্ত',
    'home.trust1': '১০০% লোকাল প্রক্রিয়াকরণ',
    'home.trust2': 'কোনো তথ্য আপলোড হয় না',
    'home.trust3': 'কোনো অ্যাকাউন্ট প্রয়োজন নেই',
    'home.trustTitle': 'কেন MeterMate বিশ্বস্ত',

    'home.moreFeatures': 'আরও ফিচার',
    'home.meterCodes': 'মিটার কোড',
    'home.meterCodesDesc': 'সমর্থিত মিটার ব্র্যান্ড ও মডেলের জন্য ভেরিফাইড কীপ্যাড কোড।',
    'home.tokenHistory': 'টোকেন ইতিহাস',
    'home.tokenHistoryDesc': 'পূর্ববর্তী ফরম্যাট করা টোকেন দেখুন এবং পুরনো রিচার্জে দ্রুত অ্যাক্সেস পান।',
    'home.languageSupport': 'ভাষা সমর্থন',
    'home.languageSupportDesc': 'বাংলা এবং ইংরেজিতে উপলব্ধ।',
    'home.localProcessing': 'লোকাল প্রক্রিয়াকরণ',
    'home.localProcessingDesc': 'সব এসএমএস পার্সিং ও ফরম্যাটিং আপনার ব্রাউজারেই হয়। কোনো তথ্য আপলোড বা সংরক্ষণ করা হয় না।',

    'formatter.title': 'টোকেন ফরম্যাটার',
    'formatter.subtitle':
      'আপনার প্রিপেইড মিটারের এসএমএস পেস্ট করুন। টোকেনগুলো স্বয়ংক্রিয়ভাবে বের করা হবে।',
    'formatter.inputTitle': 'এসএমএস',
    'formatter.placeholder': 'এখানে আপনার এসএমএস পেস্ট করুন...',
    'formatter.parse': 'টোকেন বের করুন',

    'token.copy': 'টোকেন কপি করুন',
    'token.copyAll': (count: string) => `সব কপি করুন (${count})`,
    'token.copied': (label: string) => `${label} কপি করা হয়েছে`,
    'token.copyFailed': 'কপি করা যায়নি। অনুগ্রহ করে ব্রাউজারের অনুমতি পরীক্ষা করুন।',
    'token.navLabel': 'টোকেন নেভিগেশন',
    'token.prev': 'পূর্ববর্তী',
    'token.next': 'পরবর্তী',
    'token.reinsertTitle': 'আবার এই টোকেন ব্যবহার করবেন?',
    'token.reinsertMessage': 'এই টোকেনটি আগে ব্যবহৃত হয়েছে। আপনি কি আবার এটি ব্যবহার করতে চান?',
    'token.reinsertConfirm': 'আবার ব্যবহার করুন',
    'token.reinsertCancel': 'না',

    'token.skipTitle': 'এই টোকেনে যাবেন?',
    'token.skipMessage': 'এক বা একাধিক টোকেন এড়িয়ে যাবে। আপনি কি চালিয়ে যেতে চান?',
    'token.skipConfirm': 'টোকেনে যান',
    'token.skipCancel': 'বাতিল',

    'token.progress': (current: string, total: string) => `টোকেন ${current} / ${total}`,
    'token.remaining': (count: string) => `বাকি ${count}`,
    'token.completed.title': 'সব টোকেন সম্পন্ন!',
    'token.completed.count': (count: string) => `${count} টি টোকেন সম্পন্ন`,
    'token.completed.parseAnother': 'আরেকটি এসএমএস পার্স করুন',
    'token.allDone': 'সব সম্পন্ন!',

    'provider.unknown': 'অজানা প্রোভাইডার',
    'provider.parsedSuccess': 'সফলভাবে পার্স করা হয়েছে',

    'meterInfo.title': 'মিটারের তথ্য',
    'meterInfo.meterNumber': 'মিটার নম্বর',
    'meterInfo.rechargeAmount': 'রিচার্জের পরিমাণ',
    'meterInfo.energyCost': 'বিদ্যুৎ খরচ',
    'meterInfo.totalCharge': 'মোট চার্জ',
    'meterInfo.meterRent': 'মিটার ভাড়া',
    'meterInfo.demandCharge': 'ডিমান্ড চার্জ',
    'meterInfo.vat': 'ভ্যাট',
    'meterInfo.rebate': 'রিবেট',
    'meterInfo.transactionId': 'লেনদেন আইডি',
    'meterInfo.sequenceNumber': 'সিকোয়েন্স নম্বর',

    'error.noDigits': 'এই এসএমএসে কোনো টোকেন পাওয়া যায়নি।',
    'error.wrongLength': (count: string) =>
      `${count}টি সংখ্যা পাওয়া গেছে। সঠিক টোকেনের দৈর্ঘ্য ২০ সংখ্যার গুণিতক হওয়া উচিত।`,

    'settings.title': 'সেটিংস',
    'settings.subtitle': 'আপনার পছন্দমতো সেটিংস পরিবর্তন করুন।',
    'settings.appearance': 'থিম',
    'settings.light': 'লাইট',
    'settings.dark': 'ডার্ক',
    'settings.system': 'সিস্টেম',
    'settings.language': 'ভাষা',
    'settings.langEn': 'English',
    'settings.langBn': 'বাংলা',
    'settings.autoNext': 'কপির পর স্বয়ংক্রিয় পরবর্তী',

    'about.title': 'সম্পর্কে',
    'about.subtitle': 'বাংলাদেশের প্রিপেইড মিটারের টোকেন ফরম্যাট করার সহজ সমাধান।',
    'about.purpose': 'কেন MeterMate?',
    'about.purpose1':
      'বাংলাদেশের বিদ্যুৎ বিতরণকারী প্রতিষ্ঠানগুলো রিচার্জের পর এসএমএস পাঠায়। এসব এসএমএসে একাধিক ২০ সংখ্যার টোকেন একসাথে থাকে, ফলে সেগুলো পড়া ও মিটারে প্রবেশ করানো ঝামেলার হয়ে যায়।',
    'about.purpose2':
      'MeterMate স্বয়ংক্রিয়ভাবে প্রোভাইডার শনাক্ত করে, টোকেনগুলো আলাদা করে এবং ৪ সংখ্যার গ্রুপে সাজিয়ে দেখায়, যাতে সহজে মিটারে প্রবেশ করানো যায়।',
    'about.providers': 'সমর্থিত প্রোভাইডার',
    'about.privacy': 'গোপনীয়তা',
    'about.privacyText':
      'সব কাজ আপনার ব্রাউজারেই হয়। আপনার এসএমএস, টোকেন বা মিটারের কোনো তথ্য কোথাও পাঠানো, সংরক্ষণ বা লগ করা হয় না।',

    'history.title': 'ইতিহাস',
    'history.comingSoon': 'শীঘ্রই আসছে',
    'history.empty': 'ভবিষ্যতের আপডেটে এখানে আপনার টোকেনের ইতিহাস দেখা যাবে।',
    'history.smsCopied': 'মূল এসএমএস কপি করা হয়েছে',
    'history.smsCopyFailed': 'ক্লিপবোর্ডে কপি করা যায়নি।',

    'favorites.title': 'সংরক্ষিত মিটার',
    'favorites.comingSoon': 'শীঘ্রই আসছে',
    'favorites.empty': 'ভবিষ্যতের আপডেটে এখানে আপনার সংরক্ষিত মিটারগুলো দেখা যাবে।',

    'footer.privacy': 'MeterMate - সহজ • দ্রুত • নিরাপদ',
    'footer.tagline': 'প্রিপেইড মিটারের টোকেন ফরম্যাটার',
    'footer.version': 'v1.0.0',

    'meterCodes.title': 'মিটার কোড',
    'meterCodes.subtitle': 'বাংলাদেশের প্রিপেইড মিটারের জন্য USSD এবং সার্ভিস কোড।',
    'meterCodes.searchPlaceholder': 'কোড বা উদ্দেশ্য অনুসারে খুঁজুন\u2026',
    'meterCodes.codes': 'কোড',
    'meterCodes.verified': 'নিশ্চিত',
    'meterCodes.copied': (label: string) => `${label} কপি করা হয়েছে`,
    'meterCodes.copyCode': 'কোড কপি করুন',
    'meterCodes.noResults': 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো কোড পাওয়া যায়নি।',
    'meterCodes.disclaimer': 'উপলব্ধ কোড আপনার বিদ্যুৎ প্রদানকারী এবং মিটার ফার্মওয়্যার সংস্করণের উপর নির্ভর করে পরিবর্তিত হতে পারে। সবচেয়ে আপ-টু-ডেট তথ্যের জন্য আপনার প্রদানকারীর সাথে যোগাযোগ করুন।',

    'theme.title': (theme: string) => `থিম: ${theme}`,
  },
}

export function t(lang: Language, key: string, ...args: string[]): string {
  const value = translations[lang][key]
  if (value === undefined) {
    const fallback = translations.en[key]
    return typeof fallback === 'function'
      ? (fallback as (...args: string[]) => string)(...args)
      : (fallback ?? key)
  }
  return typeof value === 'function' ? (value as (...args: string[]) => string)(...args) : value
}
