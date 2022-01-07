let klikNaDugme = document.getElementById('start')
let klikNaNext = $('.next')[0]
let brojac = 0

klikNaDugme.addEventListener('click', zapocniTest)

function zapocniTest() {

    let pitanjaIOdgovori = [
        {
            pitanje: 'Koji je Glavni grad Finske?',
            tacanOdg: 'Helsinki',
            pogresanOdg1: 'Oslo',
            pogresanOdg2: 'Kopenhagen',
            pogresanOdg3: 'Stockholm'
        },
        {
            pitanje: 'Koje godine se zavrsio drugi svetski rat?',
            tacanOdg: 1945,
            pogresanOdg1: 1944,
            pogresanOdg2: 1918,
            pogresanOdg3: 1919
        },
        {
            pitanje: 'Koja je planeta najtoplija u suncevom sistemu?',
            tacanOdg: 'Venera',
            pogresanOdg1: 'Mars',
            pogresanOdg2: 'Zemlja',
            pogresanOdg3: 'Merkur'
        },
        {
            pitanje: 'U kojoj zemlji je nastala Cezar salata?',
            tacanOdg: 'Meksiko',
            pogresanOdg1: 'Italija',
            pogresanOdg2: 'Spanija',
            pogresanOdg3: 'Brazil'
        },
        {
            pitanje: 'Koliko srca ima hobotnica?',
            tacanOdg: 3,
            pogresanOdg1: 2,
            pogresanOdg2: 5,
            pogresanOdg3: 1
        }
    ];

    let promesajNiz = pitanjaIOdgovori
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

    mapiranje(promesajNiz)
    $('.q').removeClass('d-none').show()
    $('.next').removeClass('d-none').show()
    $('#start')[0].style.display = 'none'
}


function mapiranje(promesajNiz) {
    let promesanibrojevi = [1, 2, 3, 4]

    let probro = promesanibrojevi
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    let pitanjeUKvizu = promesajNiz[brojac].pitanje

    console.log(promesajNiz[0])

    $('.pitanje')[0].innerText = pitanjeUKvizu
    $('.q' + probro[0])[0].innerText = promesajNiz[brojac].tacanOdg
    $('.q' + probro[1])[0].innerText = promesajNiz[brojac].pogresanOdg1
    $('.q' + probro[2])[0].innerText = promesajNiz[brojac].pogresanOdg2
    $('.q' + probro[3])[0].innerText = promesajNiz[brojac].pogresanOdg3

    
    brojac++

}

klikNaNext.addEventListener('click', nextFunkcija)

function nextFunkcija(){
 mapiranje(promesajNiz)

}