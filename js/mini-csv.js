// Ultra-fast CSV loader for all data types - prevent redeclaration
if (!window.MiniCSVLoader) {
class MiniCSVLoader {
    async loadCSV(url) {
        const startTime = performance.now();
        try {
            // Add timeout and optimized headers
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            const r = await fetch(url, { 
                cache: 'no-store',
                signal: controller.signal,
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
            
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
        const baseUrl = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Match-Schedule.csv';
        const data = await this.loadCSV(`${baseUrl}?t=${Date.now()}`);
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
        const baseUrl = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Teams-Information.csv';
        const data = await this.loadCSV(`${baseUrl}?t=${Date.now()}`);
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
        const baseUrl = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Venues-List.csv';
        const data = await this.loadCSV(`${baseUrl}?t=${Date.now()}`);
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
    
    const matches = results[0].status === 'fulfilled' ? results[0].value : null;
    const teams = results[1].status === 'fulfilled' ? results[1].value : null;
    const venues = results[2].status === 'fulfilled' ? results[2].value : null;
    
    console.log('⚡ FAST CSV Data Loaded in', loadTime + 'ms:', { 
        matches: matches?.length || 0, 
        teams: teams?.length || 0, 
        venues: venues?.length || 0,
        timestamp: new Date().toLocaleTimeString(),
        errors: results.filter(r => r.status === 'rejected').length
    });
    
    // Update immediately with available data - no delays
    if (matches && window.updateMatchesData) {
        console.log('📊 Updating matches display...');
        window.updateMatchesData(matches);
    }
    
    if (teams && window.updateTeamsData) {
        console.log('👥 Updating teams display...');
        window.updateTeamsData(teams);
    }
    
    if (venues && window.updateVenuesData) {
        console.log('🏟️ Updating venues display...');
        window.updateVenuesData(venues);
    }
    
    console.log('✅ All available data updated in', (performance.now() - startTime).toFixed(2) + 'ms');
    
    // Log any failures
    results.forEach((result, index) => {
        if (result.status === 'rejected') {
            const names = ['matches', 'teams', 'venues'];
            console.warn(`⚠️ ${names[index]} loading failed:`, result.reason);
        }
    });
});

} // End of MiniCSVLoader class guard