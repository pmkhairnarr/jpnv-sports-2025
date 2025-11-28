/**
 * 🚀 JPNV Sports Lightweight CSV Loader
 * Optimized for fast loading and better performance
 */

class LiteCSVLoader {
    constructor() {
        this.baseUrl = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/';
        this.data = { matches: [], teams: [], venues: [], results: [] };
    }

    async loadMatches() {
        try {
            const response = await fetch(this.baseUrl + 'JPNV-Match-Schedule.csv');
            if (!response.ok) throw new Error('Network error');
            
            const text = await response.text();
            const lines = text.split('\n').filter(line => line.trim());
            const headers = lines[0].split(',');
            
            this.data.matches = lines.slice(1).map(line => {
                const values = line.split(',');
                return {
                    date: values[0]?.trim(),
                    time: values[1]?.trim(),
                    sport: values[2]?.trim(),
                    competition: values[3]?.trim(),
                    homeTeam: values[4]?.trim(),
                    awayTeam: values[5]?.trim(),
                    venue: values[6]?.trim(),
                    status: values[7]?.trim() || 'Scheduled',
                    score: values[8]?.trim() || '',
                    matchType: values[9]?.trim() || 'League'
                };
            });

            return this.data.matches;
        } catch (error) {
            console.log('⚠️ CSV loading failed, using static data');
            return null;
        }
    }
}

// 🚀 Lightweight initialization
let loader = null;

window.getJPNVData = () => {
    if (loader && loader.data.matches.length > 0) {
        return loader.data;
    }
    return null;
};

// Background loading - non-blocking
function loadCSVData() {
    if (!loader) {
        loader = new LiteCSVLoader();
        loader.loadMatches().then(matches => {
            if (matches && window.renderMatches) {
                console.log('✅ CSV data loaded, updating display');
                window.renderMatches(matches);
            }
        });
    }
}

// Delayed initialization to not block page load
setTimeout(loadCSVData, 1000);