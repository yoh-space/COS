"use client";

import React, { use, useEffect } from "react";

type BannerAd = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
  [key: string]: string | boolean; // For any other custom
};

const BannerAd = ({ dataAdFormat, dataAdSlot, dataFullWidthResponsive }: BannerAd) => {
  return (
    useEffect(() => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
      catch (e) {
        console.error("Adsense error", e);
      }
    }, []),
    
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7604915619325589"
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    ></ins>
  );
};
export default BannerAd;