let pitanjaIOdgovori = [];
let brojac = 0;
let brojPoena = 0;
let tabelaHighScore = JSON.parse(localStorage.getItem('tabelaHighScore')) || [];

// Baza sa pitanjima i odgovorima
fetch('data.json')
    .then(response => response.json())
    .then(json =>
        pitanjaIOdgovori = json
    );
// Nasumicno postavljanje pitanja
function mapiranje(x) {

    for (i = 1; i < 5; i++) {
        $('.q' + i)[0].classList.remove("bg-success", "bg-danger", "border-dark", "noClick")
    }
    let promesanibrojevi = [1, 2, 3, 4]
    let probro = promesanibrojevi
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    $('.pitanje')[0].innerText = x[brojac].pitanje
    $('.q' + probro[0])[0].innerText = x[brojac].tacanOdg
    $('.q' + probro[1])[0].innerText = x[brojac].pogresanOdg1
    $('.q' + probro[2])[0].innerText = x[brojac].pogresanOdg2
    $('.q' + probro[3])[0].innerText = x[brojac].pogresanOdg3
    brojac++
};
// Pocetak testa
$('#start')[0].addEventListener('click', zapocniTest)

function zapocniTest() {
    let promesajNiz = pitanjaIOdgovori
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    pitanjaIOdgovori = promesajNiz

    $('.q').removeClass('d-none').show()
    $('.next').removeClass('d-none').show()
    $('#start')[0].style.display = 'none'
    $('.poljeSaPoenima')[0].classList.add('d-none')

    mapiranje(promesajNiz)
};
// Sledece pitanje
$('.next')[0].addEventListener('click', nextFunkcija)
function nextFunkcija() {
    if (pitanjaIOdgovori[brojac] == undefined) {
        krajKviza()
    }
    else {
        mapiranje(pitanjaIOdgovori)
    }
};
// Provera tacnosti odgovora
$('.q').click(function () {

    let element = this
    let textNode = element.firstChild
    let URI = textNode.data
    $('.q').each(function () {
        this.classList.add('noClick')
    }
    )
    if (URI == pitanjaIOdgovori[brojac - 1].tacanOdg) {
        element.classList.add("bg-success");
        element.classList.add("border-dark");
        brojPoena++
    }
    else {
        element.classList.add("bg-danger");
        element.classList.add("border-dark");
        brojPoena -= 3
        console.log('trenutno broj poena je ' + brojPoena)
    }
});
// Kraj Kviza
function krajKviza() {
    $('.next')[0].classList.add('d-none')
    $('.poljeSaPoenima')[0].classList.remove('d-none')
    $('.q').each(function () {
        this.classList.add('d-none')
    })
    if (brojPoena > 0) {
        $('.pitanje')[0].innerHTML = 'Ukupno se sakupili ' + brojPoena + ' bodova, cestitamo!'
    }
    else {
        $('.pitanje')[0].innerHTML = 'Nazalost imate ' + brojPoena + ' bodova, vise srece drugi put!'
    }
    $('.ponovite')[0].classList.remove('d-none')
};
// unosenje podataka u localstorage
$('.unosenjeSkora').click(function () {
    let imeIgraca = $('.ime')[0].value
    if (imeIgraca == '') { }
    else {
        if (brojPoena > 0) {
            let igrac = {
                ime: imeIgraca,
                skor: brojPoena
            }
            tabelaHighScore.push(igrac)
            localStorage.setItem('tabelaHighScore', JSON.stringify(tabelaHighScore))
            const parent = document.getElementById("tabelaSaPoenima")
            while (parent.firstChild) {
                parent.firstChild.remove()
            }
            loadHighScore()
        }
    }
});

// ponavljanje testa

$('.ponovite').click(function () {
    brojac = 0
    brojPoena = 0
    zapocniTest()
});

// vadjenje podataka iz localstoraga

function loadHighScore() {
    tabelaHighScore.sort((a, b) => b.skor - a.skor)
    for (i = 0; i < tabelaHighScore.length; i++) {
        let tr = document.createElement('tr')
        let th1 = document.createElement('th')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let imeTR = document.createTextNode(tabelaHighScore[i].ime)
        let poeniTR = document.createTextNode(tabelaHighScore[i].skor)
        tr.append(th1)
        tr.append(td2)
        tr.append(td3)
        th1.append(i + 2)
        td2.append(imeTR)
        td3.append(poeniTR)
        $('.tabelaSaPoenima')[0].append(tr)
    }
};

loadHighScore();
