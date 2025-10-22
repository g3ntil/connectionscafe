// SPA Fallback Configuration
// This file helps hosting platforms understand this is a Single Page Application
module.exports = {
  rewrites: [
    {
      source: '/(.*)',
      destination: '/index.html',
    },
  ],
};
