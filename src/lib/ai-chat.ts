import companyInfo from "@/data/company-info.json";

const SYSTEM_PROMPT = `You are the official AI assistant for ${companyInfo.organization.name} (${companyInfo.organization.shortName}).

CRITICAL RESPONSE FORMAT:
- Respond ONLY with the final answer - NO thinking process, NO reasoning steps, NO internal monologue.
- Use clean, well-formatted markdown with proper headings, bullet points, and line breaks.
- Keep responses concise, organized, and easy to read.
- Do NOT include phrases like "Let me think...", "Okay, the user is asking...", "I should...", etc.

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

// OpenRouter AI Models Configuration with fallback support
interface AIModel {
  name: string;
  model: string;
  apiKey: string;
}

const AI_MODELS: AIModel[] = [
  {
    name: "DeepSeek R1T Chimera",
    model: "tngtech/deepseek-r1t-chimera:free",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY_PRIMARY || "",
  },
  {
    name: "Meta Llama 3.3 70B Instruct",
    model: "meta-llama/llama-3.3-70b-instruct:free",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY_SECONDARY || "",
  },
];

/**
 * Clean AI response by removing thinking/reasoning blocks
 * DeepSeek R1T model sometimes includes internal reasoning that shouldn't be shown
 */
function cleanAIResponse(response: string): string {
  let cleaned = response;

  // Remove <think>...</think> blocks (DeepSeek format)
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, "");

  // Remove thinking patterns at the start (common in reasoning models)
  const thinkingPatterns = [
    /^(?:Okay|Alright|Let me|I should|First|The user|I need to|I'll|Let's|I think|I understand|I see)[\s\S]*?(?=\n\n[A-Z#*-]|\n\n(?:Here|The|We|Our|At|Bahir))/i,
  ];

  for (const pattern of thinkingPatterns) {
    cleaned = cleaned.replace(pattern, "");
  }

  // Remove any remaining thinking/reasoning blocks marked with specific phrases
  cleaned = cleaned.replace(/^[\s\S]*?(?:Alright, time to put it all together[\s\S]*?\n\n)/i, "");

  // Clean up excessive whitespace
  cleaned = cleaned.replace(/^\s+/, "").replace(/\n{3,}/g, "\n\n");

  return cleaned.trim();
}

// Helper function to call OpenRouter API
async function callOpenRouter(
  model: AIModel,
  userMessage: string
): Promise<string | null> {
  try {
    if (!model.apiKey) {
      console.warn(`No API key configured for ${model.name}`);
      return null;
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${model.apiKey}`,
      },
      body: JSON.stringify({
        model: model.model,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(`${model.name} API error:`, error);
      return null;
    }

    const data = await response.json();

    if (data.choices && data.choices[0]?.message?.content) {
      // Clean the response to remove thinking/reasoning blocks
      return cleanAIResponse(data.choices[0].message.content);
    }

    console.error(`${model.name} returned unexpected response format:`, data);
    return null;
  } catch (error) {
    console.error(`${model.name} API error:`, error);
    return null;
  }
}

export async function getChatResponse(userMessage: string): Promise<string> {
  // Check if any API key is available
  const hasApiKey = AI_MODELS.some((m) => m.apiKey);

  if (!hasApiKey) {
    return "I'm currently in demo mode. To enable AI responses, please configure OpenRouter API keys in your environment variables.";
  }

  // Try each model in order until one succeeds
  for (const model of AI_MODELS) {
    console.log(`Trying ${model.name}...`);
    const response = await callOpenRouter(model, userMessage);

    if (response) {
      console.log(`Successfully got response from ${model.name}`);
      return response;
    }

    console.log(`${model.name} failed, trying next model...`);
  }

  // All models failed
  return "Sorry, I'm having trouble connecting to our AI services. Please try again later.";
}
