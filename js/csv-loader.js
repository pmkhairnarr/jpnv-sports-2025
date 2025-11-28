/**
 * 📊 JPNV Sports CSV Dynamic Loader
 * Loads sports data from CSV files hosted on GitHub
 * Supports real-time data updates without code changes
 */

class JPNVCSVLoader {
    constructor() {
        this.baseUrl = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/';
        this.csvFiles = {
            matches: 'JPNV-Match-Schedule.csv',
            teams: 'JPNV-Teams-Information.csv',
            venues: 'JPNV-Venues-List.csv',
            results: 'JPNV-Match-Results.csv'
        };
        this.data = {
            matches: [],
            teams: [],
            venues: [],
            results: []
        };
        this.lastUpdated = null;
        this.cache = new Map();
    }

    /**
     * 🔄 Load CSV data (optimized for performance)
     */
    async loadAllData() {
        try {
            // Load only essential data first (matches)
            console.log('🚀 Loading essential data...');
            
            const matchData = await this.loadCSV('matches', this.csvFiles.matches);
            this.data.matches = matchData;
            
            // Update UI immediately with matches
            if (window.renderMatches) {
                window.renderMatches(this.data.matches);
            }
            
            // Load other data in background
            setTimeout(async () => {
                try {
                    const [teams, venues, results] = await Promise.all([
                        this.loadCSV('teams', this.csvFiles.teams),
                        this.loadCSV('venues', this.csvFiles.venues),
                        this.loadCSV('results', this.csvFiles.results)
                    ]);
                    
                    this.data.teams = teams;
                    this.data.venues = venues;
                    this.data.results = results;
                    this.lastUpdated = new Date();
                    
                    console.log('✅ All data loaded successfully!');
                } catch (error) {
                    console.log('⚠️ Using fallback data for some sections');
                }
            }, 1000);
            
            return this.data;
        } catch (error) {
            console.error('❌ Failed to load CSV data:', error);
            this.loadFallbackData();
        }
    }

    /**
     * 📥 Load individual CSV file
     */
    async loadCSV(dataType, filename) {
        const url = `${this.baseUrl}${filename}`;
        
        try {
            // Check cache first
            const cacheKey = `${dataType}_${filename}`;
            if (this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey);
                if (Date.now() - cached.timestamp < 300000) { // 5 minutes cache
                    console.log(`📱 Loading ${dataType} from cache`);
                    return cached.data;
                }
            }

            console.log(`🌐 Loading ${dataType} from: ${url}`);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const csvText = await response.text();
            const data = this.parseCSV(csvText, dataType);
            
            // Cache the data
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            console.log(`✅ Loaded ${data.length} ${dataType} records`);
            return data;
            
        } catch (error) {
            console.error(`❌ Error loading ${dataType}:`, error);
            throw error;
        }
    }

    /**
     * 🔧 Parse CSV text to JavaScript objects
     */
    parseCSV(csvText, dataType) {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length === headers.length) {
                const row = {};
                headers.forEach((header, index) => {
                    row[this.normalizeKey(header)] = values[index].trim().replace(/"/g, '');
                });
                
                // Apply data type specific transformations
                data.push(this.transformRecord(row, dataType));
            }
        }

        return data;
    }

    /**
     * 📝 Parse CSV line handling quotes and commas
     */
    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        values.push(current);
        return values;
    }

    /**
     * 🔑 Normalize CSV headers to object keys
     */
    normalizeKey(header) {
        return header
            .toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
    }

    /**
     * 🔄 Transform record based on data type
     */
    transformRecord(record, dataType) {
        switch (dataType) {
            case 'matches':
                return {
                    date: record.date,
                    time: record.time,
                    sport: record.sport,
                    competition: record.competition,
                    homeTeam: record.home_team,
                    awayTeam: record.away_team,
                    venue: record.venue,
                    status: record.status || 'Scheduled',
                    score: record.score || '',
                    matchType: record.match_type || 'League'
                };
            
            case 'teams':
                return {
                    name: record.team_name,
                    sport: record.sport,
                    division: record.division,
                    logoUrl: record.logo_url || '',
                    contact: record.contact_person,
                    phone: record.phone,
                    email: record.email,
                    homeVenue: record.home_venue,
                    founded: record.founded,
                    color: record.team_color
                };
            
            case 'venues':
                return {
                    name: record.venue_name,
                    city: record.city,
                    state: record.state,
                    address: record.address,
                    capacity: parseInt(record.capacity) || 0,
                    surface: record.surface_type,
                    type: record.indoor_outdoor,
                    facilities: record.facilities,
                    coordinates: record.gps_coordinates,
                    contact: record.contact_number
                };
            
            case 'results':
                return {
                    matchId: record.match_id,
                    date: record.date,
                    sport: record.sport,
                    homeTeam: record.home_team,
                    awayTeam: record.away_team,
                    homeScore: record.home_score,
                    awayScore: record.away_score,
                    status: record.status,
                    venue: record.venue,
                    notes: record.notes,
                    updatedOn: record.updated_on
                };
            
            default:
                return record;
        }
    }

    /**
     * 📊 Get total records count
     */
    getTotalRecords() {
        return Object.values(this.data).reduce((total, arr) => total + arr.length, 0);
    }

    /**
     * 🎨 Show loading state
     */
    showLoadingState() {
        const indicators = document.querySelectorAll('.loading-indicator');
        indicators.forEach(indicator => {
            indicator.style.display = 'block';
        });

        // Show skeleton cards
        const grids = ['matches-grid', 'teams-grid', 'venues-grid'];
        grids.forEach(gridId => {
            const grid = document.getElementById(gridId);
            if (grid) {
                grid.innerHTML = Array.from({length: 6}, () => 
                    '<div class="skeleton skeleton-match"></div>'
                ).join('');
            }
        });
    }

    /**
     * 🎨 Hide loading state
     */
    hideLoadingState() {
        const indicators = document.querySelectorAll('.loading-indicator');
        indicators.forEach(indicator => {
            indicator.style.display = 'none';
        });
    }

    /**
     * ✅ Show success message
     */
    showSuccessMessage(message) {
        this.showToast(message, 'success');
    }

    /**
     * ❌ Show error message
     */
    showErrorMessage(message) {
        this.showToast(message, 'error');
    }

    /**
     * 📢 Show toast notification
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#06b6d4'};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10001;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    /**
     * 🔄 Update UI with loaded data
     */
    updateUI() {
        // Update hero statistics
        this.updateHeroStats();
        
        // Update last updated timestamp
        this.updateLastUpdatedTime();
        
        // Re-render current section
        const activeSection = document.querySelector('.nav-btn.active')?.dataset?.section;
        if (activeSection === 'matches') {
            this.renderMatches(this.data.matches);
        } else if (activeSection === 'teams') {
            this.renderTeams(this.data.teams);
        } else if (activeSection === 'venues') {
            this.renderVenues(this.data.venues);
        }
    }

    /**
     * 📊 Update hero statistics
     */
    updateHeroStats() {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length >= 4) {
            stats[0].textContent = this.data.matches.length; // Matches
            stats[1].textContent = this.data.teams.length;   // Teams
            stats[2].textContent = [...new Set(this.data.matches.map(m => m.sport))].length; // Sports
            stats[3].textContent = this.data.venues.length;  // Venues
        }
    }

    /**
     * 🕒 Update last updated time
     */
    updateLastUpdatedTime() {
        let timeElement = document.getElementById('last-updated');
        if (!timeElement) {
            timeElement = document.createElement('div');
            timeElement.id = 'last-updated';
            timeElement.style.cssText = `
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.7rem;
                z-index: 1000;
            `;
            document.body.appendChild(timeElement);
        }
        
        if (this.lastUpdated) {
            timeElement.textContent = `📊 Updated: ${this.lastUpdated.toLocaleTimeString()}`;
        }
    }

    /**
     * 🔄 Manual refresh data
     */
    async refreshData() {
        this.cache.clear();
        await this.loadAllData();
    }

    /**
     * 💾 Load fallback data (current static data)
     */
    loadFallbackData() {
        // Use the existing jpnvData as fallback
        if (typeof jpnvData !== 'undefined') {
            this.data.matches = jpnvData.matches || [];
            this.data.teams = jpnvData.teams || [];
            this.data.venues = jpnvData.venues || [];
            this.data.results = [];
            this.updateUI();
        }
    }

    /**
     * 🎨 Render methods (delegate to existing functions)
     */
    renderMatches(matches) {
        if (typeof renderMatches === 'function') {
            renderMatches(matches);
        }
    }

    renderTeams(teams) {
        if (typeof renderTeams === 'function') {
            renderTeams(teams);
        }
    }

    renderVenues(venues) {
        if (typeof renderVenues === 'function') {
            renderVenues(venues);
        }
    }
}

// 🚀 Initialize CSV Loader
const csvLoader = new JPNVCSVLoader();

// 🎯 Global functions for integration
window.refreshJPNVData = () => csvLoader.refreshData();
window.getJPNVData = () => csvLoader.data;

// 📱 Auto-load on page load
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🏏 JPNV Sports CSV Loader initialized');
    
    // Add refresh button to header
    const refreshBtn = document.createElement('button');
    refreshBtn.className = 'nav-btn';
    refreshBtn.innerHTML = '🔄 Refresh';
    refreshBtn.onclick = () => csvLoader.refreshData();
    
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.appendChild(refreshBtn);
    }
    
    // Try to load CSV data, fallback to static data
    try {
        await csvLoader.loadAllData();
    } catch (error) {
        console.log('📱 Using static data as CSV not available');
        csvLoader.loadFallbackData();
    }
});

// 🔄 Add CSS animations for toasts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .loading-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
        z-index: 1000;
    }
`;
document.head.appendChild(style);

console.log('✅ JPNV CSV Dynamic Loader ready!');