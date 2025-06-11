
const minut = []
const muli = []
const canne = []
const fili = []
const esc = []

const allProduct = [{
    minuteria: minut,
    mulinelli: muli,
    canneDaPesca: canne,
    filo: fili,
    esche: esc
}]

function loadProducts() {
    if (localStorage.getItem("minuteria")) {
        minut.push(...JSON.parse(localStorage.getItem("minuteria")))
    }
    if (localStorage.getItem("mulinelli")) {
        muli.push(...JSON.parse(localStorage.getItem("mulinelli")))
    }
    if (localStorage.getItem("canneDaPesca")) {
        canne.push(...JSON.parse(localStorage.getItem("canneDaPesca")))
    }
    if (localStorage.getItem("filo")) {
        fili.push(...JSON.parse(localStorage.getItem("filo")))
    }
    if (localStorage.getItem("esche")) {
        esc.push(...JSON.parse(localStorage.getItem("esche")))
    }
}

window.onload = loadProducts

function sandProducts() {
    const elMinuteria = document.getElementById("insMinuteria")
    const elMulinelli = document.getElementById("insMulinelli")
    const elCanneDaPesca = document.getElementById("insCanneDaPesca")
    const elFilo = document.getElementById("insFilo")
    const elEsche = document.getElementById("insEsche")
    const minuteria = elMinuteria.value
    const mulinelli = elMulinelli.value
    const canneDaPesca = elCanneDaPesca.value
    const filo = elFilo.value
    const esche = elEsche.value

    if (minuteria) {
        minut.push(minuteria)
        elMinuteria.value = ""
        localStorage.setItem("minuteria", JSON.stringify(minut))
    }
    if (mulinelli) {
        muli.push(mulinelli)
        elMulinelli.value = ""
        localStorage.setItem("mulinelli", JSON.stringify(muli))
    }
    if (canneDaPesca) {
        canne.push(canneDaPesca)
        elCanneDaPesca.value = ""
        localStorage.setItem("canneDaPesca", JSON.stringify(canne))
    }
    if (filo) {
        fili.push(filo)
        elFilo.value = ""
        localStorage.setItem("filo", JSON.stringify(fili))
    }
    if (esche) {
        esc.push(esche)
        elEsche.value = ""
        localStorage.setItem("esche", JSON.stringify(esc))
    }
}

function showMinuteria() {
    document.getElementById("prodotti").innerHTML = ``
    document.getElementById("prodotti").innerHTML = minut.map((minut) => `<li>${minut}</li>`).join("")
}
function showMulinelli() {
    document.getElementById("prodotti").innerHTML = ``
    document.getElementById("prodotti").innerHTML = muli.map((muli) => `<li>${muli}</li>`).join("")
}
function showCanneDaPesca() {
    document.getElementById("prodotti").innerHTML = ``
    document.getElementById("prodotti").innerHTML = canne.map((canne) => `<li>${canne}</li>`).join("")
}
function showFilo() {
    document.getElementById("prodotti").innerHTML = ``
    document.getElementById("prodotti").innerHTML = fili.map((filo) => `<li>${filo}</li>`).join("")
}
function showEsche() {
    document.getElementById("prodotti").innerHTML = ``
    document.getElementById("prodotti").innerHTML = esc.map((esche) => `<li>${esche}</li>`).join("")
}

function showAllProducts() {
    document.getElementById("prodotti").innerHTML = ``
    document.getElementById("prodotti").innerHTML = allProduct.map((prod) => `
    <h6>Minuteria: ${prod.minuteria}</h6>
    <h6>Mulinelli: ${prod.mulinelli}</h6>
    <h6>Canne da Pesca: ${prod.canneDaPesca}</h6>
    <h6>Filo: ${prod.filo}</h6><h6>Esche: ${prod.esche}</h6>
    `).join("")
}

function deleteAllProduct() {
    const minut = []
    const muli = []
    const canne = []
    const fili = []
    const esc = []

    const allProduct = [{
        minuteria: minut,
        mulinelli: muli,
        canneDaPesca: canne,
        filo: fili,
        esche: esc
    }]

    localStorage.removeItem('minuteria')
    localStorage.removeItem('mulinelli')
    localStorage.removeItem('canneDaPesca')
    localStorage.removeItem('filo')
    localStorage.removeItem('esche')
    document.getElementById("prodotti").innerHTML = ``

}