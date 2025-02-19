import { API_ENDPOINT, callAPI } from "./API";

export function createTask(task) {
    return callAPI(API_ENDPOINT.TASKS, "POST", task);
}

export function fetchTasksByUser(userId) {
    return callAPI(`${API_ENDPOINT.TASKS}?userId=${userId}`, "GET");
}

export function patchTask(taskId, task) {
    return callAPI(`${API_ENDPOINT.TASKS}/${taskId}`, "PATCH", task);
}

export function deleteTask(taskId) {
    return callAPI(`${API_ENDPOINT.TASKS}/${taskId}`, "DELETE");
}