import React from "react";
import Script from "next/script";

type AdSenseTypes = {
  pId: string;
};

const AdSenseComponent = ({ pId }: AdSenseTypes) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
      onError={(e) => {
        console.error("AdSense script failed to load", e);
      }}
    />
  );
};

export default AdSenseComponent;