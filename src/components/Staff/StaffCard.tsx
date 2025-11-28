"use client";
import * as React from "react";
import Image from "next/image";
import { StaffMember } from "@/types/staff";

interface StaffCardProps {
  staff: StaffMember;
}

const StaffCard = React.forwardRef<HTMLDivElement, StaffCardProps>(
  ({ staff }, ref) => {
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
              {staff.image ? (
                <Image
                  src={staff.image}
                  alt={staff.name}
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
            <h3 className="text-xl font-bold text-white mb-2">{staff.name}</h3>
            <p className="text-blue-300 text-sm font-medium mb-2">{staff.title}</p>
            <p className="text-zinc-300 text-xs leading-relaxed">{staff.specialization}</p>
          </div>

          {/* Social Links */}
          <div className="absolute bottom-6 left-6 right-6 [transform:translate3d(0,0,26px)]">
            <div className="flex justify-center gap-3">
              {/* Email Icon */}
              <a 
                href={`mailto:${staff.email}`}
                className="group/social grid h-8 w-8 place-content-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-red-500 hover:[transform:translate3d(0,0,10px)]"
                title={staff.email}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>

              {/* Telegram Icon */}
              {staff.social?.telegram && (
                <a 
                  href={staff.social.telegram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/social grid h-8 w-8 place-content-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-sky-500 hover:[transform:translate3d(0,0,10px)]"
                  title="Telegram"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 7.293l-1.414 7.071c-.108.543-.39.677-.792.422l-2.197-1.62-1.06 1.02c-.117.117-.215.215-.44.215l.157-2.23 4.063-3.677c.177-.157-.038-.245-.274-.088l-5.025 3.17-2.165-.677c-.47-.147-.48-.47.098-.695l8.482-3.273c.397-.147.745.088.617.682z"/>
                  </svg>
                </a>
              )}

              {/* LinkedIn Icon */}
              {staff.social?.linkedin && (
                <a 
                  href={staff.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/social grid h-8 w-8 place-content-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-blue-700 hover:[transform:translate3d(0,0,10px)]"
                  title="LinkedIn"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.25 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
                  </svg>
                </a>
              )}

              {/* WhatsApp Icon */}
              {staff.social?.whatsapp && (
                <a 
                  href={staff.social.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group/social grid h-8 w-8 place-content-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-200 hover:bg-green-500 hover:[transform:translate3d(0,0,10px)]"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.732 5.41 2.124 7.738L2.792 22l8.232-2.162a9.874 9.874 0 004.736 1.204h.005c5.426 0 9.835-4.409 9.835-9.838 0-2.63-.704-5.105-2.039-7.246A9.865 9.865 0 0012.051 6.979zm0-2.979C6.371 4 1.75 8.621 1.75 14.25S6.371 24.5 12.051 24.5c2.305 0 4.475.663 6.315 1.812l.023.014 7.218-1.896-.968 7.14c.803 1.643 1.243 3.458 1.243 5.38 0 5.629-4.621 10.25-10.301 10.25z"/>
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

StaffCard.displayName = "StaffCard";

export default StaffCard;
