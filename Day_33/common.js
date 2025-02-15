export default callAPI;

function callAPI(url, method, body) {
    let request = {
        headers: {"Content-Type": "application/json"}, 
        method
    }

    if(body) {
        request.body = JSON.stringify(body);
    }

    return fetch(url, request)
    .then(res => res.json()
    .then(data => ({status: res.status, data})))
    .catch(err => ({error: err.message}));
}