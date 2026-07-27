import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title: string
  description: string
  canonical?: string
  keywords?: string
  image?: string
  imageAlt?: string
}

const BASE_URL = 'https://metermate-prepaid-meter-token-formatter.vercel.app'

const SITE_KEYWORDS = [
  'prepaid meter token formatter',
  'prepaid meter SMS formatter',
  'electricity token formatter',
  'BPDB prepaid meter token',
  'DESCO prepaid meter token',
  'NESCO prepaid meter token',
  'BREB prepaid meter',
  'prepaid meter recharge code',
  'meter token copy',
  'prepaid electricity token Bangladesh',
  'DPDC prepaid meter',
  'WZPDCL prepaid meter',
  'Palli Bidyut token',
  'Bangladesh electricity token',
].join(', ')

export function Seo({
  title: pageTitle,
  description,
  canonical,
  keywords,
  image = '/pwa-512x512.png',
  imageAlt = 'MeterMate - Prepaid Meter Token Formatter',
}: SeoProps) {
  const fullTitle = `${pageTitle} | MeterMate`
  const fullUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL
  const allKeywords = keywords ? `${keywords}, ${SITE_KEYWORDS}` : SITE_KEYWORDS

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${BASE_URL}${image}`} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content="MeterMate" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${BASE_URL}${image}`} />
      <meta name="twitter:image:alt" content={imageAlt} />

      <meta name="application-name" content="MeterMate" />
      <meta name="apple-mobile-web-app-title" content="MeterMate" />
    </Helmet>
  )
}