
const cont = document.getElementById('out')
const btn = document.getElementById('btn')
btn.addEventListener('click', getSubs)
const form = document.getElementById('form')
form.addEventListener('submit', (event) => {
    event.preventDefault()
    createSub()
})
const n = document.getElementById('name')
const s = document.getElementById('subscribedToChannel')




function getSubs() {
    fetch('http://localhost:3000/subscribers')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            makeList(data)
        })
        .catch(err => console.log(err))
}

function makeList(arr) {
    let html = ''
    for (sub of arr.reverse()) {
        html += `
        <div class="elem">
        <h1>${sub.name}</h1>
        <h2>${sub.subscribedToChannel}</h2>
        <h3>${sub.subscribeDate}</h3>
        <button onclick="delOne('${sub._id}')">Delete</button>
        </div>
        `
    }
    cont.innerHTML = html
}

function delOne(id) {
    const options = {
        method: 'DELETE'
    }
    fetch('http://localhost:3000/subscribers/' + id, options)
        .then(res => res.json())
        .then(res => {
            console.log(res.message)
            getSubs()
        })
        .catch(err => console.log(err))
}


function createSub() {

    const data = {
        name: n.value,
        subscribedToChannel: s.value
    }
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch('http://localhost:3000/subscribers', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            getSubs()
        })
        .catch(err => console.log(err))
}


