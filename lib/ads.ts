declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type ConversionType = "form" | "whatsapp"

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

const conversionLabels: Record<ConversionType, string | undefined> = {
  form: process.env.NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION_LABEL,
  whatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION_LABEL,
}

type TrackConversionOptions = {
  callback?: () => void
}

export function trackGoogleAdsConversion(type: ConversionType, options?: TrackConversionOptions) {
  if (typeof window === "undefined") return false

  const label = conversionLabels[type]

  if (!window.gtag || !googleAdsId || !label) {
    options?.callback?.()
    return false
  }

  window.gtag("event", "conversion", {
    send_to: `${googleAdsId}/${label}`,
    event_callback: options?.callback,
  })

  return true
}
