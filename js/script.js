let klikNaDugme = $('#start')[0]
let klikNaNext = $('.next')[0]
let brojac = 0
let pitanjaIOdgovori = []

fetch('data.json')
    .then(response => response.json())
    .then(json =>
        pitanjaIOdgovori = json
    );

function mapiranje(x) {

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
}

klikNaDugme.addEventListener('click', zapocniTest)

function zapocniTest() {
    let promesajNiz = pitanjaIOdgovori
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    pitanjaIOdgovori = promesajNiz
    mapiranje(promesajNiz)

    $('.q').removeClass('d-none').show()
    $('.next').removeClass('d-none').show()
    $('#start')[0].style.display = 'none'
}



klikNaNext.addEventListener('click', nextFunkcija)

function nextFunkcija() {
    mapiranje(pitanjaIOdgovori)
}

$('.q').click(function () {
    if (this.innerHTML == pitanjaIOdgovori[brojac - 1].tacanOdg) {
        console.log('tacan odgovor')
        let element = this
        element.classList.add("bg-success");
        element.classList.add("border-dark");
        console.log(element)
    }
}
)
