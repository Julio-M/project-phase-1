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

// async function stickData() {
//   let req = await fetch(baseUrl)
//   let res = await req.json()
//   return res
// }

// stickData().then (data => {
//   data.forEach(newData => {
//     let favrow = document.querySelector('#favrows')
//     let td = document.createElement('td')
//     let tr = document.createElement('tr')
//     td.textContent = newData.name
//     console.log(td)
//     tr.append(td)
//     favrow.append(tr)
//   })
// })