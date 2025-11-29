
class WebsiteAuth {
    constructor(config = {}) {
        this.config = { password: 'secure2025', ...config };
        this.init();
    }
    
    init() {
        if (this.isAuthenticated()) {
            this.showContent();
            return;
        }
        this.showLoginForm();
    }
    
    isAuthenticated() {
        const auth = localStorage.getItem('website_auth');
        return auth === this.hashPassword(this.config.password);
    }
    
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            hash = ((hash << 5) - hash) + password.charCodeAt(i);
            hash = hash & hash;
        }
        return hash.toString(36);
    }
    
    authenticate(password) {
        if (password === this.config.password) {
            localStorage.setItem('website_auth', this.hashPassword(password));
            this.showContent();
            return true;
        }
        return false;
    }
    
    showLoginForm() {
        document.body.innerHTML = `
            <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);font-family:sans-serif">
                <div style="background:white;padding:40px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.1);max-width:400px;width:100%">
                    <h1 style="text-align:center;margin-bottom:20px">🔒 Private Access</h1>
                    <p style="text-align:center;margin-bottom:30px;color:#666">Enter password to access this website</p>
                    <form id="loginForm">
                        <input type="password" id="password" placeholder="Enter password" style="width:100%;padding:12px;border:2px solid #ddd;border-radius:6px;font-size:16px;margin-bottom:20px;box-sizing:border-box">
                        <button type="submit" style="width:100%;background:#667eea;color:white;border:none;padding:12px;border-radius:6px;font-size:16px;cursor:pointer">Access Website</button>
                        <div id="error" style="color:red;margin-top:10px;display:none"></div>
                    </form>
                </div>
            </div>
        `;
        
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            if (!this.authenticate(password)) {
                const error = document.getElementById('error');
                error.textContent = 'Incorrect password';
                error.style.display = 'block';
                document.getElementById('password').value = '';
            }
        });
    }
    
    showContent() {
        location.reload();
    }
    
    logout() {
        localStorage.removeItem('website_auth');
        location.reload();
    }
}
window.WebsiteAuth = WebsiteAuth;