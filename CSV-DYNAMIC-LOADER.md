# 📊 CSV Dynamic Data Configuration Guide

## 🎯 Overview
Transform your JPNV Sports website to load data dynamically from CSV files stored in GitHub. This allows you to update match schedules, teams, venues, and results by simply updating CSV files without touching code.

## 📁 CSV File Structure

### Required CSV Files (place in `/data/` folder):
1. **JPNV-Match-Schedule.csv** - Upcoming matches
2. **JPNV-Teams-Information.csv** - Team details
3. **JPNV-Venues-List.csv** - Venue information
4. **JPNV-Match-Results.csv** - Completed match results

### CSV Format Requirements:

#### 1. JPNV-Match-Schedule.csv
```csv
Date,Time,Sport,Competition,Home Team,Away Team,Venue,Status,Score,Match Type
2025-12-01,15:30,Cricket,JPNV Premier League,Mumbai Warriors,Delhi Dynamos,Wankhede Stadium,Scheduled,,League
```

#### 2. JPNV-Teams-Information.csv
```csv
Team Name,Sport,Division,Logo URL,Contact Person,Phone,Email,Home Venue,Founded,Team Color
Mumbai Warriors,Cricket,Premier Division,,Rajesh Sharma,+91-98765-43210,rajesh.sharma@jpnvnigdi.org,Wankhede Stadium,2020,Blue
```

#### 3. JPNV-Venues-List.csv
```csv
Venue Name,City,State,Address,Capacity,Surface Type,Indoor/Outdoor,Facilities,GPS Coordinates,Contact Number
Wankhede Stadium,Mumbai,Maharashtra,D Road Mumbai 400020,33108,Natural Grass,Outdoor,"Pavilion Stands, Media Center",19.0298° N 72.8397° E,+91-22-2281-3500
```

#### 4. JPNV-Match-Results.csv
```csv
Match ID,Date,Sport,Home Team,Away Team,Home Score,Away Score,Status,Venue,Notes,Updated On
JPNV001,2025-12-01,Cricket,Mumbai Warriors,Delhi Dynamos,245,198,Completed,Wankhede Stadium,Mumbai Warriors won by 47 runs,2025-12-01 18:30
```

## 🚀 Implementation Steps

### Step 1: Create Data Folder Structure
```
jpnv-sports-github/
├── data/
│   ├── JPNV-Match-Schedule.csv
│   ├── JPNV-Teams-Information.csv
│   ├── JPNV-Venues-List.csv
│   └── JPNV-Match-Results.csv
├── index.html
└── js/
    └── csv-loader.js
```

### Step 2: Dynamic Loading Benefits
✅ **Real-time Updates**: Change CSV → Website updates automatically  
✅ **No Code Changes**: Update data without touching HTML/JavaScript  
✅ **Version Control**: Track data changes through GitHub commits  
✅ **Collaborative**: Multiple people can update different CSV files  
✅ **Mobile Friendly**: Same responsive design, dynamic data  
✅ **Offline Support**: CSV data cached for offline viewing  

### Step 3: Update Workflow
1. **Update CSV File**: Edit directly in GitHub web interface
2. **Commit Changes**: GitHub automatically saves changes
3. **Live Update**: Website reflects changes within seconds
4. **History**: Full change history maintained in Git

## 🔄 Dynamic Features Available

### Real-time Data Sync
- **Match Status Updates**: Scheduled → In Progress → Completed
- **Score Updates**: Live score updates in Match Results CSV
- **Team Changes**: Add/remove teams dynamically
- **Venue Management**: Update venue details and capacity

### Advanced Filtering
- **By Sport**: Filter matches by Cricket, Football, Basketball, Tennis, Volleyball, Badminton
- **By Status**: Show only Scheduled, In Progress, or Completed matches
- **By Date**: Filter by date ranges
- **By Team**: Show matches for specific teams
- **By Venue**: Filter by venue location

### Statistics Dashboard
- **Auto-calculated**: Total matches, teams, sports, venues from CSV data
- **Live Results**: Win/loss records calculated from results CSV
- **Venue Utilization**: Match count per venue
- **Team Performance**: Points, wins, losses from results

## 📈 CSV Update Examples

### Adding New Match
```csv
Date,Time,Sport,Competition,Home Team,Away Team,Venue,Status,Score,Match Type
2025-12-20,19:00,Volleyball,JPNV Volleyball League,JPNV Spikers,JPNV Blockers,JPNV Indoor Sports Complex,Scheduled,,League
```

### Updating Match Status
```csv
Match ID,Date,Sport,Home Team,Away Team,Home Score,Away Score,Status,Venue,Notes,Updated On
JPNV011,2025-12-11,Cricket,Mumbai Warriors,Chennai Chargers,278,245,Completed,Wankhede Stadium,Mumbai Warriors won by 33 runs,2025-12-11 18:45
```

### Adding New Team
```csv
Team Name,Sport,Division,Logo URL,Contact Person,Phone,Email,Home Venue,Founded,Team Color
JPNV Spikers,Volleyball,Premier League,,Sunil Pandey,+91-98765-43250,sunil.pandey@jpnvnigdi.org,JPNV Indoor Sports Complex,2021,Coral
```

## 🛠️ Technical Implementation
The website will include a CSV parser that:
- Fetches CSV files from GitHub raw URLs
- Parses CSV data into JavaScript objects
- Updates UI dynamically based on CSV content
- Caches data for offline access
- Handles errors gracefully with fallback data

## 🎨 UI Updates
- **Loading States**: Show loading indicators while fetching CSV data
- **Error Handling**: Display user-friendly messages if CSV unavailable
- **Refresh Button**: Manual refresh option for immediate updates
- **Last Updated**: Show when data was last refreshed
- **Data Source**: Link to CSV files for transparency

This configuration makes your JPNV Sports website a powerful, data-driven platform that's easy to maintain and update!