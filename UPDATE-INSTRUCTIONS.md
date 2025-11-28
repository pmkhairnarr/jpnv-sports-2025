# 🔄 JPNV Sports Website Data Update Guide

## Current Website Status
✅ **Live at:** https://pmkhairnarr.github.io/jpnv-sports-2025/
✅ **Repository:** https://github.com/pmkhairnarr/jpnv-sports-2025

## How to Update Data

### Option 1: GitHub Web Interface (Easiest)
1. Go to https://github.com/pmkhairnarr/jpnv-sports-2025
2. Click on `index.html`
3. Click the pencil icon (✏️) to edit
4. Find the `jpnvData = {` section (around line 815)
5. Replace the data with your actual information
6. Scroll down, add a commit message like "Update sports data"
7. Click "Commit changes"
8. Website updates automatically in 1-2 minutes

### Option 2: Local Update (Advanced)
1. Clone repository: `git clone https://github.com/pmkhairnarr/jpnv-sports-2025.git`
2. Edit `index.html` file
3. Update the `jpnvData` object
4. Commit and push changes

## Data Structure to Update

### 1. Matches Section (lines ~815-840)
```javascript
matches: [
    {
        date: '2025-12-01', 
        time: '15:30', 
        sport: 'Cricket', 
        competition: 'JPNV Premier League', 
        homeTeam: 'Team Name 1', 
        awayTeam: 'Team Name 2', 
        venue: 'Venue Name', 
        status: 'Scheduled', 
        score: '', 
        matchType: 'League'
    },
    // Add more matches...
]
```

### 2. Teams Section (lines ~841-850)
```javascript
teams: [
    {
        name: 'Team Name',
        sport: 'Cricket',
        division: 'Premier Division',
        contact: 'Contact Person',
        phone: '+91-XXXXX-XXXXX',
        email: 'email@jpnvnigdi.org',
        homeVenue: 'Home Ground',
        founded: '2024',
        color: 'Team Color'
    },
    // Add more teams...
]
```

### 3. Venues Section (lines ~851-860)
```javascript
venues: [
    {
        name: 'Venue Name',
        city: 'City',
        state: 'State',
        address: 'Full Address',
        capacity: 50000,
        surface: 'Natural Grass',
        type: 'Outdoor',
        facilities: 'List of facilities',
        coordinates: 'Lat° N Long° E',
        contact: '+91-XXX-XXX-XXXX'
    },
    // Add more venues...
]
```

## Adding New Sports

Currently supported: Cricket 🏏, Football ⚽, Basketball 🏀, Tennis 🎾

To add new sports:
1. Add matches with new sport name
2. Update filter tabs in HTML (around line 780)
3. Add sport icon in getSportIcon function (around line 890)

## Statistics Auto-Update
The hero section stats automatically update based on your data:
- Match count
- Team count  
- Sport count (calculated from unique sports)
- Venue count

## Need Help?
- Simple edits: Use GitHub web interface
- Complex changes: Edit locally and push
- New features: Contact developer for modifications