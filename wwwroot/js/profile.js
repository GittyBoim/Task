const userName = document.getElementById('userName');
const password = document.getElementById('password');

function getDetails() {

    const id = parseJwt().Id;

    fetch(`/User/${id}`, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token").substring(1).slice(0, -1)
        }
    })
        .then(response => response.json())
        .then(data => _displayDetails(data))
        .catch(error => console.error('Unable to get items.', error));
}

function _displayDetails(user) {
    userName.innerText = user.userName;
    password.innerText = user.password;
    if (parseJwt().Type === "Admin")
        addManagerOptions();
}

function parseJwt() {
    let token = sessionStorage.getItem("token");
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    return JSON.parse(jsonPayload);
}

function addManagerOptions() {
    const managerOptions = document.getElementById("managerOptions");
    const userManagment = document.createElement('a');
    userManagment.innerText = "user managmant";
    userManagment.href = "userManagment.html"
    managerOptions.append(userManagment);
}