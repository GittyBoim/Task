const uri = '/User';
let users = [];

function getUsers() {

    fetch(uri, {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token").substring(1).slice(0, -1)
        }
    })
        .then(response => response.json())
        .then(data => _displayUsers(data))
        .catch(error => console.error('Unable to get users.', error));
}

function addUser() {
    const addUserNameTextbox = document.getElementById('add-user-name');
    const addPasswordChekbox = document.getElementById('add-password');
    const addClassificationTextbox = document.getElementById('add-classification');

    const user = {
        UserName: addUserNameTextbox.value.trim(),
        Password: addPasswordChekbox.value.trim(),
        Classification: addClassificationTextbox.value
    };
    fetch(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + sessionStorage.getItem("token").substring(1).slice(0, -1)
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(() => {
            getUsers();
            addUserNameTextbox.value = '';
            addPasswordChekbox.value = '';
            addClassificationTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteUser(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token").substring(1).slice(0, -1)
        }
    })
        .then(() => getUsers())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const user = users.find(user => user.id === id);

    document.getElementById('edit-id').value = user.id;
    document.getElementById('edit-user-name').value = user.userName;
    document.getElementById('edit-password').value = user.password;
    document.getElementById('edit-classification').value = user.classification;
    document.getElementById('editForm').style.display = 'block';
}

function updateUser() {
    const userId = document.getElementById('edit-id').value;

    const user = {
        Id: parseInt(userId, 10),
        UserName: document.getElementById('edit-user-name').value.trim(),
        Password: document.getElementById('edit-password').value.trim(),
        Classification: document.getElementById('edit-classification').value.trim()
    };
    fetch(`${uri}/${userId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: "Bearer " + sessionStorage.getItem("token").substring(1).slice(0, -1)
        },
        body: JSON.stringify(user)
    })
        .then(() => getUsers())
        .catch(error => console.error('Unable to update user.', error));

    closeInput();
    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(userCount) {
    const name = (userCount === 1) ? 'user' : 'users';

    document.getElementById('counter').innerText = `${userCount} ${name}`;
}

function _displayUsers(data) {
    const tBody = document.getElementById('users');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(user => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${user.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteUser(${user.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNodeUserName = document.createTextNode(user.userName);
        td1.appendChild(textNodeUserName)

        let td2 = tr.insertCell(1);
        let textNodePassword = document.createTextNode(user.password);
        td2.appendChild(textNodePassword);

        let td3 = tr.insertCell(2);
        let textNodeClassification = document.createTextNode(user.classification);
        td3.appendChild(textNodeClassification);

        let td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        let td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });


    users = data;
}