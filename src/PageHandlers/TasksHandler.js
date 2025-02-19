import { checkResponse } from "../apis/API";
import { createTask, fetchTasksByUser } from "../apis/Tasks";
import { router } from "../main";
import { deleteTask } from "../apis/Tasks";

export let localTasks = [];
export let updateTask = null;

let user = {}
const priorityMap = {
    "1": "Low",
    "2": "Medium",
    "3": "High"
};


export async function handleTasksPage() {
    user = localStorage.getItem("user");
    if (!user) {
        router.navigate("/login");
        return;
    }

    user = JSON.parse(user);
    welcome(user);

    const response = await fetchTasksByUser(user.id);
    const fetchSuccess = checkResponse(response, 200);
    if(!fetchSuccess) {
        handleFetchFailed();
        return;
    }
    localTasks = response.data;
    displayTasks(localTasks);

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", handleLogoutButton);

    const addTaskButton = document.getElementById("addTaskButton");
    addTaskButton.addEventListener("click", handleAddTaskButton);

    const filterForm = document.getElementById("filterForm");
    filterForm.addEventListener("submit", handleFilterForm);

    const taskTableBody = document.getElementById("taskTableBody");
    taskTableBody.addEventListener('click', async function(event) {

        if (event.target && event.target.classList.contains('btn-danger')) {
            const taskId = event.target.dataset.taskId;
            if(confirm("Are you sure want delete this task ?")) {
                await handleDeleteButton(taskId);
            }
        }

        if (event.target && event.target.classList.contains('btn-warning')) {
            const taskId = event.target.dataset.taskId;
            handleUpdateTaskButton(taskId);
        }
    });
    
}

function welcome(user) {
    const welcome = document.querySelector("h1");
    welcome.innerHTML = `Welcome, ${user.email}`;
}

function handleLogoutButton() {
    if(confirm("Are you sure want to logout now ?")) {
        localStorage.removeItem("user");
        router.navigate("/login");
    }
}

function handleFetchFailed() {
    alert(`
        App is crashed
        Dev is fixing this problem, please go away!
        Teleporting you to Login Page.
    `);
    router.navigate("/login");
}

function displayTasks(tasks) {
    const taskTableBody = document.getElementById("taskTableBody");
    if (tasks.length == 0) {
        taskTableBody.innerHTML = "<tr class='bg-info'><td colspan='5'>No Tasks Found</td></tr>";
        return;
    }
    taskTableBody.innerHTML = tasks.map(task => `
        <tr>
            <td>${task.title}</td>
            <td>${task.status}</td>
            <td>${priorityMap[task.priority]}</td>
            <td>
                <button class="btn btn-warning" type="button" data-task-id="${task.id}">
                    Update
                </button>
            </td>
            <td>
                <button class="btn btn-danger" type="button" data-task-id="${task.id}">
                    Delete
                </button>
            </td>
        </tr>`).join("");
}

async function handleAddTaskButton(event) {
    event.preventDefault();
    const taskTitle = document.getElementById("taskTitle").value.trim();

    if(!isValidTaskTitle(taskTitle)) {
        return;
    }

    const taskPriority = document.getElementById("taskPriority").value;
    
    let task = { 
        title: taskTitle, 
        priority: taskPriority, 
        status: "To do", 
        userId: user.id 
    };
    
    setStateAddTaskButton(event.target, "loading");

    const response = await createTask(task);
    
    const createdSuccess = checkResponse(response, 201);
    if(createdSuccess) {  
        localTasks.push(response.data);
        displayTasks(localTasks);
    }

    setStateAddTaskButton(event.target, "normal");
}

function isValidTaskTitle(taskTitle) {
    if (taskTitle === "") {
        alert("Task title must not be empty");
        return false;
    }

    if (localTasks.some(task => task.title === taskTitle)) {
        alert("This task title is duplicated, please try another");
        return false;
    }
    return true;
}

function handleUpdateTaskButton(taskId) {
    updateTask = localTasks.find(task => task.id == taskId);
    router.navigate("/update-task");
}

async function handleDeleteButton(taskId) {
    const response = await deleteTask(taskId);
    const deletedSuccess = checkResponse(response, 200);
    if(deletedSuccess) {
        alert("Deleted task successfully!")
        localTasks = localTasks.filter(task => task.id != taskId);
        displayTasks(localTasks);
    }
}

function handleFilterForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const {searchTask, filterStatus, filterPriority, sortPriority} = Object.fromEntries(formData);

    let filteredTasks = localTasks.filter(task => {
        return (
            (!filterPriority || task.priority === filterPriority) &&
            (!filterStatus || task.status === filterStatus) &&
            task.title.toLowerCase().includes(searchTask.trim().toLowerCase())
        );
    });

    filteredTasks.sort((a, b) => {
        if(sortPriority === "asc") {
            return a.priority - b.priority;
        }
        if(sortPriority === "desc") {
            return b.priority - a.priority;
        }
    });

    displayTasks(filteredTasks);
}

function setStateAddTaskButton(addTaskButton, state) {
    if(state == "loading") {
        addTaskButton.textContent = "Loading...";
        addTaskButton.setAttribute("disabled", "true");
        return;
    }
    if(state == "normal") {
        addTaskButton.textContent = "Add Task";
        addTaskButton.removeAttribute("disabled");
    }
}
