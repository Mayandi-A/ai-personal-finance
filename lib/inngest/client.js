import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "finance-platform", // Unique app ID
  name: "Finance Platform",
  timeout: 600, // 10 minutes timeout
  retryFunction: async (attempt) => ({
    delay: Math.min(Math.pow(2, attempt) * 1000, 30000), // Exponential backoff with 30s max
    maxAttempts: 5, // Increased max attempts
  }),
  // Add development mode configuration
  development: {
    host: "127.0.0.1:3000", // Explicitly set development host
    timeout: 600, // 10 minutes for development
  },
});
