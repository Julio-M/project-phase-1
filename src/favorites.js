<<<<<<< HEAD
const createFave = (cname,cprice,cpchange) => {
    let theName = document.createElement('td')
    let thePrice = document.createElement('td')
    let theChPrice = document.createElement('td')
}

const baseUrl="http://localhost:3000/favorites"

async function sendData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange){

    try{
        let req = await fetch(baseUrl)
        const res = await req.json()
        const filterData = res.map((value) => {
            return value.cgid
        })
        console.log('From map', filterData)
        filterData.includes(coinId) || postData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange)
        } catch(error)
        {
          console.log(error)
        }

  }


  async function postData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange){

    const data = { 
        "cgid":`${coinId}`,
        "symbol": `${coinSymbol}`,
        "name": `${coinName}`,
        "image": `${coinImage}`,
        "current_price": coinPriceNow,
        "price_change_percentage_24h": coinPriceChange,
        "favorite":true
        };
=======

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
>>>>>>> william2
    
        const myHeaders = {
            'Content-Type': 'application/json'
        }
            
        try
        {
        const res = await fetch(baseUrl,{
          method:'POST',
          headers: myHeaders,
          body: JSON.stringify(data)
        })
        console.log(res)
        const newData = await res.json()
        console.log(newData)
        return newData
      }
      catch(err) {
        // catches errors both in fetch and response.json
        console.log('Did you forget to add a -->/ in url or check your headers',err);
      }
}

<<<<<<< HEAD
=======
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


>>>>>>> william2
