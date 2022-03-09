const createFave = (cname,cprice,cpchange) => {
    let theName = document.createElement('td')
    let thePrice = document.createElement('td')
    let theChPrice = document.createElement('td')
}

async function sendData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange){
    const baseUrl="http://localhost:3000/favorites"

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


  async function fetchToys(){
    const res = await fetch(baseUrl)
    const toys = await res.json()
    createCard(toys)
  }

