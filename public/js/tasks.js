document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const statusFilter = document.getElementById('status-filter');
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
    const taskNameInput = document.getElementById('task-name');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskStatusInput = document.getElementById('task-status');
    const projectTitle = document.getElementById('project-title');
    const projectDescription = document.getElementById('project-description');
    let tasks = [];
    let editTaskId = null; // To keep track of the task being edited

    if (!localStorage.getItem('access_token')) {
        window.location.href = 'login.html';
        return;
    }

    // Fetch and display project details
    function fetchProjectDetails() {
        fetch(`/api/projects/${projectId}`, {
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
        .then(project => {
            projectTitle.textContent = project.name;
            projectDescription.textContent = project.description;
        })
        .catch(error => console.error('Error fetching project details:', error));
    }

    // Fetch and display tasks based on status filter
    function fetchTasks() {
        const status = statusFilter.value;

        let url = `/api/projects/${projectId}/tasks?`;
        if (status) {
            url += `status=${encodeURIComponent(status)}&`;
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
            tasks = data; // Store tasks locally for display
            displayTasks(tasks);
        })
        .catch(error => console.error('Error fetching tasks:', error));
    }

    // Initial fetch of project details and tasks
    fetchProjectDetails();
    fetchTasks();

    // Filter tasks by status
    statusFilter.addEventListener('change', fetchTasks);

    // Handle form submission for adding/updating tasks
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const taskData = {
            name: taskNameInput.value,
            description: taskDescriptionInput.value,
            status: taskStatusInput.value,
        };

        if (editTaskId) {
            // Update existing task
            fetch(`/api/projects/${projectId}/tasks/${editTaskId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(taskData)
            })
            .then(response => {
                if (response.status === 401) {
                    window.location.href = 'login.html';
                }
                return response.json();
            })
            .then(task => {
                tasks = tasks.map(t => t.id === task.id ? task : t);
                displayTasks(tasks);
                taskForm.reset();
                editTaskId = null; // Reset after updating
            })
            .catch(error => console.error('Error updating task:', error));
        } else {
            // Add new task
            fetch(`/api/projects/${projectId}/tasks`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(taskData)
            })
            .then(response => {
                if (response.status === 401) {
                    window.location.href = 'login.html';
                }
                return response.json();
            })
            .then(task => {
                tasks.push(task);
                displayTasks(tasks);
                taskForm.reset();
            })
            .catch(error => console.error('Error adding task:', error));
        }
    });

    // Display tasks
    function displayTasks(tasks) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.name} - ${task.status}</span>
                <div>
                    <button class="edit-task" data-id="${task.id}">Edit</button>
                    <button class="delete-task" data-id="${task.id}">Delete</button>
                </div>`;
            taskList.appendChild(li);

            // Edit task button
            li.querySelector('.edit-task').addEventListener('click', function() {
                editTaskId = task.id;
                taskNameInput.value = task.name;
                taskDescriptionInput.value = task.description;
                taskStatusInput.value = task.status;
            });

            // Delete task button
            li.querySelector('.delete-task').addEventListener('click', function() {
                const taskId = task.id;
                fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.status === 401) {
                        window.location.href = 'login.html';
                    }
                    tasks = tasks.filter(t => t.id !== taskId);
                    displayTasks(tasks);
                })
                .catch(error => console.error('Error deleting task:', error));
            });
        });
    }
});
