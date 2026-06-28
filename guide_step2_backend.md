# Step 2: Backend Development & Database Integration
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
