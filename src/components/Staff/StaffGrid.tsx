"use client";
import * as React from "react";
import { StaffMember } from "@/types/staff";
import StaffCard from "./StaffCard";

interface StaffGridProps {
  staff: StaffMember[];
}

const StaffGrid = React.forwardRef<HTMLDivElement, StaffGridProps>(
  ({ staff }, ref) => {
    return (
      <div
        ref={ref}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full"
      >
        {staff.map((member, index) => (
          <div
            key={member.id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <StaffCard staff={member} />
          </div>
        ))}
      </div>
    );
  }
);

StaffGrid.displayName = "StaffGrid";

export default StaffGrid;
