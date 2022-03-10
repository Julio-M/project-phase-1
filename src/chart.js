const headers = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

const hourButton = document.querySelector('#hour')
const dayButton = document.querySelector('#day')
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
      const nChart = document.querySelector('#myChart')
      nChart.className='hour'
      console.log(nChart)

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
      const nChart = document.querySelector('#myChart')
      nChart.className='day'
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
  let allData = {xValues:[],yValues:[], xHourValues:[]}
  prices.map((data)=>{
    //console.log(typeof data[0])
    //console.log(data[0])
    allData.xHourValues.push(new Date(data[0]).toLocaleString('en-US', {hour:'numeric',minute:'numeric'})),
    allData.xValues.push(new Date(data[0]).toLocaleString('en-US', {weekday:'short', day:'numeric',}))
    allData.yValues.push(data[1].toFixed(2))
    //console.log(typeof xValues)
  })

  const xDataSwitch = () => {
    const nChart = document.querySelector('#myChart')
    console.log(nChart.className)
    if(nChart.className==='hour')
    {
      let xHour = allData.xHourValues
      return xHour
    }
    else if(nChart.className==='day')
    {
      let xDay = allData.xValues
      return xDay
    } else {
      let xHour = allData.xHourValues
      return xHour
    }
  }
  


  new Chart('myChart', {
    type: "line",
    data: {
      labels: xDataSwitch(),
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
            ticks: {
              autoSkip: true,
              maxTicksLimit: 20
          },
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



