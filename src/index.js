const coinUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'



const getData = async () =>{
  try{
  let req = await fetch(coinUrl)
  const res = await req.json()
  const keys = res.forEach((data)=>{
    data
  })
  } catch(error)
  {
    console.log(error)
  }
}

getData()