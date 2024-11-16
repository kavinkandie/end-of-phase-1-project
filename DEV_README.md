# Developer Documentation - Dairy Farm Management System

## Project Structure
```
dairy-farm/
├── db.json          # JSON Server database
├── index.html       # Main HTML file
├── index.js         # Main JavaScript logic
├── style.css        # Styling
└── package.json     # Project configuration
```

## Technical Stack
- Frontend: Vanilla JavaScript, HTML5, CSS3
- Backend: JSON Server (RESTful API)
- Database: JSON file (db.json)

## API Endpoints
```javascript
GET    /cows                 // Retrieve all cows
GET    /cows/:id            // Retrieve specific cow
GET    /dailyActivities     // Retrieve all activities
GET    /dailyActivities/:id // Retrieve specific activity
```

## Data Models

### Cow Model
```javascript
{
  "id": Number,
  "name": String,
  "breed": String,
  "milkProduction": Number,
  "lastMilked": Date (ISO String),
  "healthStatus": "Healthy" | "Under Observation"
}
```

### Activity Model
```javascript
{
  "id": Number,
  "activity": String,
  "startTime": String (HH:mm format),
  "duration": Number (minutes),
  "assignedStaff": String
}
```

## Core Components

### State Management
```javascript
// Global state variables
let cows = [];        // Stores cow data
let activities = [];  // Stores activity data
```

### Event Listeners
1. Search Functionality
```javascript
// Filters cows based on search input
cowSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCows = filterCows(searchTerm, healthFilter.value);
    renderCows(filteredCows);
});
```

2. Health Status Filter
```javascript
// Filters cows based on health status
healthFilter.addEventListener('change', (e) => {
    const filteredCows = filterCows(cowSearch.value.toLowerCase(), e.target.value);
    renderCows(filteredCows);
});
```

3. Theme Toggle
```javascript
// Toggles between light and dark theme
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
});
```

### Core Functions

#### Data Fetching
```javascript
async function fetchData() {
    try {
        const [cowsResponse, activitiesResponse] = await Promise.all([
            fetch('http://localhost:3000/cows'),
            fetch('http://localhost:3000/dailyActivities')
        ]);

        cows = await cowsResponse.json();
        activities = await activitiesResponse.json();

        renderCows(cows);
        renderActivities(activities);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
```

#### Filtering
```javascript
function filterCows(searchTerm, healthStatus) {
    return cows.filter(cow => {
        const matchesSearch = cow.name.toLowerCase().includes(searchTerm) ||
            cow.breed.toLowerCase().includes(searchTerm);
        const matchesHealth = healthStatus === 'all' || cow.healthStatus === healthStatus;
        return matchesSearch && matchesHealth;
    });
}
```

## CSS Architecture

### Theme Variables
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #128342;
    --background-light: #f5f6fa;
    --text-dark: #2c3e50;
    --border-light: #d1d1d5
}

.theme-dark {
    --background-light: #2c3e50;
    --text-dark: #f5f6fa;
    --border-light: #647a91;
    --secondary-color: #158143;
}
```

### Grid Layout
```css
.dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
```

## Development Setup

1. Install Dependencies
```bash
npm install
```

2. Start JSON Server
```bash
npm run db
```

3. Start Development Server
```bash
npm start
```

## Best Practices Implementation

### Error Handling
- Try-catch blocks for async operations
- Error logging to console
- Graceful degradation when API fails

### Performance Optimization
- Efficient DOM manipulation using template strings
- Array method chaining for data filtering
- Asynchronous data fetching using Promise.all

### Accessibility
- Semantic HTML structure
- Color contrast compliance
- Keyboard navigation support

### Code Organization
- Separation of concerns (HTML, CSS, JS)
- Modular function design
- Consistent naming conventions

## Known Issues
- Dark mode doesn't persist after page reload
- No error message UI for failed API calls
- Limited mobile responsiveness