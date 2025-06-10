class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupNav();
        this.setupTheme();
        this.renderTasks();
    }

    setupFormValidation() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            inputs.forEach(input => {
                if (!this.validateField(input)) isValid = false;
            });

            if (isValid) {
                alert('Message sent successfully!');
                form.reset();
                inputs.forEach(input => {
                    document.getElementById(`${input.id}Error`).classList.remove('show');
                });
            }
        });
    }

    validateField(input) {
        const error = document.getElementById(`${input.id}Error`);
        let isValid = true;
        let message = '';

        switch(input.id) {
            case 'name':
                isValid = input.value.trim().length > 0;
                message = 'Please enter your name';
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(input.value);
                message = 'Please enter a valid email';
                break;
            case 'message':
                isValid = input.value.trim().length > 0;
                message = 'Please enter a message';
                break;
        }

        error.textContent = message;
        error.classList.toggle('show', !isValid);
        return isValid;
    }

    setupNav() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                const targetId = link.getAttribute('href').slice(1);
                document.querySelectorAll('section').forEach(section => {
                    section.style.display = section.id === targetId ? 'block' : 'none';
                });
            });
        });
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        window.toggleTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        };
    }

    addTask() {
        const taskInput = document.getElementById('taskInput');
        const categorySelect = document.getElementById('taskCategory');
        const dueDateInput = document.getElementById('taskDueDate');

        const task = {
            id: Date.now(),
            text: taskInput.value.trim(),
            category: categorySelect.value,
            dueDate: dueDateInput.value,
            isCompleted: false
        };

        if (task.text) {
            this.tasks.push(task);
            taskInput.value = '';
            dueDateInput.value = '';
            this.saveTasks();
            this.renderTasks();
        }
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => 
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        );
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    filterTasks(filter) {
        this.renderTasks(filter);
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks(filter = 'all') {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        const filteredTasks = filter === 'all' 
            ? this.tasks 
            : this.tasks.filter(task => task.category === filter);

        filteredTasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task-item ${task.isCompleted ? 'completed' : ''}`;
            taskDiv.innerHTML = `
                <div class="task-content">
                    <span class="task-text ${task.isCompleted ? 'completed' : ''}">${task.text}</span>
                    <span class="task-meta">
                        <span class="category ${task.category}">${task.category}</span>
                        ${task.dueDate ? `<span class="due-date">Due: ${task.dueDate}</span>` : ''}
                    </span>
                </div>
                <button onclick="toggleTask(${task.id})" title="${task.isCompleted ? 'Mark as incomplete' : 'Mark as done'}">
                    <i class="fa fa-check"></i>
                </button>
                <button onclick="deleteTask(${task.id})" title="Delete task">
                    <i class="fa fa-trash"></i>
                </button>`;
            taskList.appendChild(taskDiv);
        });
    }
}

const taskManager = new TaskManager();

window.addTask = taskManager.addTask.bind(taskManager);
window.toggleTask = taskManager.toggleTask.bind(taskManager);
window.deleteTask = taskManager.deleteTask.bind(taskManager);
window.filterTasks = taskManager.filterTasks.bind(taskManager);