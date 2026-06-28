# Full Guide: AI Crypto Advisor

This is the concatenated master guide to building the AI Crypto Advisor application.

## Step 1: Project Setup & Architecture
1. **Repository Setup:** Initialize the Git repository and link it to GitHub.
2. **Structure:** Decide on a monorepo structure (e.g., `client/` and `server/` folders) or a full-stack Next.js app.
3. **Frontend Initialization:** Scaffold the React app using Vite or Next.js.
4. **Backend Initialization:** Scaffold the Node.js/Express server or setup Next.js API routes.
5. **Database Provisioning:** Create a free MongoDB Atlas cluster or a Supabase PostgreSQL database.

## Step 2: Backend Development & Database Integration
1. **Schema Design:** Define models for `User`, `UserPreference` (from onboarding), and `ContentFeedback` (thumbs up/down).
2. **Authentication API:** Implement `/api/auth/register` and `/api/auth/login` returning JWTs.
3. **Onboarding API:** Implement an endpoint to save the onboarding quiz answers into the user's preferences.
4. **Third-Party API Integration Services:**
   - Write a service to fetch crypto prices from CoinGecko.
   - Write a service to fetch news from CryptoPanic.
   - Write a service to prompt OpenRouter/Hugging Face for the daily insight based on user preferences.
   - Write a service to fetch a meme from Reddit.
5. **Dashboard API:** Create an endpoint `/api/dashboard` that aggregates these 4 services and returns the tailored content.
6. **Feedback API:** Create an endpoint `/api/feedback` to record thumbs up/down for specific content.

## Step 3: Frontend Development & UI/UX
1. **Design System:** Setup the global CSS, variables, and typography. Focus on a premium dark mode aesthetic with micro-animations.
2. **Routing:** Setup React Router or Next.js Pages/App router.
3. **Auth Views:** Build the Login and Signup pages with form validation.
4. **Onboarding Flow:** Build an interactive, step-by-step quiz UI for the onboarding questions.
5. **Dashboard Layout:** Build the main dashboard with a grid or card layout for the 4 sections.
6. **Integration:** Connect the frontend to the backend APIs using `fetch` or `axios`.
7. **Feedback Components:** Add thumbs up/down buttons on each dashboard card with optimistic UI updates.

## Step 4: Deployment & Finalization
1. **Backend Deployment:** Deploy the Node.js server to Render, Railway, or Glitch. Ensure environment variables (API keys, DB URIs) are set.
2. **Frontend Deployment:** Deploy the React app to Vercel or Netlify. Ensure CORS is configured properly on the backend.
3. **Testing:** Perform end-to-end testing of the registration, onboarding, and dashboard viewing flow.
4. **Documentation:** Write the final `README.md` containing the deployed app URL, the AI tools interaction summary, and the bonus conceptual explanation for model training.
