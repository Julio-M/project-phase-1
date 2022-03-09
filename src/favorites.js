


const createFave = (cname,cprice,cpchange,cimage,cid) => {
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
    button.className=('fa-solid fa-circle-notch myBtn delete')
    th.scope='row'
    th.id='myBtnCol'
    th.appendChild(button)

    img.src = cimage
    img.className='coinlogo'
    img.style.width = '20px'

    theLogo.id='logoFav'
    theLogo.append(img)

    theRow.className='coinFav'
    theName.textContent =cname
    thePrice.textContent=cprice
    theChPrice.textContent=cpchange

    theRow.append(theLogo,theName,thePrice,theChPrice,th)
    favoriteTable.appendChild(theRow)
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
        createFave(value.name,value["current_price"],value["price_change_percentage_24h"],value.image,value.id)
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

