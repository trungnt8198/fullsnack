import { loginUser } from "../apis/auth";
import { isValidAuthData } from "../utils/ValidateData";
import { router } from "../main";

export function handleLoginPage() {
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");
    loginForm.addEventListener("submit", (event) => handleLoginForm(event, loginButton));
}

async function handleLoginForm(event) {
    event.preventDefault();
        
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData);
    
    if(!isValidAuthData(user)) return;

    setStateLoginButton(loginButton, "loading");
    const response = await loginUser(user);
    const loginSuccess = processLoginResponse(response);
    if(loginSuccess) handleAfterLogin(response);
    else setStateLoginButton(loginButton, "normal");
}

function processLoginResponse(response) {        
    if(response.error) {
        alert("Error: " + response.error);
        return false;
    }
    else if(response.status !== 200) {
        alert("Incorrect email or password !");
        return false;
    }
    else {
        return true;
    }
}

function handleAfterLogin(response) {
    localStorage.setItem("user", JSON.stringify({
        accessToken: response.data.accessToken, 
        email: response.data.user.email, 
        id: response.data.user.id}));
    router.navigate("/tasks");
}

function setStateLoginButton(loginButton, state) {
    if(state == "loading") {
        loginButton.textContent = "Loading...";
        loginButton.setAttribute("disabled", "true");
        return;
    }
    if(state == "normal") {
        loginButton.textContent = "Login";
        loginButton.removeAttribute("disabled");
    }
}