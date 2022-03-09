
function clickFav (coin) {
    let button = document.querySelector('#button')
    button.addEventListener('click', async e => {
        const data = await sendData()
        let object = {}
        let favRow = document.querySelector('#favrows')
        let tr = document.createElement('tr')
        let tdName = document.createElement('td')
        let tdPrice = document.createElement('td')
        let tdHour = document.createElement('td')

        tdName.textContent = coin.querySelector('.chartname').textContent
        tdPrice.textContent = coin.querySelector('.price').textContent
        tdHour.textContent = coin.querySelector('.percentdiff').textContent
        tr.append(tdName, tdPrice, tdHour)
        console.log(tr)
        favRow.appendChild(tr)
        console.log(favRow)
    
    })

}

async function sendData() {
    const cgData = {name: "ethereum", current_price: 3000, price_change_percentage_24h: 2.39}
    try {
        const response = await fetch('http://localhost:3000/favorites', {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(cgData),
        })
        const data = await response.json()
        console.log('Success:', cgData);
    } catch(error) {
        console.error('Error:', error);
        }
}


