// 🏆 EXPANDED JPNV SPORTS DATA TEMPLATE
// Copy this data to replace the jpnvData object in your index.html (around line 815)

const jpnvData = {
    matches: [
        // CRICKET MATCHES
        {date: '2025-12-01', time: '09:00', sport: 'Cricket', competition: 'JPNV Premier League', homeTeam: 'Mumbai Warriors', awayTeam: 'Delhi Dynamos', venue: 'JPNV Cricket Ground A', status: 'Scheduled', score: '', matchType: 'League'},
        {date: '2025-12-01', time: '14:00', sport: 'Cricket', competition: 'JPNV Premier League', homeTeam: 'Kolkata Knights', awayTeam: 'Jaipur Jaguars', venue: 'JPNV Cricket Ground B', status: 'Scheduled', score: '', matchType: 'League'},
        {date: '2025-12-02', time: '09:00', sport: 'Cricket', competition: 'JPNV Premier League', homeTeam: 'Chennai Chargers', awayTeam: 'Bangalore Bulls', venue: 'JPNV Cricket Ground A', status: 'Scheduled', score: '', matchType: 'League'},
        {date: '2025-12-02', time: '14:00', sport: 'Cricket', competition: 'JPNV Premier League', homeTeam: 'Hyderabad Hawks', awayTeam: 'Pune Panthers', venue: 'JPNV Cricket Ground B', status: 'Scheduled', score: '', matchType: 'League'},
        
        // FOOTBALL MATCHES
        {date: '2025-12-03', time: '10:00', sport: 'Football', competition: 'JPNV Football Championship', homeTeam: 'JPNV FC Lions', awayTeam: 'JPNV FC Tigers', venue: 'JPNV Football Stadium', status: 'Scheduled', score: '', matchType: 'Group Stage'},
        {date: '2025-12-03', time: '15:00', sport: 'Football', competition: 'JPNV Football Championship', homeTeam: 'JPNV FC Eagles', awayTeam: 'JPNV FC Sharks', venue: 'JPNV Football Stadium', status: 'Scheduled', score: '', matchType: 'Group Stage'},
        {date: '2025-12-04', time: '10:00', sport: 'Football', competition: 'JPNV Football Championship', homeTeam: 'JPNV FC Wolves', awayTeam: 'JPNV FC Panthers', venue: 'JPNV Football Stadium', status: 'Scheduled', score: '', matchType: 'Group Stage'},
        {date: '2025-12-04', time: '15:00', sport: 'Football', competition: 'JPNV Football Championship', homeTeam: 'JPNV FC Falcons', awayTeam: 'JPNV FC Dragons', venue: 'JPNV Football Stadium', status: 'Scheduled', score: '', matchType: 'Group Stage'},
        
        // BASKETBALL MATCHES
        {date: '2025-12-05', time: '09:00', sport: 'Basketball', competition: 'JPNV Basketball Pro League', homeTeam: 'JPNV Ballers', awayTeam: 'JPNV Shooters', venue: 'JPNV Basketball Arena', status: 'Scheduled', score: '', matchType: 'Regular Season'},
        {date: '2025-12-05', time: '12:00', sport: 'Basketball', competition: 'JPNV Basketball Pro League', homeTeam: 'JPNV Dunkers', awayTeam: 'JPNV Dribblers', venue: 'JPNV Basketball Arena', status: 'Scheduled', score: '', matchType: 'Regular Season'},
        {date: '2025-12-05', time: '15:00', sport: 'Basketball', competition: 'JPNV Basketball Pro League', homeTeam: 'JPNV Slammers', awayTeam: 'JPNV Hoops', venue: 'JPNV Basketball Arena', status: 'Scheduled', score: '', matchType: 'Regular Season'},
        {date: '2025-12-05', time: '18:00', sport: 'Basketball', competition: 'JPNV Basketball Pro League', homeTeam: 'JPNV Nets', awayTeam: 'JPNV Rebounds', venue: 'JPNV Basketball Arena', status: 'Scheduled', score: '', matchType: 'Regular Season'},
        
        // TENNIS MATCHES
        {date: '2025-12-06', time: '08:00', sport: 'Tennis', competition: 'JPNV Tennis Open', homeTeam: 'JPNV Aces', awayTeam: 'JPNV Serves', venue: 'JPNV Tennis Courts', status: 'Scheduled', score: '', matchType: 'Singles'},
        {date: '2025-12-06', time: '11:00', sport: 'Tennis', competition: 'JPNV Tennis Open', homeTeam: 'JPNV Volleys', awayTeam: 'JPNV Smashers', venue: 'JPNV Tennis Courts', status: 'Scheduled', score: '', matchType: 'Doubles'},
        {date: '2025-12-06', time: '14:00', sport: 'Tennis', competition: 'JPNV Tennis Open', homeTeam: 'JPNV Rackets', awayTeam: 'JPNV Strokes', venue: 'JPNV Tennis Courts', status: 'Scheduled', score: '', matchType: 'Singles'},
        {date: '2025-12-06', time: '17:00', sport: 'Tennis', competition: 'JPNV Tennis Open', homeTeam: 'JPNV Forehands', awayTeam: 'JPNV Backhands', venue: 'JPNV Tennis Courts', status: 'Scheduled', score: '', matchType: 'Doubles'},

        // VOLLEYBALL MATCHES (NEW SPORT)
        {date: '2025-12-07', time: '09:00', sport: 'Volleyball', competition: 'JPNV Volleyball League', homeTeam: 'JPNV Spikers', awayTeam: 'JPNV Blockers', venue: 'JPNV Indoor Sports Complex', status: 'Scheduled', score: '', matchType: 'League'},
        {date: '2025-12-07', time: '12:00', sport: 'Volleyball', competition: 'JPNV Volleyball League', homeTeam: 'JPNV Setters', awayTeam: 'JPNV Diggers', venue: 'JPNV Indoor Sports Complex', status: 'Scheduled', score: '', matchType: 'League'},
        {date: '2025-12-07', time: '15:00', sport: 'Volleyball', competition: 'JPNV Volleyball League', homeTeam: 'JPNV Servers', awayTeam: 'JPNV Attackers', venue: 'JPNV Indoor Sports Complex', status: 'Scheduled', score: '', matchType: 'League'},
        {date: '2025-12-07', time: '18:00', sport: 'Volleyball', competition: 'JPNV Volleyball League', homeTeam: 'JPNV Defenders', awayTeam: 'JPNV Jumpers', venue: 'JPNV Indoor Sports Complex', status: 'Scheduled', score: '', matchType: 'League'},

        // BADMINTON MATCHES (NEW SPORT)
        {date: '2025-12-08', time: '08:00', sport: 'Badminton', competition: 'JPNV Badminton Championship', homeTeam: 'JPNV Shuttlers', awayTeam: 'JPNV Smashers', venue: 'JPNV Badminton Hall', status: 'Scheduled', score: '', matchType: 'Singles'},
        {date: '2025-12-08', time: '11:00', sport: 'Badminton', competition: 'JPNV Badminton Championship', homeTeam: 'JPNV Drops', awayTeam: 'JPNV Clears', venue: 'JPNV Badminton Hall', status: 'Scheduled', score: '', matchType: 'Doubles'},
        {date: '2025-12-08', time: '14:00', sport: 'Badminton', competition: 'JPNV Badminton Championship', homeTeam: 'JPNV Nets', awayTeam: 'JPNV Drives', venue: 'JPNV Badminton Hall', status: 'Scheduled', score: '', matchType: 'Mixed Doubles'},
        {date: '2025-12-08', time: '17:00', sport: 'Badminton', competition: 'JPNV Badminton Championship', homeTeam: 'JPNV Flicks', awayTeam: 'JPNV Lifts', venue: 'JPNV Badminton Hall', status: 'Scheduled', score: '', matchType: 'Singles'}
    ],
    
    teams: [
        // CRICKET TEAMS
        {name: 'Mumbai Warriors', sport: 'Cricket', division: 'Premier Division', contact: 'Rajesh Sharma', phone: '+91-98765-43210', email: 'rajesh.sharma@jpnvnigdi.org', homeVenue: 'JPNV Cricket Ground A', founded: '2020', color: 'Blue'},
        {name: 'Delhi Dynamos', sport: 'Cricket', division: 'Premier Division', contact: 'Priya Singh', phone: '+91-98765-43211', email: 'priya.singh@jpnvnigdi.org', homeVenue: 'JPNV Cricket Ground B', founded: '2019', color: 'Red'},
        {name: 'Chennai Chargers', sport: 'Cricket', division: 'Premier Division', contact: 'Arjun Reddy', phone: '+91-98765-43212', email: 'arjun.reddy@jpnvnigdi.org', homeVenue: 'JPNV Cricket Ground A', founded: '2021', color: 'Yellow'},
        {name: 'Bangalore Bulls', sport: 'Cricket', division: 'Premier Division', contact: 'Meera Patel', phone: '+91-98765-43213', email: 'meera.patel@jpnvnigdi.org', homeVenue: 'JPNV Cricket Ground B', founded: '2020', color: 'Orange'},
        {name: 'Kolkata Knights', sport: 'Cricket', division: 'Premier Division', contact: 'Rohit Das', phone: '+91-98765-43214', email: 'rohit.das@jpnvnigdi.org', homeVenue: 'JPNV Cricket Ground A', founded: '2018', color: 'Purple'},
        {name: 'Jaipur Jaguars', sport: 'Cricket', division: 'Premier Division', contact: 'Suresh Gupta', phone: '+91-98765-43218', email: 'suresh.gupta@jpnvnigdi.org', homeVenue: 'JPNV Cricket Ground B', founded: '2020', color: 'Pink'},
        {name: 'Hyderabad Hawks', sport: 'Cricket', division: 'Premier Division', contact: 'Vikram Rao', phone: '+91-98765-43216', email: 'vikram.rao@jpnvnigdi.org', homeVenue: 'JPNV Cricket Ground A', founded: '2019', color: 'Black'},
        {name: 'Pune Panthers', sport: 'Cricket', division: 'Premier Division', contact: 'Anita Desai', phone: '+91-98765-43215', email: 'anita.desai@jpnvnigdi.org', homeVenue: 'JPNV Cricket Ground B', founded: '2022', color: 'Green'},

        // FOOTBALL TEAMS
        {name: 'JPNV FC Lions', sport: 'Football', division: 'Championship League', contact: 'Amit Kumar', phone: '+91-98765-43220', email: 'amit.kumar@jpnvnigdi.org', homeVenue: 'JPNV Football Stadium', founded: '2021', color: 'Gold'},
        {name: 'JPNV FC Tigers', sport: 'Football', division: 'Championship League', contact: 'Sneha Patil', phone: '+91-98765-43221', email: 'sneha.patil@jpnvnigdi.org', homeVenue: 'JPNV Football Stadium', founded: '2020', color: 'Orange'},
        {name: 'JPNV FC Eagles', sport: 'Football', division: 'Championship League', contact: 'Ravi Nair', phone: '+91-98765-43222', email: 'ravi.nair@jpnvnigdi.org', homeVenue: 'JPNV Football Stadium', founded: '2022', color: 'Brown'},
        {name: 'JPNV FC Sharks', sport: 'Football', division: 'Championship League', contact: 'Pooja Joshi', phone: '+91-98765-43223', email: 'pooja.joshi@jpnvnigdi.org', homeVenue: 'JPNV Football Stadium', founded: '2019', color: 'Grey'},
        {name: 'JPNV FC Wolves', sport: 'Football', division: 'Championship League', contact: 'Deepak Yadav', phone: '+91-98765-43224', email: 'deepak.yadav@jpnvnigdi.org', homeVenue: 'JPNV Football Stadium', founded: '2021', color: 'Black'},
        {name: 'JPNV FC Panthers', sport: 'Football', division: 'Championship League', contact: 'Kavya Menon', phone: '+91-98765-43225', email: 'kavya.menon@jpnvnigdi.org', homeVenue: 'JPNV Football Stadium', founded: '2020', color: 'Pink'},
        {name: 'JPNV FC Falcons', sport: 'Football', division: 'Championship League', contact: 'Manish Agarwal', phone: '+91-98765-43226', email: 'manish.agarwal@jpnvnigdi.org', homeVenue: 'JPNV Football Stadium', founded: '2022', color: 'Red'},
        {name: 'JPNV FC Dragons', sport: 'Football', division: 'Championship League', contact: 'Rekha Sinha', phone: '+91-98765-43227', email: 'rekha.sinha@jpnvnigdi.org', homeVenue: 'JPNV Football Stadium', founded: '2019', color: 'Green'},

        // BASKETBALL TEAMS
        {name: 'JPNV Ballers', sport: 'Basketball', division: 'Pro League', contact: 'Sanjay Mehta', phone: '+91-98765-43230', email: 'sanjay.mehta@jpnvnigdi.org', homeVenue: 'JPNV Basketball Arena', founded: '2021', color: 'Purple'},
        {name: 'JPNV Shooters', sport: 'Basketball', division: 'Pro League', contact: 'Neha Kapoor', phone: '+91-98765-43231', email: 'neha.kapoor@jpnvnigdi.org', homeVenue: 'JPNV Basketball Arena', founded: '2020', color: 'Blue'},
        {name: 'JPNV Dunkers', sport: 'Basketball', division: 'Pro League', contact: 'Arun Pillai', phone: '+91-98765-43232', email: 'arun.pillai@jpnvnigdi.org', homeVenue: 'JPNV Basketball Arena', founded: '2022', color: 'Red'},
        {name: 'JPNV Dribblers', sport: 'Basketball', division: 'Pro League', contact: 'Priyanka Roy', phone: '+91-98765-43233', email: 'priyanka.roy@jpnvnigdi.org', homeVenue: 'JPNV Basketball Arena', founded: '2019', color: 'Yellow'},
        {name: 'JPNV Slammers', sport: 'Basketball', division: 'Pro League', contact: 'Rahul Jain', phone: '+91-98765-43234', email: 'rahul.jain@jpnvnigdi.org', homeVenue: 'JPNV Basketball Arena', founded: '2021', color: 'Orange'},
        {name: 'JPNV Hoops', sport: 'Basketball', division: 'Pro League', contact: 'Anjali Sharma', phone: '+91-98765-43235', email: 'anjali.sharma@jpnvnigdi.org', homeVenue: 'JPNV Basketball Arena', founded: '2020', color: 'Green'},
        {name: 'JPNV Nets', sport: 'Basketball', division: 'Pro League', contact: 'Vishal Gupta', phone: '+91-98765-43236', email: 'vishal.gupta@jpnvnigdi.org', homeVenue: 'JPNV Basketball Arena', founded: '2022', color: 'Black'},
        {name: 'JPNV Rebounds', sport: 'Basketball', division: 'Pro League', contact: 'Madhavi Iyer', phone: '+91-98765-43237', email: 'madhavi.iyer@jpnvnigdi.org', homeVenue: 'JPNV Basketball Arena', founded: '2019', color: 'White'},

        // TENNIS TEAMS
        {name: 'JPNV Aces', sport: 'Tennis', division: 'Open Circuit', contact: 'Kiran Desai', phone: '+91-98765-43240', email: 'kiran.desai@jpnvnigdi.org', homeVenue: 'JPNV Tennis Courts', founded: '2021', color: 'Navy'},
        {name: 'JPNV Serves', sport: 'Tennis', division: 'Open Circuit', contact: 'Divya Bhatt', phone: '+91-98765-43241', email: 'divya.bhatt@jpnvnigdi.org', homeVenue: 'JPNV Tennis Courts', founded: '2020', color: 'Teal'},
        {name: 'JPNV Volleys', sport: 'Tennis', division: 'Open Circuit', contact: 'Harish Thakur', phone: '+91-98765-43242', email: 'harish.thakur@jpnvnigdi.org', homeVenue: 'JPNV Tennis Courts', founded: '2022', color: 'Maroon'},
        {name: 'JPNV Smashers', sport: 'Tennis', division: 'Open Circuit', contact: 'Shweta Kulkarni', phone: '+91-98765-43243', email: 'shweta.kulkarni@jpnvnigdi.org', homeVenue: 'JPNV Tennis Courts', founded: '2019', color: 'Lime'},

        // VOLLEYBALL TEAMS (NEW SPORT)
        {name: 'JPNV Spikers', sport: 'Volleyball', division: 'Premier League', contact: 'Sunil Pandey', phone: '+91-98765-43250', email: 'sunil.pandey@jpnvnigdi.org', homeVenue: 'JPNV Indoor Sports Complex', founded: '2021', color: 'Coral'},
        {name: 'JPNV Blockers', sport: 'Volleyball', division: 'Premier League', contact: 'Rashni Singh', phone: '+91-98765-43251', email: 'rashni.singh@jpnvnigdi.org', homeVenue: 'JPNV Indoor Sports Complex', founded: '2020', color: 'Turquoise'},
        {name: 'JPNV Setters', sport: 'Volleyball', division: 'Premier League', contact: 'Manoj Kumar', phone: '+91-98765-43252', email: 'manoj.kumar@jpnvnigdi.org', homeVenue: 'JPNV Indoor Sports Complex', founded: '2022', color: 'Indigo'},
        {name: 'JPNV Diggers', sport: 'Volleyball', division: 'Premier League', contact: 'Sunita Rao', phone: '+91-98765-43253', email: 'sunita.rao@jpnvnigdi.org', homeVenue: 'JPNV Indoor Sports Complex', founded: '2019', color: 'Magenta'},

        // BADMINTON TEAMS (NEW SPORT)
        {name: 'JPNV Shuttlers', sport: 'Badminton', division: 'Elite Division', contact: 'Arjun Negi', phone: '+91-98765-43260', email: 'arjun.negi@jpnvnigdi.org', homeVenue: 'JPNV Badminton Hall', founded: '2021', color: 'Silver'},
        {name: 'JPNV Smashers', sport: 'Badminton', division: 'Elite Division', contact: 'Meenu Sharma', phone: '+91-98765-43261', email: 'meenu.sharma@jpnvnigdi.org', homeVenue: 'JPNV Badminton Hall', founded: '2020', color: 'Bronze'},
        {name: 'JPNV Drops', sport: 'Badminton', division: 'Elite Division', contact: 'Nitin Verma', phone: '+91-98765-43262', email: 'nitin.verma@jpnvnigdi.org', homeVenue: 'JPNV Badminton Hall', founded: '2022', color: 'Crimson'},
        {name: 'JPNV Clears', sport: 'Badminton', division: 'Elite Division', contact: 'Prachi Agarwal', phone: '+91-98765-43263', email: 'prachi.agarwal@jpnvnigdi.org', homeVenue: 'JPNV Badminton Hall', founded: '2019', color: 'Violet'}
    ],
    
    venues: [
        {name: 'JPNV Cricket Ground A', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 15000, surface: 'Natural Grass', type: 'Outdoor', facilities: 'Pavilion, Dressing Rooms, Scoreboard, Practice Nets', coordinates: '18.6517° N 73.7712° E', contact: '+91-20-2745-6789'},
        {name: 'JPNV Cricket Ground B', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 12000, surface: 'Natural Grass', type: 'Outdoor', facilities: 'Pavilion, Dressing Rooms, Scoreboard, Practice Nets', coordinates: '18.6520° N 73.7715° E', contact: '+91-20-2745-6790'},
        {name: 'JPNV Football Stadium', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 25000, surface: 'Natural Grass', type: 'Outdoor', facilities: 'Floodlights, Dressing Rooms, VIP Stand, Media Center', coordinates: '18.6525° N 73.7720° E', contact: '+91-20-2745-6791'},
        {name: 'JPNV Basketball Arena', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 5000, surface: 'Hardwood', type: 'Indoor', facilities: 'Air Conditioning, LED Scoreboard, Sound System, Tiered Seating', coordinates: '18.6515° N 73.7708° E', contact: '+91-20-2745-6792'},
        {name: 'JPNV Tennis Courts', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 2000, surface: 'Hard Court', type: 'Outdoor', facilities: '8 Courts, Floodlights, Clubhouse, Pro Shop', coordinates: '18.6512° N 73.7705° E', contact: '+91-20-2745-6793'},
        {name: 'JPNV Indoor Sports Complex', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 3000, surface: 'Synthetic', type: 'Indoor', facilities: 'Multi-Purpose Courts, Air Conditioning, Spectator Gallery', coordinates: '18.6518° N 73.7710° E', contact: '+91-20-2745-6794'},
        {name: 'JPNV Badminton Hall', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 1500, surface: 'Wooden', type: 'Indoor', facilities: '12 Courts, Professional Lighting, Seating Area, Equipment Store', coordinates: '18.6514° N 73.7707° E', contact: '+91-20-2745-6795'},
        {name: 'JPNV Swimming Pool Complex', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 1000, surface: 'Tiled Pool', type: 'Outdoor', facilities: 'Olympic Size Pool, Diving Boards, Changing Rooms, Timing System', coordinates: '18.6521° N 73.7716° E', contact: '+91-20-2745-6796'},
        {name: 'JPNV Athletics Track', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 10000, surface: 'Synthetic Track', type: 'Outdoor', facilities: '400m Track, Field Events Area, High Jump, Long Jump Pits', coordinates: '18.6523° N 73.7718° E', contact: '+91-20-2745-6797'},
        {name: 'JPNV Multipurpose Auditorium', city: 'Pune', state: 'Maharashtra', address: 'JPNV Sports Complex, Nigdi, Pune 411044', capacity: 8000, surface: 'Wooden Floor', type: 'Indoor', facilities: 'Stage, Sound System, Projectors, VIP Seating, Air Conditioning', coordinates: '18.6519° N 73.7713° E', contact: '+91-20-2745-6798'}
    ]
};