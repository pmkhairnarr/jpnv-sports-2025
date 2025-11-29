/**
 * 🔐 JPNV Sports - Athletic Excellence Authentication
 * Auto-generated authentication configuration
 */

const authConfig = {
    siteName: 'JPNV Sports - Athletic Excellence',
    loginPageTitle: '🔒 JPNV Sports - Athletic Excellence - Private Access',
    welcomeMessage: 'Enter password to access this website',
    password: 'sports2025', // ⚠️ Change this password!
    theme: 'modern',
    maxAttempts: 3,
    lockoutMinutes: 15
};

// Initialize authentication when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (typeof WebsiteAuth === 'undefined') {
        const script = document.createElement('script');
        script.src = 'auth/website-auth.js';
        script.onload = function() {
            window.websiteAuth = new WebsiteAuth(authConfig);
        };
        document.head.appendChild(script);
    } else {
        window.websiteAuth = new WebsiteAuth(authConfig);
    }
});