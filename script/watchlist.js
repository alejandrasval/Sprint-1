let form = document.getElementById('form');
let btnSendMovie = document.getElementById('btnFindMovie')
let btnFindMovie = document.getElementById('btnFindMovie')
let btnEditMovie = document.getElementById('btnEditMovie')
let btnDeleteMovie = document.getElementById('btnDeleteMovie')
let url = 'http://localhost:4001/peliculas/'


// POST

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let name = document.getElementById('name').value;
    let genre = document.getElementById('genre').value;

    await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name,
            genre
        }),
        headers: {
            'Content-Type': "application/json; charset=UTF-8"
        }
    })
})

// GET

btnFindMovie.addEventListener('click', async () => {
    let nameCapt = document.getElementById('name').value;
    document.getElementById('id').readOnly = true;

    const respuesta = await fetch(url)
    const data = await respuesta.json()
    console.log(data)

    let busq = data.find(obj => obj.name.toLowerCase() === nameCapt.toLowerCase())
    console.log(busq)

    document.getElementById('name').value = busq.name
    document.getElementById('genre').value = busq.genre
    document.getElementById('id').value = busq.id
})

// PUT

btnEditMovie.addEventListener('click', async() => {
    let name = document.getElementById('name').value;
    let genre = document.getElementById('genre').value;
    let id = document.getElementById('id').value;

    await fetch(url + id, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            genre
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
})

// DELETE

btnDeleteMovie.addEventListener('click', async () => {

    let id = document.getElementById('id').value;
    await fetch(`http://localhost:4001/peliculas/${id}`, {
        method: 'DELETE',
    });
});




