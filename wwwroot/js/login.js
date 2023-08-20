const login = () => {
    var raw = JSON.stringify({
        "id": 0,
        "userName": document.getElementById("userName").value,
        "password": document.getElementById("password").value,
        "classification": "string"
    });

    var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: raw,
        redirect: 'follow'
    };

    let connected = false;

    fetch("User/Login", requestOptions)
        .then(response => {
            if (response.status === 200)
                return response.text();
            else
                throw new Error("unauthorize");
        })
        .then(result => {
            sessionStorage.setItem('token', result);
            window.location.href = "task.html";
        })
        .catch((error) => { console.log("error", error); alert("user name or password dont validy") });
}