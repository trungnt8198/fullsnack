import { API_ENDPOINT, callAPI } from "./API";

export function loginUser(user) {
    return callAPI(API_ENDPOINT.LOGIN, "POST", user);
}

export function registerUser(user) {
    return callAPI(API_ENDPOINT.REGISTER, "POST", user);
}