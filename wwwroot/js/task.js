const uri = '/Tasks';
let tasks = [];

function getItems() {

   /* serverCalls("",'GET',null)
    .then(data=> _displayItems(data));*/
    
    fetch(uri,{
        headers:{
            Authorization:"Bearer "+sessionStorage.getItem("token").substring(1).slice(0,-1)
        }
    })
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addDescriptionTextbox = document.getElementById('add-description');
    const addisDoneChekbox = document.getElementById('add-isDone');


    const item = {
        Description: addDescriptionTextbox.value.trim(),
        IsDone: addisDoneChekbox.checked
    };
    fetch(uri, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:"Bearer "+sessionStorage.getItem("token").substring(1).slice(0,-1)
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(() => {
            getItems();
            addDescriptionTextbox.value = '';
            addisDoneChekbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
            method: 'DELETE',
            headers:{
                Authorization:"Bearer "+sessionStorage.getItem("token").substring(1).slice(0,-1)
            }
        })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = tasks.find(item => item.id === id);
    
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-description').value = item.description;
    document.getElementById('edit-isDone').checked = item.isDone;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;

    const item = {
        Id: parseInt(itemId, 10),
        Description: document.getElementById('edit-description').value.trim(),
        IsDone: document.getElementById('edit-isDone').checked
    };
    fetch(`${uri}/${itemId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization:"Bearer "+sessionStorage.getItem("token").substring(1).slice(0,-1)
            },
            body: JSON.stringify(item)
        })
        .then( () => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();
    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'task' : 'tasks';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('tasks');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isDoneCheckbox = document.createElement('input');
        isDoneCheckbox.type = 'checkbox';
        isDoneCheckbox.disabled = true;
        isDoneCheckbox.checked = item.isDone;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(isDoneCheckbox);

        let td2 = tr.insertCell(1);
        let textNode = document.createTextNode(item.description);
        td2.appendChild(textNode);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    
    tasks = data;
}

/*async function serverCalls(url,method,body){
    
    const token="Bearer "+sessionStorage.getItem("token").substring(1).slice(0,-1);
    var requestOptions = {
    method: method,
    headers: {
        "Authorization":token,
        "Content-Type":"application/json"
    },
    body:body,
    redirect: 'follow'
    };

    return fetch(uri+url, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));
}*/