# AI Crypto Advisor - Requirements

## Overview
A personalized crypto investor dashboard where users onboard through a quiz, and then see daily AI-curated content tailored to their interests. The app will feature a feedback loop (thumbs up/down) to help improve future recommendations.

## Tech Stack
As this is for a Junior Full Stack role, we will use a stack that is modern, widely adopted, and showcases good architecture:
- **Frontend:** React (Next.js or Vite)
- **Backend:** Node.js with Express (or Next.js API Routes for a unified full-stack approach)
- **Database:** MongoDB (using Mongoose) or PostgreSQL (using Prisma)
- **Styling:** CSS Modules or Tailwind CSS (with a focus on clean, modern, and rich aesthetics like dark mode and glassmorphism)
- **Deployment:** 
  - Frontend: Vercel or Netlify
  - Backend: Render or Railway
  - DB: MongoDB Atlas or Supabase

## Third-Party APIs (Free Tiers)
- **Coin Data:** CoinGecko API
- **News:** CryptoPanic API
- **AI / LLM:** OpenRouter or Hugging Face Inference API
- **Memes:** Reddit scraping (e.g., meme subreddits) or static JSON fallback

## Features & Deliverables
1. **Login/Signup:** Email, name, password, with JWT or session-based authentication.
2. **Onboarding Flow:** A short quiz asking for interested crypto assets, investor type (HODLer, Day Trader, etc.), and content preferences.
3. **Daily Dashboard:** 4 dynamic sections:
   - Market News
   - Coin Prices
   - AI Insight of the Day
   - Fun Crypto Meme
4. **Feedback System:** Thumbs up/down voting on each section, saved to DB.
5. **Bonus:** A written suggestion on how the feedback is stored for future model improvements.
