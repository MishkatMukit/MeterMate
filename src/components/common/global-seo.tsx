import { Helmet } from 'react-helmet-async'

export function GlobalSeo() {
  return (
    <Helmet>
      <html lang="en" />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#16A34A" />
      <meta name="color-scheme" content="light dark" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta name="format-detection" content="telephone=no" />

      <link rel="alternate" hrefLang="en" href="https://metermate-prepaid-meter-token-formatter.vercel.app" />
      <link rel="alternate" hrefLang="bn" href="https://metermate-prepaid-meter-token-formatter.vercel.app/bn" />
      <link rel="alternate" hrefLang="x-default" href="https://metermate-prepaid-meter-token-formatter.vercel.app" />

      <meta name="google-site-verification" content="iQEi6dr7Q5wXDrhPJkXxeQ_4O2RA43jZnIfurLZGLi4" />

      <meta property="og:site_name" content="MeterMate" />
      <meta name="twitter:site" content="@metermate" />

      <link rel="manifest" href="/manifest.webmanifest" />
    </Helmet>
  )
}
