export function isValidAuthData(data) {
    for(let key in data) {
        if(data[key].includes(" ")) {
            alert(`${key} must not contain any spaces`);
            return false;
        }
    }
    if(data.password.length < 6) {
        alert("Password must contain at least 6 characters");
        return false;
    }
    if(data.hasOwnProperty("confirmPassword") != "" && data.confirmPassword !== data.password) {
        alert("Confirm password must be the same with Password");
        return false;
    }
    return true;
}