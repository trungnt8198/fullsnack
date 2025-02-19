import { registerUser } from "../apis/auth";
import { isValidAuthData } from "../utils/ValidateData";
import { router } from "../main";

export function handleRegisterPage() {
    const registerForm = document.getElementById("registerForm");
    registerForm.addEventListener("submit", handleRegisterForm);
}

async function handleRegisterForm(event) {
    event.preventDefault();
        
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData);
    
    if(!isValidAuthData(user)) return;
    
    user.confirmPassword = undefined;
    const response = await registerUser(user);
    const registeredSuccess = processRegisterResponse(response);
    if(registeredSuccess) handleAfterRegister();
}

function processRegisterResponse(response) {
    if(response.error) {
        alert("Error: " + response.error);
        return false;
    }
    if(response.status !== 201) {
        alert(response.data);
        return false;
    }
    alert("Your account has been registered successfully");
    return true;         
}

function handleAfterRegister() {
    router.navigate("/login");
}
  