# AI Chat Integration Setup

## Overview
The AI chat assistant is integrated with company information from `src/data/company-info.json`. The assistant uses OpenRouter API with multiple AI models (DeepSeek R1T Chimera and Meta Llama 3.3 70B Instruct) to provide intelligent responses about the organization.

## Setup Instructions

### 1. Get OpenRouter API Keys
1. Go to [OpenRouter](https://openrouter.ai)
2. Sign in or create an account
3. Go to [API Keys](https://openrouter.ai/keys)
4. Create new API keys (you can create two for fallback support)
5. Copy the keys

### 2. Configure Environment Variables

Add the following to your `.env.local` file:

```env
# OpenRouter API Keys for AI ChatBot (server-side only)
OPENROUTER_API_KEY_PRIMARY=sk-or-v1-your_primary_key_here
OPENROUTER_API_KEY_SECONDARY=sk-or-v1-your_secondary_key_here
```

**Note:** These keys are used server-side only, keeping them secure. Do NOT use `NEXT_PUBLIC_` prefix.

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
2. The message is sent to `/api/ai/chat` server-side API route
3. The API route includes the company information as system context
4. OpenRouter API processes the request with either:
   - DeepSeek R1T Chimera (primary)
   - Meta Llama 3.3 70B Instruct (fallback)
5. Response is cleaned and returned to the client
6. Response is displayed in the chat

## Quick Questions

The chat widget shows quick question suggestions:
- "What programs do you offer?"
- "Tell me about research facilities"
- "How can I apply?"
- "What are the departments?"

Edit the `QUICK_QUESTIONS` array in `src/components/ui/ai-chat.tsx` to customize these.

## Troubleshooting

### "I'm currently in demo mode" message
- Check that `OPENROUTER_API_KEY_PRIMARY` or `OPENROUTER_API_KEY_SECONDARY` is set in `.env.local`
- Restart the development server after adding the environment variable
- Verify the API keys are valid on [OpenRouter](https://openrouter.ai/keys)
- Make sure you're NOT using `NEXT_PUBLIC_` prefix (keys should be server-side only)

### API errors
- Verify your API keys are valid and have credits
- Check the server console for detailed error messages
- The system will automatically try the secondary model if the primary fails

### Slow responses
- OpenRouter API calls typically take 5-15 seconds
- The system uses streaming-capable models, but responses may vary based on model load

## Architecture

```
Client (ai-chat.tsx) 
    ↓ POST /api/ai/chat
Server API Route (route.ts)
    ↓ calls OpenRouter API
OpenRouter 
    ↓ uses DeepSeek R1T or Llama 3.3
AI Response cleaned and returned
```

## Security Considerations

- API keys are stored as server-side environment variables (no `NEXT_PUBLIC_` prefix)
- Keys are never exposed to the client
- Requests are processed through our server-side API route
- Message input is sanitized and limited to 2000 characters
- Consider implementing rate limiting for production
- Monitor API usage on your [OpenRouter dashboard](https://openrouter.ai/activity)

