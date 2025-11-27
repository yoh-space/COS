"use client";
import React from "react";
import { teamData } from "./index";
import TeamGlassCard from "@/components/ui/team-glass-card";

export default function TeamSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-700 dark:text-white tracking-tight">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamData.map((member) => (
            <TeamGlassCard
              key={member.id}
              name={member.name}
              designation={member.designation}
              role={member.role}
              image={member.image}
              social={member.social}
            />
          ))}
        </div>
      </div>
    </section>
  );
}