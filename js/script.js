let klikNaDugme = $('#start')[0]
let klikNaNext = $('.next')[0]
let pitanjaIOdgovori = []
let brojac = 0
let brojPoena = 0

fetch('data.json')
    .then(response => response.json())
    .then(json =>
        pitanjaIOdgovori = json
    );

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
    if (pitanjaIOdgovori[brojac] == undefined){
        krajKviza()
    }
    else { 
    mapiranje(pitanjaIOdgovori)
    }
}

$('.q').click(function () {

    let element = this
    let textNode = element.firstChild
    let URI = textNode.data
    $('.q').each(function(){
        this.classList.add('noClick')}
    )
    if (URI == pitanjaIOdgovori[brojac - 1].tacanOdg) {
        element.classList.add("bg-success");
        element.classList.add("border-dark");
        brojPoena++
    }
    else {
        element.classList.add("bg-danger");
        element.classList.add("border-dark");
        brojPoena--
        console.log('trenutno broj poena je ' + brojPoena)
    }
}
)

function krajKviza() {
    $('.next')[0].classList.add('d-none')
    $('.q').each(function(){
        this.classList.add('d-none')
    })
    $('.pitanje')[0].innerHTML = 'Ukupno se sakupili ' + brojPoena + ' bodova, cestitamo!'
    $('#start')[0].style.display = 'block'
    $('#start')[0].innerHTML = 'Ponovite test'
    brojac = 0
    brojPoena = 0
}
