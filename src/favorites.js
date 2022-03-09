


const createFave = (cname,cprice,cpchange) => {
    const favoriteTable = document.querySelector('#favrows')
    let theRow = document.createElement('tr')
    let theName = document.createElement('td')
    let thePrice = document.createElement('td')
    let theChPrice = document.createElement('td')

    theRow.className='coin'
    theName.textContent =cname
    thePrice.textContent=cprice
    theChPrice.textContent=cpchange

    console.log('THIS IS THE TABLE', favoriteTable)
    theRow.append(theName,thePrice,theChPrice)
    favoriteTable.appendChild(theRow)
}

// getData().then(createFave('name','hello', 'there'))

const baseUrl="http://localhost:3000/favorites"

async function toFavTable(){

    try {
    let req = await fetch(baseUrl)
    const res =  await req.json()
    const data = res.map((value)=>{
        createFave(value.name,value["current_price"],value["price_change_percentage_24h"])
    })
    } catch(error)
    {
        console.log(error)
    }
}

fetchData().then(toFavTable())

async function sendData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange){

    try{
        let req = await fetch(baseUrl)
        const res = await req.json()
        const filterData = res.map((value) => {
            return value.cgid
        })
        console.log('Before post', filterData)
        filterData.includes(coinId) || postData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange)
        // if (!filterData.includes(coinId)){
        //     postData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange)

        // }
    
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

