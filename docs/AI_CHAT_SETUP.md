# AI Chat Integration Setup

## Overview
The AI chat assistant is now integrated with company information from `src/data/company-info.json`. The assistant uses Google's Gemini 2.5 Flash Lite model to provide intelligent responses about the organization.

## Setup Instructions

### 1. Get Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Sign in with your Google account
3. Click "Get API key" in the left sidebar
4. Create a new API key
5. Copy the key

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**Note:** The `GEMINI_API_KEY` is used server-side only, keeping it secure.

### 3. Update Company Information

Edit `src/data/company-info.json` to customize:
- Organization details
- Academic programs
- Contact information
- Services offered
- Business hours
- Admissions information

The AI assistant will automatically use this information in its responses.

## How It Works

1. User sends a message through the chat widget
2. The message is sent to `getChatResponse()` function in `src/lib/ai-chat.ts`
3. The function includes the company information as system context
4. Google Gemini API (gemini-2.5-flash-lite) processes the request with the company context
5. Response is displayed in the chat

## Quick Questions

The chat widget shows quick question suggestions:
- "What services do you offer?"
- "How can I contact support?"
- "Tell me about pricing"
- "What are your business hours?"

Edit the `QUICK_QUESTIONS` array in `src/components/ui/ai-chat.tsx` to customize these.

## Troubleshooting

### "I'm currently in demo mode" message
- Check that `GEMINI_API_KEY` is set in `.env.local`
- Restart the development server after adding the environment variable
- Verify the API key is valid from [Google AI Studio](https://aistudio.google.com)

### API errors
- Verify your API key is valid and active
- Check your Google account has API access enabled
- Review the browser console for detailed error messages
- Ensure the `@google/genai` package is installed: `npm install @google/genai`

### Slow responses
- Gemini API calls typically take 1-3 seconds
- Consider implementing response caching for common questions

## Alternative AI Providers

To use a different AI provider (OpenAI, Claude, etc.), modify `src/lib/ai-chat.ts`:

```typescript
// Example: Using OpenAI
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const response = await client.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: userMessage }],
});
```

## Security Considerations

- Never commit API keys to version control
- Keep `GEMINI_API_KEY` in `.env.local` (not committed to git)
- Consider implementing rate limiting
- Monitor API usage in your [Google AI Studio](https://aistudio.google.com) dashboard
