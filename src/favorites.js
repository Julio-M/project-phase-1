


const createFave = (cname,cprice,cpchange,cimage,cid, cgid) => {
    const favoriteTable = document.querySelector('#favrows')
    let theRow = document.createElement('tr')
    let theName = document.createElement('td')
    let thePrice = document.createElement('td')
    let theChPrice = document.createElement('td')
    let img = document.createElement('img')
    let button = document.createElement('i')
    let th = document.createElement('th')
    let theLogo = document.createElement('th')


    button.id=cid
    button.className=('fa-solid fa-gem myBtn delete')

    let addbtn = document.querySelectorAll('.add')
    addbtn.forEach((spec)=>{
      if (spec.id===cgid){
        spec.className='fa-solid fa-gem changed'
      }
    })
    console.log('THIS IS THE ADD', addbtn)

    
    th.scope='row'
    th.id='myBtnCol'
    th.appendChild(button)

    img.src = cimage
    img.className='coinlogo'
    img.style.width = '20px'

    theLogo.id='logoFav'
    theLogo.append(img)

    theRow.id = cgid
    theRow.className='coinFav'
    theName.textContent =cname
    theName.className='favName'

    
    let usdcprice = new Intl.NumberFormat('en-US', {
      style:'currency', 
      currency:'USD',
      currencySign: 'accounting'
  }).format(cprice)
    thePrice.textContent=usdcprice

    percpchange = parseFloat(cpchange).toFixed(2)
    theChPrice.textContent=percpchange +'%'

    
    theRow.append(theLogo,theName,thePrice,theChPrice,th)
    favoriteTable.appendChild(theRow)
    // add click function to each row to show chart start
    const favCoin = document.querySelectorAll('.coinFav')
    const favLogo  = document.createElement('img')
    const header = document.createElement('h3')
    favCoin.forEach(row => {
      row.addEventListener('click', e => {
        let favURL = `https://api.coingecko.com/api/v3/coins/${row.id}/market_chart?vs_currency=usd&days=0.041&interval=1m`
        fetchData(favURL)
        hourData(row.id)
        dayData(row.id)
        
        favLogo.src = row.querySelector('.coinlogo').src
        favLogo.className = 'fav'
        header.textContent = row.querySelector('.favName').textContent
        charTitle.innerHTML = ''
        header.appendChild(favLogo)
        charTitle.append(header)
      })
    })

    // add click function to each row to show chart end
}

// getData().then(createFave('name','hello', 'there'))



const baseUrl="http://localhost:3000/favorites"

async function deleteFav(theid){
  try{
    const r = await fetch(baseUrl +`/${theid}`,{
     method:'Delete',
     })
    const coinData = await r.json()
    console.log(coinData.id)
    }
   catch(err) {
     // catches errors both in fetch and response.json
     alert(err);
   }
 }



async function toFavTable(){

    try {
    let req = await fetch(baseUrl)
    const res =  await req.json()
    const data = res.map((value)=>{
        createFave(value.name,value["current_price"],value["price_change_percentage_24h"],value.image,value.id,value.cgid)
    })
    } catch(error)
    {
        console.log(error)
    }
}


toFavTable().then(() => {
  const deleteB = document.querySelectorAll('.delete')
  console.log(deleteB)
  deleteB.forEach((theId)=>{
    theId.addEventListener('click', (e)=>{
      //console.log(theId)
      deleteFav(theId.id)
    })
  })
}
)

async function sendData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange){

    try{
        let req = await fetch(baseUrl)
        const res = await req.json()
        const filterData = res.map((value) => {
            return value.cgid
        })
        
        filterData.includes(coinId) || postData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange)
        // if (!filterData.includes(coinId)){
        //     postData(coinId,coinSymbol,coinName,coinImage,coinPriceNow,coinPriceChange)

        // }
        // addBtn.forEach(add => {
        //   console.log(add)
        //   add.addEventListener('click', e => {
        //     if (add.id in filterData === true) {
        //       add.className = ('fa-regular fa-gem myBtn add')
        //     } 
        //   })
        // })

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

