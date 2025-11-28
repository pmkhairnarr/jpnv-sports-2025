// Enhanced CSV loader for all JPNV data
class JPNVDataLoader {
    constructor() {
        this.baseURL = 'https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/';
    }

    async loadCSV(filename) {
        try {
            const response = await fetch(this.baseURL + filename + '?t=' + Date.now());
            if (!response.ok) return null;
            const text = await response.text();
            const lines = text.split('\n').filter(l => l.trim());
            if (lines.length <= 1) return [];
            
            const headers = lines[0].split(',').map(h => h.trim());
            return lines.slice(1).map(line => {
                const values = line.split(',');
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header.toLowerCase().replace(/\s+/g, '')] = values[index]?.trim() || '';
                });
                return obj;
            });
        } catch(e) { 
            console.error('Error loading CSV:', filename, e);
            return null; 
        }
    }

    async loadAllData() {
        try {
            const [matchesData, teamsData, venuesData] = await Promise.all([
                this.loadCSV('JPNV-Match-Schedule.csv'),
                this.loadCSV('JPNV-Teams-Information.csv'),
                this.loadCSV('JPNV-Venues-List.csv')
            ]);

            // Process matches
            if (matchesData && window.matches) {
                window.matches.length = 0;
                matchesData.forEach(match => {
                    window.matches.push({
                        date: match.date || match.matchdate,
                        time: match.time || match.matchtime,
                        sport: match.sport,
                        homeTeam: match.hometeam || match.team1,
                        awayTeam: match.awayteam || match.team2,
                        venue: match.venue,
                        status: match.status || 'Scheduled',
                        competition: match.competition || match.tournament || 'JPNV Sports 2025-26'
                    });
                });
                if (window.renderMatches) window.renderMatches();
            }

            // Process teams
            if (teamsData && window.teams) {
                window.teams.length = 0;
                teamsData.forEach(team => {
                    window.teams.push({
                        name: team.teamname || team.name,
                        sport: team.sport,
                        contact: team.contactperson || team.contact,
                        email: team.email,
                        phone: team.phone,
                        venue: team.homevenue || team.venue,
                        division: team.division
                    });
                });
            }

            // Process venues
            if (venuesData && window.venues) {
                window.venues.length = 0;
                venuesData.forEach(venue => {
                    window.venues.push({
                        name: venue.venuename || venue.name,
                        city: venue.city || venue.location,
                        capacity: parseInt(venue.capacity) || 0,
                        surface: venue.surface || venue.type
                    });
                });
            }

            console.log('✅ All JPNV data loaded successfully');
            console.log(`📊 Matches: ${window.matches?.length || 0}, Teams: ${window.teams?.length || 0}, Venues: ${window.venues?.length || 0}`);
            
            // Refresh current view
            const activeSection = document.querySelector('.nav-btn.active')?.dataset.section;
            if (activeSection === 'teams' && window.renderTeams) window.renderTeams();
            if (activeSection === 'venues' && window.renderVenues) window.renderVenues();
            
        } catch(error) {
            console.error('Error loading JPNV data:', error);
        }
    }
}

// Auto-load data when script loads
const jpnvLoader = new JPNVDataLoader();
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => jpnvLoader.loadAllData());
} else {
    jpnvLoader.loadAllData();
}

// Make loader available globally for refresh functionality
window.jpnvLoader = jpnvLoader;