export function UpdateTaskPage() {
    return /*HTML*/ `
        <h1>Update Task</h1>
        <form id="updateTaskForm">
            <div class="form-group">
                <label for="taskTitle">Title</label>
                <input type="text" class="form-control" id="taskTitle" name="title" required>
            </div>
            <div class="form-group">
                <label for="taskPriority">Priority</label>
                <select id="taskPriority" name="priority" class="form-control">
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>
            </div>
                <label for="taskStatus">Status</label>
                <select id="taskStatus" name="status" class="form-control">
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <button type="submit" id="updateButton" class="btn btn-primary mt-5">Update</button>
            <button type="button" id="cancelButton" class="btn btn-danger mt-5">Cancel</button>
        </form>  
    `;
}