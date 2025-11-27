
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottiePlayerProps {
  src: string;
  width?: string;
  height?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, width = '100%', height = '100%' }) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationContainer.current) {
      const anim = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: src,
      });
      return () => anim.destroy(); // Clean up on unmount
    }
  }, [src]);

  return <div ref={animationContainer} style={{ width, height }} />;
};

export default LottiePlayer;
