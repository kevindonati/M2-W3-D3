const getBook = () => {
  fetch(" https://striveschool-api.herokuapp.com/books", {})
    .then((response) => {
      console.log("RESPONSE", response)

      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Risposta ricevuta, ma c'è un errore", response.status)
      }
    })
    .then((data) => {
      console.log("DATI", data)

      for (let i = 0; i < data.length; i++) {
        let scheda = document.createElement("div")
        const containerSchede = document.getElementById("container-schede")
        scheda.classList.add("col-6")
        scheda.classList.add("col-md-4")
        scheda.classList.add("col-lg-3")
        scheda.classList.add("g-3")
        containerSchede.appendChild(scheda)
        scheda.innerHTML = `
        <div class="card bg-black text-light h-100 d-flex flex-column justify-content-between">
            <img src="${data[i].img}" class="card-img-top" alt="copertina libro" style="height: 450px;" />
            <div class="card-body">
            <h5 class="card-title">${data[i].title}</h5>
            <p class="card-text">Prezzo: ${data[i].price}$</p>
            <button onclick="eliminaLibro(event)"  class="btn btn-primary w-100 mb-3 elimina">Scarta</button>
            <button onclick="aggiungiCarrello(event)"  class="btn btn-primary w-100 acquista">Acquista</button>
        </div>
        `
      }
    })
    .catch((error) => {
      console.log("errore", error)
    })
}
getBook()

const eliminaLibro = (event) => {
  event.preventDefault()
  event.target.closest(".col-6").remove()
}

let carrello = JSON.parse(localStorage.getItem("carrello-libri")) || []

const aggiungiCarrello = (event) => {
  const ul = document.getElementById("lista-carrello")
  const li = document.createElement("li")

  const card = event.target.closest(".card")
  const titolo = card.querySelector(".card-title").innerText
  const prezzo = card.querySelector(".card-text").innerText

  const prodotto = { titolo, prezzo }
  carrello.push(prodotto)

  localStorage.setItem("carrello-libri", JSON.stringify(carrello))

  li.innerHTML += `
    <div class="d-flex justify-content-between align-content-center p-2 cont" data-titolo="${titolo}">
        <a class="dropdown-item p-0" href="#">${titolo}</a>
        <div class="d-flex">
        <p class="m-0">${prezzo}</p>
        <button onclick="eliminaCarrello(event)" class="p-x3 bg-danger text-light"><i class="bi bi-trash3-fill"></i></button>
        </div>
    </div>
  `
  ul.prepend(li)
}

const eliminaCarrello = (event) => {
  event.preventDefault()

  const cont = event.target.closest(".cont")
  const titolo = cont.dataset.titolo
  cont.remove()

  carrello = carrello.filter((item) => item.titolo !== titolo)
  localStorage.setItem("carrello-libri", JSON.stringify(carrello))
}

window.onload = () => {
  const ul = document.getElementById("lista-carrello")
  carrello.forEach((item) => {
    const li = document.createElement("li")
    li.innerHTML += `
    <div class="d-flex justify-content-between align-content-center p-2 cont" data-titolo="${item.titolo}">
        <a class="dropdown-item p-0" href="#">${item.titolo}</a>
        <div class="d-flex">
        <p class="m-0">${item.prezzo}</p>
        <button onclick="eliminaCarrello(event)" class="p-x3 bg-danger text-light"><i class="bi bi-trash3-fill"></i></button>
        </div>
    </div>
  `
    ul.prepend(li)
  })
}
