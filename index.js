// DOM Elements
const cowsList = document.getElementById('cowsList');
const activitiesList = document.getElementById('activitiesList');
const cowSearch = document.getElementById('cowSearch');
const healthFilter = document.getElementById('healthFilter');
const themeToggle = document.getElementById('themeToggle');

// State
let cows = [];
let activities = [];

// Event Listener 1: Search functionality
cowSearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCows = filterCows(searchTerm, healthFilter.value);
    renderCows(filteredCows);
});

// Event Listener 2: Health status filter
healthFilter.addEventListener('change', (e) => {
    const filteredCows = filterCows(cowSearch.value.toLowerCase(), e.target.value);
    renderCows(filteredCows);
});

// Event Listener 3: Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
});

// Filter cows based on search term and health status
function filterCows(searchTerm, healthStatus) {
    return cows.filter(cow => {
        const matchesSearch = cow.name.toLowerCase().includes(searchTerm) ||
            cow.breed.toLowerCase().includes(searchTerm);
        const matchesHealth = healthStatus === 'all' || cow.healthStatus === healthStatus;
        return matchesSearch && matchesHealth;
    });
}

// Render cows table
function renderCows(cowsToRender) {
    const table = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Breed</th>
                            <th>Milk Production (L)</th>
                            <th>Last Milked</th>
                            <th>Health Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cowsToRender.map(cow => `
                            <tr>
                                <td>${cow.name}</td>
                                <td>${cow.breed}</td>
                                <td>${cow.milkProduction}</td>
                                <td>${cow.lastMilked}</td>
                                <td class="status-${cow.healthStatus === 'Healthy' ? 'healthy' : 'observation'}">${cow.healthStatus}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
    cowsList.innerHTML = table;
}

// Render activities table
function renderActivities(activitiesToRender) {
    const table = `
                <table>
                    <thead>
                        <tr>
                            <th>Activity</th>
                            <th>Start Time</th>
                            <th>Duration (min)</th>
                            <th>Assigned Staff</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${activitiesToRender.map(activity => `
                            <tr>
                                <td>${activity.activity}</td>
                                <td>${activity.startTime}</td>
                                <td>${activity.duration}</td>
                                <td>${activity.assignedStaff}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
    activitiesList.innerHTML = table;
}

// Fetch data from json-server
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

// Initialize the application
fetchData();