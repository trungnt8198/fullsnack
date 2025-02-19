export const API_ENDPOINT = {
    REGISTER: "http://localhost:3000/register",
    LOGIN: "http://localhost:3000/login",
    USERS: "http://localhost:3000/users",
    TASKS: "http://localhost:3000/tasks"
};

export async function callAPI(url, method, body) {
    const request = {
        headers: { "Content-Type": "application/json" },
        method,
        body: body ? JSON.stringify(body) : undefined
    };

    try {
        const res = await fetch(url, request);
        const data = await res.json();
        return {data, status: res.status};
    } catch (error) {
        return {error: error.message};
    }
}

export function checkResponse(response, validStatus) {
    if(response.error) {
        alert("Error: " + response.error);
        return false;
    }
    if(response.status !== validStatus) {
        alert(response.data);
        return false;
    }
    return true;
}