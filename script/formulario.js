let form = document.getElementById('form');
let btnFind = document.getElementById('btnFind')
let btnEdit = document.getElementById('btnEdit')
let btnDelete = document.getElementById('btnDelete')
let url = 'http://localhost:4000/usuarios/'


// POST

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name,
            lastName,
            email
        }),
        headers: {
            'Content-Type': "application/json; charset=UTF-8"
        }
    })
})

// GET

btnFind.addEventListener('click', async () => {
    let emailCapt = document.getElementById('email').value;
    document.getElementById('email').readOnly = true;

    const respuesta = await fetch(url)
    const data = await respuesta.json()
    console.log(data)

    let busq = data.find(user => user.email.toLowerCase() === emailCapt.toLowerCase())
    console.log(busq)

    document.getElementById('name').value = busq.name
    document.getElementById('lastName').value = busq.lastName
    document.getElementById('email').value = busq.email
    document.getElementById('id').value = busq.id
})

// PUT

btnEdit.addEventListener('click', async() => {
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let id = document.getElementById('id').value;

    await fetch(url + id, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            lastName,
            email,
            id
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
})

// DELETE

btnDelete.addEventListener('click', async () => {

    let id = document.getElementById('id').value;
    await fetch(`http://localhost:4000/usuarios/${id}`, {
        method: 'DELETE',
    });
});

