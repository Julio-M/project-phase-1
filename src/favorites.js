let object = {}

function clickFav (coin) {
    let button = document.querySelector('#button')
    button.addEventListener('click', e => {
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdPrice = document.createElement('td')
        let tdHour = document.createElement('td')

        tdName.textContent = coin.querySelector('.chartname').textContent
        tdPrice.textContent = coin.querySelector('.price').textContent
        tdHour.textContent = coin.querySelector('.percentdiff').textContent
        tr.append(tdName, tdPrice, tdHour)
    
    })

}