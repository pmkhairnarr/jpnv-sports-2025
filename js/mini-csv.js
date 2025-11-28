// Ultra-fast CSV loader for all data types
class MiniCSVLoader {
    async loadCSV(url) {
        const startTime = performance.now();
        try {
            const r = await fetch(url, { cache: 'no-store' }); // Force no cache for hard refresh
            if (!r.ok) return null;
            const t = await r.text();
            const lines = t.split('\n').filter(l => l.trim());
            if (lines.length < 2) return null;
            
            const headers = lines[0].split(',').map(h => h.trim());
            const result = lines.slice(1).map(line => {
                const values = line.split(',');
                const obj = {};
                headers.forEach((header, i) => {
                    obj[header] = values[i]?.trim() || '';
                });
                return obj;
            });
            
            console.log(`⚡ Loaded ${url.split('/').pop()} in ${(performance.now() - startTime).toFixed(2)}ms`);
            return result;
        } catch(e) { 
            console.error('❌ CSV load error for', url, ':', e); 
            return null; 
        }
    }

    async loadMatches() {
        const data = await this.loadCSV('https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Match-Schedule.csv');
        return data?.map(row => ({
            date: row['Date']?.trim(),
            time: row['Time']?.trim(), 
            sport: row['Sport']?.trim(),
            competition: row['Competition']?.trim(),
            homeTeam: row['Home Team']?.trim(),
            awayTeam: row['Away Team']?.trim(),
            venue: row['Venue']?.trim(),
            status: row['Status']?.trim() || 'Scheduled'
        }));
    }

    async loadTeams() {
        const data = await this.loadCSV('https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Teams-Information.csv');
        return data?.map(row => ({
            name: row['Team Name']?.trim(),
            sport: row['Sport']?.trim(),
            division: row['Division']?.trim(),
            contact: row['Contact Person']?.trim(),
            phone: row['Phone']?.trim(),
            email: row['Email']?.trim(),
            venue: row['Home Venue']?.trim(),
            color: row['Team Color']?.trim()
        }));
    }

    async loadVenues() {
        const data = await this.loadCSV('https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Venues-List.csv');
        return data?.map(row => ({
            name: row['Venue Name']?.trim(),
            city: row['City']?.trim(),
            state: row['State']?.trim(),
            capacity: parseInt(row['Capacity']) || 0,
            surface: row['Surface Type']?.trim(),
            type: row['Indoor/Outdoor']?.trim(),
            contact: row['Contact Number']?.trim()
        }));
    }
}

// Load all data and update website - FAST MODE
const loader = new MiniCSVLoader();

console.log('⚡ Starting FAST CSV data load...');
const startTime = performance.now();

Promise.all([
    loader.loadMatches(),
    loader.loadTeams(), 
    loader.loadVenues()
]).then(([matches, teams, venues]) => {
    const loadTime = (performance.now() - startTime).toFixed(2);
    console.log('⚡ FAST CSV Data Loaded in', loadTime + 'ms:', { 
        matches: matches?.length || 0, 
        teams: teams?.length || 0, 
        venues: venues?.length || 0,
        timestamp: new Date().toLocaleTimeString()
    });
    
    // Update immediately in parallel - no delays
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
    
    console.log('✅ All data updated successfully in', (performance.now() - startTime).toFixed(2) + 'ms');
    
}).catch(error => {
    console.error('❌ CSV Loading Error:', error);
});