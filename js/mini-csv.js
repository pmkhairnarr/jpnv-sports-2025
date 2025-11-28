// Ultra-lite CSV loader - 20 lines only
class MiniCSVLoader {
    async loadMatches() {
        try {
            const r = await fetch('https://raw.githubusercontent.com/pmkhairnarr/jpnv-sports-2025/main/data/JPNV-Match-Schedule.csv');
            if (!r.ok) return null;
            const t = await r.text();
            const lines = t.split('\n').filter(l => l.trim());
            return lines.slice(1).map(line => {
                const v = line.split(',');
                return {
                    date: v[0]?.trim(), time: v[1]?.trim(), sport: v[2]?.trim(), 
                    homeTeam: v[4]?.trim(), awayTeam: v[5]?.trim(), venue: v[6]?.trim()
                };
            });
        } catch(e) { return null; }
    }
}

const loader = new MiniCSVLoader();
loader.loadMatches().then(data => {
    if (data && window.renderMatches) {
        console.log('CSV loaded');
        window.renderMatches(data);
    }
});