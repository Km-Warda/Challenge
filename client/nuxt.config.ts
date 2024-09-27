
// nuxt.config.js or nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Add this server configuration for Docker
  devServer: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 3000,      // Use port 3000, or change as necessary
    https: false     // Set to true if using HTTPS, otherwise false
  },
});
