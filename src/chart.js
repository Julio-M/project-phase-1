const headers = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

const hourButton = document.querySelector('#hour')
const dayButton = document.querySelector('#day')
const grabChart = document.querySelector('#myChart')
const fullChart = document.querySelector('.chart')
const divChart = document.querySelector('.chart')
console.log(divChart)

const defaultUrl = "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=0.041&interval=1m"

const recreateChart = () => {
  const grabChart = document.querySelector('#myChart')
  const fromChart = document.querySelector('.chartjs-size-monitor')
  fromChart.remove()
  grabChart.remove()
  const canvas = document.createElement('canvas')
  canvas.id = 'myChart'
  canvas.height = '350'
  fullChart.append(canvas)
}

function hrButton(coin) {
  newCoin = coin
  hourButton.addEventListener('click', (e)=>{
    if (newCoin) {
      recreateChart()
      const hourData = 0.041
      const hourUrl = `https://api.coingecko.com/api/v3/coins/${newCoin}/market_chart?vs_currency=usd&days=${hourData}&interval=1m`
      
      fetchData(hourUrl)

    }
  })
}

function dyButton(coin) {
  newCoin = coin
  dayButton.addEventListener('click', (e) => {
    if (newCoin) {
      recreateChart()
      const dayData = 1
      const dayUrl = `https://api.coingecko.com/api/v3/coins/${newCoin}/market_chart?vs_currency=usd&days=${dayData}&interval=1m`
      
      fetchData(dayUrl)
    }
  }) 
}
  canvas.height='350'
  divChart.append(canvas)
}

const hourData = (coin) => {
    newCoin = coin
    hourButton.addEventListener('click', (e)=>{
    if (newCoin){
      recreateChart()
      const hourData = 0.041
      const hourUrl = `https://api.coingecko.com/api/v3/coins/${newCoin}/market_chart?vs_currency=usd&days=${hourData}&interval=1m`
      fetchData(hourUrl)
      console.log('From the hour f',newCoin)
    }
  })  
}

const dayData = (coin) => {
  newCoin = coin
  dayButton.addEventListener('click', (e) => {
    if (newCoin){
      recreateChart()
      const dayData = 1
      const dayUrl = `https://api.coingecko.com/api/v3/coins/${newCoin}/market_chart?vs_currency=usd&days=${dayData}&interval=1m`
      fetchData(dayUrl)
      console.log(dayUrl)
      console.log('From the day f',newCoin)
    }
  })
}

// hourButton.addEventListener('click', (e)=>{
//   recreateChart()
//   const hourData = 0.041
//   const hourUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${hourData}&interval=1m`
//   fetchData(hourUrl)
//   console.log(hourUrl)
// })

// dayButton.addEventListener('click', (e) => {
//   recreateChart()
//   const dayData = 1
//   const dayUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${dayData}&interval=1m`
//   fetchData(dayUrl)
//   console.log(dayUrl)
// })


async function fetchData(url){
  const res = await fetch(url)
  const coinData = await res.json()
  const prices = coinData.prices
  let allData = {xValues:[],yValues:[]}
  

  
  prices.forEach((data)=>{
    //console.log(typeof data[0])
    
    allData.xValues.push(new Date(data[0]).toDateString())
    allData.yValues.push(data[1].toFixed(2))
    //console.log(typeof xValues)
  })
  new Chart('myChart', {
    type: "line",
    data: {
      labels: allData.xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: allData.yValues
      }]
    },
    options: {
      legend: {display: false},
      scales: {
   
          xAxes: [{
              gridLines: {
                  display:false
              }
          }],
          yAxes: [{
              gridLines: {
                  display:false
              }   
          }]
      }
    }
  });
}

fetchData(defaultUrl)

