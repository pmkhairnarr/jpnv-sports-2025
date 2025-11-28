// Ultra-fast CSV loader for all data types - prevent redeclaration
if (!window.MiniCSVLoader) {
class MiniCSVLoader {
    async loadCSV(url) {
        const startTime = performance.now();
        try {
            // Add timeout and optimized headers
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            // Use appropriate mode based on URL
            const isLocal = url.startsWith('./') || url.startsWith('/') || !url.includes('://');
            const fetchOptions = {
                cache: 'no-store',
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            };
            
            // Only set mode for external URLs to avoid CORS
            if (!isLocal) {
                fetchOptions.mode = 'cors';
            }
            
            const r = await fetch(url, fetchOptions);
            
            clearTimeout(timeoutId);
            
            if (!r.ok) {
                console.warn(`⚠️ HTTP ${r.status} for ${url.split('/').pop()}`);
                return null;
            }
            
            const t = await r.text();
            const lines = t.split('\n').filter(l => l.trim());
            if (lines.length < 2) return null;
            
            const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
            const result = lines.slice(1).map(line => {
                const values = line.split(',');
                const obj = {};
                headers.forEach((header, i) => {
                    obj[header] = values[i]?.trim().replace(/"/g, '') || '';
                });
                return obj;
            });
            
            console.log(`⚡ Loaded ${url.split('/').pop()} in ${(performance.now() - startTime).toFixed(2)}ms (${result.length} rows)`);
            return result;
        } catch(e) { 
            console.error(`❌ CSV load error for ${url.split('/').pop()}:`, e.name === 'AbortError' ? 'Timeout' : e.message); 
            return null; 
        }
    }

    async loadMatches() {
        // Try local file first, then GitHub as fallback
        const localUrl = './data/JPNV-Match-Schedule.csv';
        const githubUrl = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Match-Schedule.csv';
        
        let data = await this.loadCSV(`${localUrl}?v=${Date.now()}`);
        if (!data) {
            console.log('🔄 Trying GitHub fallback for matches...');
            data = await this.loadCSV(`${githubUrl}?t=${Date.now()}`);
        }
        
        return data?.map(row => ({
            date: row['Date']?.trim(),
            time: row['Time']?.trim(), 
            sport: row['Sport']?.trim(),
            competition: row['Competition']?.trim(),
            homeTeam: row['Home Team']?.trim(),
            awayTeam: row['Away Team']?.trim(),
            venue: row['Venue']?.trim(),
            status: row['Status']?.trim() || 'Scheduled'
        })) || [];
    }

    async loadTeams() {
        // Try local file first, then GitHub as fallback
        const localUrl = './data/JPNV-Teams-Information.csv';
        const githubUrl = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Teams-Information.csv';
        
        let data = await this.loadCSV(`${localUrl}?v=${Date.now()}`);
        if (!data) {
            console.log('🔄 Trying GitHub fallback for teams...');
            data = await this.loadCSV(`${githubUrl}?t=${Date.now()}`);
        }
        
        return data?.map(row => ({
            name: row['Team Name']?.trim(),
            sport: row['Sport']?.trim(),
            division: row['Division']?.trim(),
            contact: row['Contact Person']?.trim(),
            phone: row['Phone']?.trim(),
            email: row['Email']?.trim(),
            venue: row['Home Venue']?.trim(),
            color: row['Team Color']?.trim()
        })) || [];
    }

    async loadVenues() {
        // Try local file first, then GitHub as fallback
        const localUrl = './data/JPNV-Venues-List.csv';
        const githubUrl = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Venues-List.csv';
        
        let data = await this.loadCSV(`${localUrl}?v=${Date.now()}`);
        if (!data) {
            console.log('🔄 Trying GitHub fallback for venues...');
            data = await this.loadCSV(`${githubUrl}?t=${Date.now()}`);
        }
        
        return data?.map(row => ({
            name: row['Venue Name']?.trim(),
            city: row['City']?.trim(),
            state: row['State']?.trim(),
            capacity: parseInt(row['Capacity']) || 0,
            surface: row['Surface Type']?.trim(),
            type: row['Indoor/Outdoor']?.trim(),
            contact: row['Contact Number']?.trim()
        })) || [];
    }
}

// Load all data and update website - FAST MODE
const loader = new MiniCSVLoader();

console.log('⚡ Starting FAST CSV data load...');
const startTime = performance.now();

Promise.allSettled([
    loader.loadMatches(),
    loader.loadTeams(), 
    loader.loadVenues()
]).then((results) => {
    const loadTime = (performance.now() - startTime).toFixed(2);
    
    const matches = results[0].status === 'fulfilled' ? results[0].value : [];
    const teams = results[1].status === 'fulfilled' ? results[1].value : [];
    const venues = results[2].status === 'fulfilled' ? results[2].value : [];
    
    console.log('⚡ FAST CSV Data Loaded in', loadTime + 'ms:', { 
        matches: matches?.length || 0, 
        teams: teams?.length || 0, 
        venues: venues?.length || 0,
        timestamp: new Date().toLocaleTimeString(),
        errors: results.filter(r => r.status === 'rejected').length
    });
    
    // Update with available data (even if empty arrays)
    if (window.updateMatchesData) {
        console.log('📊 Updating matches display...');
        window.updateMatchesData(matches);
    }
    
    if (window.updateTeamsData) {
        console.log('👥 Updating teams display...');
        window.updateTeamsData(teams);
    }
    
    if (window.updateVenuesData) {
        console.log('🏟️ Updating venues display...');
        window.updateVenuesData(venues);
    }
    
    console.log('✅ All data updated in', (performance.now() - startTime).toFixed(2) + 'ms');
    
    // Show specific error messages if no data loaded
    const totalRecords = matches.length + teams.length + venues.length;
    if (totalRecords === 0) {
        console.warn('⚠️ No CSV data loaded - all files failed or are empty');
    }
    
    // Log any failures
    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            const names = ['matches', 'teams', 'venues'];
            console.warn(`⚠️ ${names[index]} loading failed:`, result.reason);
        }
    });
}).catch(error => {
    console.error('❌ Critical CSV loading error:', error);
    // Still try to update displays with empty data to prevent hanging
    if (window.updateMatchesData) window.updateMatchesData([]);
    if (window.updateTeamsData) window.updateTeamsData([]);
    if (window.updateVenuesData) window.updateVenuesData([]);
});

} // End of MiniCSVLoader class guard