let ramenMenu = document.querySelector('#ramen-menu')
let ramenDetail = document.querySelector('#ramen-detail')
let rating = document.querySelector('#rating-display')
let comment = document.querySelector('#comment-display')
let form = document.querySelector('#new-ramen')


document.addEventListener('DOMContentLoaded', getRamenPics)

function getRamenPics() {
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramen => ramen.forEach((ramen) => renderRamenPic(ramen)))
}

function renderRamenPic(ramen) {
    let ramenPic = document.createElement('img')
    ramenPic.src = ramen.image
    ramenPic.id = ramen.id
    ramenMenu.appendChild(ramenPic)
}

ramenMenu.addEventListener('click', renderRamenDetailPic)

function renderRamenDetailPic(e) {
    ramenDetail.firstChild.nextSibling.src = e.target.src
    fetch(`http://localhost:3000/ramens/${e.target.id}`)
    .then(res => res.json())
    .then(ramen => renderRamenDetail(ramen))
}

function renderRamenDetail(ramen) {
    console.log(ramenDetail.childNodes)
    console.log(ramen)
    ramenDetail.childNodes[3].textContent = ramen.name
    ramenDetail.childNodes[5].textContent = ramen.restaurant
    rating.textContent = ramen.rating
    comment.textContent = ramen.comment
}

form.addEventListener('submit', addNewRamen)

function addNewRamen(e) {
    

    let newRamen = {
        id: '',
        name: e.path[0][0].value,
        restaurant: e.path[0][1].value,
        img: e.path[0][2].value,
        rate: e.path[0][3].value,
        comment: e.path[0][4].value
    }
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
        
    })
    renderRamenPic(newRamen)
}
