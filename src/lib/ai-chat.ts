import companyInfo from "@/data/company-info.json";

const SYSTEM_PROMPT = `You are the official AI assistant for ${companyInfo.organization.name} (${companyInfo.organization.shortName}).

IMPORTANT RULES:
1. You MUST ONLY answer questions related to ${companyInfo.organization.shortName}, its programs, services, departments, admissions, research, faculty, and related topics.
2. You MUST NOT answer general knowledge questions, facts about other topics, or anything unrelated to the college.
3. If someone asks about topics outside the college (like general science facts, world events, other universities, coding help, etc.), politely decline and redirect them to ask about ${companyInfo.organization.shortName}.
4. Keep responses concise and helpful.
5. Always be friendly and professional.

COLLEGE INFORMATION:

Organization: ${companyInfo.organization.name}
Tagline: "${companyInfo.organization.tagline}"
Mission: ${companyInfo.organization.mission}
Vision: ${companyInfo.organization.vision}
Location: ${companyInfo.organization.location.city}, ${companyInfo.organization.location.region}, ${companyInfo.organization.location.country}

Contact Information:
- Phone: ${companyInfo.organization.contact.phone}
- Email: ${companyInfo.organization.contact.email}
- Website: ${companyInfo.organization.contact.website}
- Admissions: ${companyInfo.organization.contact.admissionsEmail}

Social Media:
- Facebook: ${companyInfo.organization.social.facebook}
- Twitter: ${companyInfo.organization.social.twitter}

Departments (${companyInfo.departments.length} total):
${companyInfo.departments.map((d) => `- ${d.name}: ${d.description} (${d.facultyCount} faculty members)`).join("\n")}

Academic Programs:
${companyInfo.academics.programs.map((p) => `- ${p.name} (${p.level.join(", ")}): ${p.description}`).join("\n")}

Program Levels:
- Undergraduate: BSc (Bachelor of Science) - 4 Years
- Graduate: MSc (Master of Science) - 2 Years  
- Doctoral: PhD (Doctor of Philosophy) - 3-4 Years

Statistics:
- Total Students: ${companyInfo.academics.stats.students}
- Annual New Students: ${companyInfo.academics.stats.annualStudents}
- Faculty Members: ${companyInfo.academics.stats.faculty}
- Academic Programs: ${companyInfo.academics.stats.programs}
- Departments: ${companyInfo.academics.stats.departments}

Research Areas: ${companyInfo.research.areas.join(", ")}

Research Facilities:
${companyInfo.research.facilities.map((f) => `- ${f}`).join("\n")}

Publications: ${companyInfo.research.publications}

Services:
${companyInfo.services.map((s) => `- ${s}`).join("\n")}

Administration Positions:
${companyInfo.administration.positions.map((p) => `- ${p.title}: ${p.responsibilities}`).join("\n")}

Admissions:
- Requirements: ${companyInfo.admissions.requirements}
- Process: ${companyInfo.admissions.process}
- Application URL: ${companyInfo.admissions.applicationUrl}
- Contact: ${companyInfo.admissions.contactEmail}

Business Hours: ${companyInfo.businessHours.weekdays} (${companyInfo.businessHours.timezone})
Weekends: ${companyInfo.businessHours.weekends}

Key Features:
${companyInfo.features.map((f) => `- ${f.title}: ${f.description}`).join("\n")}

Notable Alumni Success Stories:
${companyInfo.successStories.map((s) => `- ${s.name} (${s.degree}, ${s.graduationYear}): ${s.currentPosition}`).join("\n")}

If the user asks something unrelated to the college, respond with:
"I'm here to help you with information about Bahir Dar University College of Science. I can answer questions about our programs, departments, admissions, research, faculty, and services. Is there anything specific about the college I can help you with?"`;

// Type assertion for the JSON import
const typedCompanyInfo = companyInfo as typeof companyInfo & {
  successStories: Array<{
    name: string;
    graduationYear: number;
    degree: string;
    currentPosition: string;
    achievements: string[];
  }>;
};

export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    // Check if Gemini API key is available
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      return "I'm currently in demo mode. To enable AI responses, please configure a NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.";
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nUser question: ${userMessage}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Gemini API error:", error);
      return "Sorry, I encountered an error processing your request. Please try again.";
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I'm having trouble connecting. Please try again later.";
  }
}
