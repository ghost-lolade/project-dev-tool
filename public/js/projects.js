document.addEventListener('DOMContentLoaded', function () {
    const searchBar = document.getElementById('search-bar');
    const projectList = document.getElementById('project-list');
    let projects = [];

    if (!localStorage.getItem('access_token')) {
        window.location.href = 'login.html';
        return;
    }

    // Fetch and display projects based on search
    function fetchProjects() {
        const searchQuery = searchBar.value;

        let url = '/api/projects?';
        if (searchQuery) {
            url += `search=${encodeURIComponent(searchQuery)}&`;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 401) {
                window.location.href = 'login.html';
            }
            return response.json();
        })
        .then(data => {
            projects = data; // Store projects locally for display
            displayProjects(projects);
        })
        .catch(error => console.error('Error fetching projects:', error));
    }

    // Initial fetch of projects
    fetchProjects();

    // Search projects by name
    searchBar.addEventListener('input', fetchProjects);

    function displayProjects(projects) {
        projectList.innerHTML = '';
        projects.forEach(project => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="project-info">
                    <span class="project-name">${project.name}</span>
                </div>
                <a href="project-details.html?id=${project.id}">View</a>`;
            projectList.appendChild(li);
        });
    }
});
