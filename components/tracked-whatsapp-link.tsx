"use client"

import * as React from "react"

import { trackGoogleAdsConversion } from "@/lib/ads"

type TrackedWhatsAppLinkProps = React.ComponentPropsWithoutRef<"a">

export const TrackedWhatsAppLink = React.forwardRef<HTMLAnchorElement, TrackedWhatsAppLinkProps>(
  function TrackedWhatsAppLink({ onClick, ...props }, ref) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event)

      if (event.defaultPrevented) return

      trackGoogleAdsConversion("whatsapp")
    }

    return <a ref={ref} onClick={handleClick} {...props} />
  }
)
