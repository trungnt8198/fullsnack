export function TasksPage() {
    return /*HTML*/ `
        <div class="header">
            <h1>Welcome</h1>
            <button id="logoutButton" class="mt-2 btn btn-warning">Logout</button>
            <h2 class="mt-5">Task Manager</h2>
        </div>

        <div class="task-form">
            <div class="form-row">
                <div class="col">
                    <input type="text" id="taskTitle" class="form-control" placeholder="Task Title">
                </div>
                <div class="col">
                    <select id="taskPriority" class="form-control">
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                </div>
                <div class="col">
                    <button class="btn btn-primary" id="addTaskButton">Add Task</button>
                </div>
            </div>
        </div>

        <div class="task-filters">
            <form class="form-row mb-5 mt-5" id="filterForm">
                <div class="col">
                    <input type="text" name="searchTask" class="form-control" placeholder="Search Task">
                </div>
                <div class="col">
                    <select name="filterPriority" class="form-control">
                        <option value="">All Priorities</option>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                </div>
                <div class="col">
                    <select name="filterStatus" class="form-control">
                        <option value="">All Statuses</option>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div class="col">
                    <select name="sortPriority" class="form-control">
                        <option value="">Default</option>
                        <option value="asc">Priority Ascending</option>
                        <option value="desc">Priority Descending</option>
                    </select>
                </div>
                <div class="col">
                    <button type="submit" class="btn btn-secondary">Apply Filters</button>
                </div>
            </form>
        </div>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th width="40%">Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th width="10%">Edit</th>
                    <th width="10%">Delete</th>
                </tr>
            </thead>
            <tbody id="taskTableBody">
            </tbody>
        </table>
    `;
}