"use client";
import * as React from "react";
import Image from "next/image";

interface TeamGlassCardProps {
  name: string;
  designation: string;
  role: string;
  image?: string;
  social: {
    telegram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

const TeamGlassCard = React.forwardRef<HTMLDivElement, TeamGlassCardProps>(
  ({ name, designation, role, image, social }, ref) => {
    return (
      <div
        ref={ref}
        className="group h-[350px] w-full [perspective:1000px]"
      >
        <div className="relative h-full rounded-[25px] bg-gradient-to-br from-zinc-900 to-black shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_20px_30px_25px_-20px,rgba(0,0,0,0.1)_0px_15px_20px_0px] group-hover:[transform:rotate3d(1,1,0,20deg)]">
          <div className="absolute inset-2 rounded-[30px] border-b border-l border-white/20 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]"></div>
          
          {/* Profile Image - Isolated from backdrop-blur */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50" style={{ transform: "translateX(-50%) translateZ(50px)" }}>
            <div className="relative w-24 h-24 bg-white rounded-full p-0.5 shadow-2xl ring-2 ring-white/50">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  width={88}
                  height={88}
                  className="rounded-full object-cover w-full h-full"
                  quality={100}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-full">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4c0 .7.5 1.2 1.2 1.2h16.8c.7 0 1.2-.5 1.2-1.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="absolute top-36 left-0 right-0 p-6 text-center [transform:translate3d(0,0,26px)]">
            <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
            <p className="text-blue-300 text-sm font-medium mb-2">{designation}</p>
            <p className="text-zinc-300 text-xs leading-relaxed">{role}</p>
          </div>

          {/* Social Links */}
          <div className="absolute bottom-6 left-6 right-6 [transform:translate3d(0,0,26px)]">
            <div className="flex justify-center gap-3">
              {social.telegram && (
                <a 
                  href={social.telegram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/social grid h-8 w-8 place-content-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-blue-500 hover:[transform:translate3d(0,0,10px)]"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 7.293l-1.414 7.071c-.108.543-.39.677-.792.422l-2.197-1.62-1.06 1.02c-.117.117-.215.215-.44.215l.157-2.23 4.063-3.677c.177-.157-.038-.245-.274-.088l-5.025 3.17-2.165-.677c-.47-.147-.48-.47.098-.695l8.482-3.273c.397-.147.745.088.617.682z"/>
                  </svg>
                </a>
              )}
              {social.twitter && (
                <a 
                  href={social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/social grid h-8 w-8 place-content-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-blue-400 hover:[transform:translate3d(0,0,10px)]"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z"/>
                  </svg>
                </a>
              )}
              {social.linkedin && (
                <a 
                  href={social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/social grid h-8 w-8 place-content-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-blue-700 hover:[transform:translate3d(0,0,10px)]"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.25 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
                  </svg>
                </a>
              )}
              {social.youtube && (
                <a 
                  href={social.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/social grid h-8 w-8 place-content-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-red-600 hover:[transform:translate3d(0,0,10px)]"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.692 3.5 12 3.5 12 3.5s-7.692 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 7.88 0 12 0 12s0 4.12.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.308 20.5 12 20.5 12 20.5s7.692 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 16.12 24 12 24 12s0-4.12-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
            <div className="absolute w-12 h-12 rounded-full bg-white/10 shadow-lg transition-all duration-500 ease-in-out" style={{ top: "15px", right: "15px", transform: "translate3d(0, 0, 20px)" }}></div>
            <div className="absolute w-8 h-8 rounded-full bg-white/5 shadow-lg transition-all duration-500 ease-in-out" style={{ top: "20px", right: "20px", transform: "translate3d(0, 0, 40px)" }}></div>
          </div>
        </div>
      </div>
    );
  }
);

TeamGlassCard.displayName = "TeamGlassCard";

export default TeamGlassCard;