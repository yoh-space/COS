// BannerAd / AdSense removed for this site.
// Keep a simple placeholder component to avoid breaking imports.
"use client";

import React from "react";

type BannerAdProps = {
  dataAdSlot?: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
};

const BannerAd = (_props: BannerAdProps) => {
  // Intentionally render nothing — ads removed for governmental/university site
  return null;
};

export default BannerAd;