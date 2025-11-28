# 🚀 JPNV Sports Mobile Website - Deployment Guide

Quick deployment guide for getting the JPNV Sports mobile website running locally or on hosting platforms.

## ⚡ Quick Start (2 minutes)

### Local Development Server

**Method 1: Python (Recommended)**
```powershell
# Navigate to website directory
cd "c:\ObsidianMCP\Personal\07-JPNV\Sports 2025-26\website-content"

# Start Python server
python -m http.server 8080

# Open browser
Start-Process "http://localhost:8080"
```

**Method 2: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `jpnv-sports-mobile-website.html`
3. Select "Open with Live Server"
4. Website opens automatically in browser

**Method 3: Node.js**
```powershell
# Install http-server globally (one-time setup)
npm install -g http-server

# Navigate to website directory
cd "c:\ObsidianMCP\Personal\07-JPNV\Sports 2025-26\website-content"

# Start server
http-server -p 8080 -o

# Website opens automatically
```

## 🌐 Online Deployment

### GitHub Pages (Free)

1. **Create Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial JPNV Sports website"
   git branch -M main
   git remote add origin https://github.com/yourusername/jpnv-sports.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Save

3. **Access Website**
   - URL: `https://yourusername.github.io/jpnv-sports/jpnv-sports-mobile-website.html`

### Netlify (Recommended)

1. **Drag & Drop Deployment**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `website-content` folder to the deployment area
   - Get instant URL like `https://amazing-name-123456.netlify.app`

2. **Custom Domain Setup**
   - Domain settings → Add custom domain
   - Follow DNS configuration instructions
   - SSL certificate automatically provided

### Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd website-content
   vercel --prod
   ```

3. **Access**
   - Get instant URL
   - Configure custom domain in dashboard

## 📱 PWA Installation Testing

### Mobile Testing
1. Open website in Chrome/Safari mobile
2. Look for "Add to Home Screen" prompt
3. Install and test offline functionality
4. Verify app shortcuts and notifications

### Desktop Testing
1. Open in Chrome/Edge desktop
2. Look for install icon in address bar
3. Install as desktop app
4. Test offline mode and performance

## 🛠️ Configuration Files

### Web Server Configuration

**Apache (.htaccess)**
```apache
# Enable HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Set proper MIME types
AddType application/manifest+json .webmanifest
AddType application/javascript .js
AddType text/cache-manifest .appcache

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

**Nginx (nginx.conf)**
```nginx
server {
    listen 80;
    server_name jpnv-sports.com;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name jpnv-sports.com;
    
    root /var/www/jpnv-sports;
    index jpnv-sports-mobile-website.html;
    
    # SSL configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    
    # Cache static files
    location ~* \.(css|js|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # PWA files
    location = /sw.js {
        add_header Cache-Control "no-cache";
    }
    
    location = /manifest.json {
        add_header Content-Type "application/manifest+json";
    }
}
```

### Netlify Configuration

**netlify.toml**
```toml
[build]
  publish = "."
  
[[redirects]]
  from = "/*"
  to = "/jpnv-sports-mobile-website.html"
  status = 200

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "no-cache"

[[headers]]
  for = "/manifest.json"
  [headers.values]
    Content-Type = "application/manifest+json"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "max-age=31536000"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "max-age=31536000"
```

### Vercel Configuration

**vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/jpnv-sports-mobile-website.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache"
        }
      ]
    },
    {
      "source": "/manifest.json", 
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        }
      ]
    }
  ]
}
```

## 🔍 Testing & Validation

### PWA Testing Checklist
- [ ] Website loads without JavaScript
- [ ] Works offline after first visit
- [ ] Install prompt appears on mobile
- [ ] Service Worker registers successfully
- [ ] Manifest.json is valid
- [ ] Icons display correctly
- [ ] App shortcuts work
- [ ] Push notifications (if implemented)

### Performance Testing
```bash
# Lighthouse CLI testing
npm install -g lighthouse
lighthouse http://localhost:8080 --only-categories=performance,pwa,accessibility --output=html --output-path=./lighthouse-report.html
```

### Browser Developer Tools Testing
1. **Application Tab**
   - Check Service Worker registration
   - Verify cache storage
   - Test offline simulation

2. **Network Tab**
   - Verify resource caching
   - Check load times
   - Test slow 3G simulation

3. **Lighthouse Tab**
   - Run PWA audit
   - Check performance score
   - Review accessibility

## 🎯 Optimization Tips

### Performance Optimization
```html
<!-- Preload critical resources -->
<link rel="preload" href="fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>

<!-- Optimize images -->
<img src="icon-192.webp" alt="JPNV Sports" loading="lazy" width="192" height="192">

<!-- Minimize render blocking -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">
```

### SEO Enhancement
```html
<!-- Enhanced meta tags -->
<meta name="description" content="JPNV Sports 2025-26 season - Match schedules, team info, and live results">
<meta name="keywords" content="JPNV, sports, matches, schedules, teams, venues">
<meta property="og:title" content="JPNV Sports Mobile App">
<meta property="og:description" content="Complete sports information for JPNV 2025-26 season">
<meta property="og:image" content="https://jpnv-sports.com/icon-512.png">
<meta name="twitter:card" content="summary_large_image">

<!-- Structured data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "JPNV Sports",
  "url": "https://jpnv-sports.com",
  "sport": "Multi-sport"
}
</script>
```

## 📊 Analytics Setup

### Google Analytics 4
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Privacy-Friendly Analytics
```html
<!-- Plausible Analytics (GDPR compliant) -->
<script defer data-domain="jpnv-sports.com" src="https://plausible.io/js/plausible.js"></script>
```

## 🔒 Security Configuration

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob:;
  connect-src 'self';
  manifest-src 'self';
  worker-src 'self';
">
```

### HTTPS Configuration
- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Use HSTS headers
- Keep SSL certificates updated

## 📱 Mobile App Store Publishing

### Android (Play Store)
1. Use **PWABuilder** to create APK/AAB
2. Create developer account
3. Upload app bundle
4. Complete store listing
5. Submit for review

### iOS (App Store)  
1. Use **PWABuilder** or **Capacitor**
2. Create Apple Developer account
3. Build with Xcode
4. Submit via App Store Connect

## 🆘 Troubleshooting

### Common Issues

**Service Worker not registering:**
```javascript
// Check browser support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW registered', reg))
    .catch(err => console.error('SW failed', err));
}
```

**Manifest not loading:**
- Verify MIME type: `application/manifest+json`
- Check file path and permissions
- Validate JSON syntax

**PWA not installable:**
- Ensure HTTPS (localhost is OK for testing)
- Check manifest.json validity
- Verify Service Worker registration
- Test on different browsers

### Performance Issues
- Enable compression (gzip/brotli)
- Optimize images (WebP format)
- Minimize CSS/JavaScript
- Use CDN for static assets
- Enable browser caching

## 📞 Support

For deployment issues:
1. Check browser console for errors
2. Verify network connectivity
3. Test on different devices/browsers
4. Review server logs
5. Use browser developer tools

---

**Ready to deploy?** Choose your preferred method above and get your JPNV Sports mobile website live in minutes! 🚀