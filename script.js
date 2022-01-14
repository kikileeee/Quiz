let pitanjaIOdgovori = [];
let brojac = 0;
let brojPoena = 0;
let tabelaHighScore = JSON.parse(localStorage.getItem('tabelaHighScore')) || [];
let nizPitanja = [];

// Baza sa pitanjima i odgovorima
fetch('data.json')
    .then(response => response.json())
    .then(json =>
        pitanjaIOdgovori = json
    );
// Nasumicno postavljanje pitanja
function mapiranje(x) {
    $('.poeni')[0].classList.remove("poeniPozitivno", "poeniNegative");
    for (i = 1; i < 5; i++) {
        $('.q' + i)[0].classList.remove("bg-success", "bg-danger", "border-dark", "noClick")
    };
    let promesanibrojevi = [1, 2, 3, 4];
    let probro = promesanibrojevi
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    $('.pitanje')[0].innerText = x[brojac].pitanje;
    $('.q' + probro[0])[0].innerText = x[brojac].tacanOdg;
    $('.q' + probro[1])[0].innerText = x[brojac].pogresanOdg1;
    $('.q' + probro[2])[0].innerText = x[brojac].pogresanOdg2;
    $('.q' + probro[3])[0].innerText = x[brojac].pogresanOdg3;
    brojac++;
};
// Pocetak testa
$('#start')[0].addEventListener('click', zapocniTest);

function zapocniTest() {
    
    let promesajNiz = pitanjaIOdgovori
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    pitanjaIOdgovori = promesajNiz;
    nizPitanja = promesajNiz;

    $('.q').removeClass('d-none').show();
    $('.next').removeClass('d-none').show();
    $('#start')[0].style.display = 'none';
    $('.poljeSaPoenima')[0].classList.add('d-none');
    $('.pisanjeNadimka')[0].classList.add('d-none');
    $('.poeni')[0].classList.remove('d-none');
    $('.bookmarkPolje')[0].classList.remove('d-none');
    $('.ime')[0].value = '';
    
    $('.str')[brojac].classList.add('btn-primary');
    $('.str')[brojac].classList.remove('btn-outline-primary');

    mapiranje(promesajNiz);
    
};
// Sledece pitanje
$('.next')[0].addEventListener('click', nextFunkcija)
function nextFunkcija() {
    if (pitanjaIOdgovori[brojac] == undefined) {
        krajKviza();
    }
    else {
        mapiranje(pitanjaIOdgovori)
        $('.str').each(function () {
            this.classList.remove('btn-primary');
            this.classList.add('btn-outline-primary');
        })
        $('.str')[brojac - 1].classList.add('btn-primary');
        $('.str')[brojac - 1].classList.remove('btn-outline-primary');
        sledeceIliKraj();
    };
};
// provera da li je kraj kviza
function sledeceIliKraj(){
    if (pitanjaIOdgovori[brojac] == undefined) {
        $('.next')[0].innerHTML = 'Zavrsni test';
    } else {
        $('.next')[0].innerHTML = 'Sledece pitanje';
    }
};
// Provera tacnosti odgovora
$('.q').click(function () {

    let element = this;
    let textNode = element.firstChild;
    let URI = textNode.data;
    $('.q').each(function () {
        this.classList.add('noClick');
    });
    if (URI == pitanjaIOdgovori[brojac - 1].tacanOdg) {
        element.classList.add("bg-success");
        element.classList.add("border-dark");
        $('.poeni')[0].classList.add('poeniPozitivno');
        brojPoena++;
    }
    else {
        element.classList.add("bg-danger");
        element.classList.add("border-dark");
        $('.poeni')[0].classList.add('poeniNegative');
        brojPoena -= 3;
    }

    $('.poeni')[0].innerHTML = 'Poeni: ' + brojPoena;

});
// Kraj Kviza
function krajKviza() {
    $('.next')[0].classList.add('d-none');
    $('.poeni')[0].classList.add('d-none');
    $('.poljeSaPoenima')[0].classList.remove('d-none');
    $('.bookmarkPolje')[0].classList.add('d-none');
    $('.str').each(function () {
        this.classList.remove('btn-primary');
        this.classList.add('btn-outline-primary');
    })
    $('.q').each(function () {
        this.classList.add('d-none');
    })
    if (brojPoena > 0) {
        $('.pitanje')[0].innerHTML = 'Vas skor je ' + brojPoena + ' , cestitamo! </br> Mozete da ponovite test!';
        $('.pisanjeNadimka')[0].classList.remove('d-none');
    }
    else {
        $('.pitanje')[0].innerHTML = 'Nazalost, vas skor je ' + brojPoena + ' , vise srece drugi put! </br> Mozete da ponovite test!';
    };
    $('.ponovite')[0].classList.remove('d-none');
};
// unosenje podataka u localstorage
$('.unosenjeSkora').click(function () {
    let imeIgraca = $('.ime')[0].value;
    if (imeIgraca == '') { }
    else {
        if (brojPoena > 0) {
            let igrac = {
                ime: imeIgraca,
                skor: brojPoena
            };
            tabelaHighScore.push(igrac);
            localStorage.setItem('tabelaHighScore', JSON.stringify(tabelaHighScore));
            const parent = document.getElementById("tabelaSaPoenima");
            while (parent.firstChild) {
                parent.firstChild.remove();
            };
            loadHighScore();
        }
    }

    $('.pisanjeNadimka')[0].classList.add('d-none');
});

// ponavljanje testa

$('.ponovite').click(function () {
    brojac = 0;
    brojPoena = 0;
    $('.next')[0].innerHTML = 'Sledece pitanje'  ;
    $('.poeni')[0].innerHTML = 'Poeni: 0';
    $('.ponovite')[0].classList.add('d-none');
    zapocniTest();
});

// vadjenje podataka iz localstoraga

function loadHighScore() {
    tabelaHighScore.sort((a, b) => b.skor - a.skor);
    for (i = 0; i < tabelaHighScore.length; i++) {
        if (i < 10) {
            let tr = document.createElement('tr');
            let th1 = document.createElement('th');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            let imeTR = document.createTextNode(tabelaHighScore[i].ime);
            let poeniTR = document.createTextNode(tabelaHighScore[i].skor);
            tr.append(th1);
            tr.append(td2);
            tr.append(td3);
            th1.append(i + 1);
            td2.append(imeTR);
            td3.append(poeniTR);
            $('.tabelaSaPoenima')[0].append(tr);
        };
    };
};

loadHighScore();

// Bookmark
function bookmarkLoad() {
    console.log(pitanjaIOdgovori)
    for (i = 0; i < 10; i++) {
        let a = document.createElement('a');
        a.classList.add('btn-outline-primary', 'btn', 'bookmark' + i, 'm-1', 'p-2','str');
        a.setAttribute('href', "#");
        let tekstBookmark = document.createTextNode('a');
        a.append(i + 1);
        $('.bookmarkPolje')[0].append(a);
    };
};

bookmarkLoad();
// klik na bookmark

$('.str').click(function () {
    let element = this;
    let brojBookmark = element.innerHTML;
    mapiranjeBookmark(nizPitanja[brojBookmark - 1]);
    brojac = Number(brojBookmark);
    $('.str').each(function () {
        this.classList.remove('btn-primary')
        this.classList.add('btn-outline-primary')
    });
    element.classList.remove('btn-outline-primary');
    element.classList.add('btn-primary');
    $('.poeni')[0].classList.remove("poeniPozitivno", "poeniNegative")
    for (i = 1; i < 5; i++) {
        $('.q' + i)[0].classList.remove("bg-success", "bg-danger", "border-dark", "noClick")
    };
    sledeceIliKraj();
})
function mapiranjeBookmark(x) {
    let promesanibrojevi = [1, 2, 3, 4];
    let probro = promesanibrojevi
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    $('.pitanje')[0].innerText = x.pitanje;
    $('.q' + probro[0])[0].innerText = x.tacanOdg;
    $('.q' + probro[1])[0].innerText = x.pogresanOdg1;
    $('.q' + probro[2])[0].innerText = x.pogresanOdg2;
    $('.q' + probro[3])[0].innerText = x.pogresanOdg3;
};