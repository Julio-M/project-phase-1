

const totalData = async() => {
    let req = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
    let res = await req.json()
    return res
}

const tableBody = document.querySelector('.tableinfo')

totalData().then(data => {
   
    data.forEach(mcapData => {
        let tdName = document.createElement('td')
        let tr = document.createElement('tr')
        let th = document.createElement('th')
        let tdPrice = document.createElement('td')
        let tdDiff = document.createElement('td')
        let tdVol = document.createElement('td')
        let tdMcap = document.createElement('td')
        let img = document.createElement('img')

        th.textContent = mcapData['market_cap_rank']
        tr.id = mcapData.id
        tr.className = 'coin'
        tdName.className = 'chartname'
       
        document.querySelector('.tableinfo').appendChild(tr)
        tdName.textContent = mcapData.name
        img.src = mcapData.image
        img.style.width = '20px'
        img.className = 'coinlogo'
        tdName.appendChild(img)
        tr.append(th, tdName)
        
        tdPrice.textContent = mcapData['current_price']
        let tdUSD = new Intl.NumberFormat('en-US', {
            style:'currency', 
            currency:'USD',
            currencySign: 'accounting'
        }).format(tdPrice.textContent)
        tdPrice.textContent = tdUSD
        tr.appendChild(tdPrice)

        tdDiff.textContent = mcapData['price_change_percentage_24h'] + '%'
        newTdDiff = parseFloat(tdDiff.textContent).toFixed(2)
        tdDiff.textContent = newTdDiff + '%'
        tr.appendChild(tdDiff)
        
        tdVol.textContent = mcapData['total_volume']
        let tdVolume = new Intl.NumberFormat('en-US', {
            style: 'decimal',
        }).format(tdVol.textContent)
        tdVol.textContent = tdVolume
        tr.appendChild(tdVol)
        
        tdMcap.textContent = mcapData['market_cap']
        let tdMkcap = new Intl.NumberFormat('en-US', {
            style: 'decimal',
        }).format(tdMcap.textContent)
        tdMcap.textContent = tdMkcap
        tr.appendChild(tdMcap)
        
    })
    const tableBody = document.querySelectorAll('.coin')
    const tdName = document.querySelector('.chartname')
    tableBody.forEach(coin => {
        console.log(coin)
        coin.addEventListener('click', e => {
            let chartTitle = document.querySelector('.chartTitle')
            const img = document.createElement('img')
            recreateChart() // calling from chart.js
            fetchData(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=0.041&interval=1m`)
            hrButton(coin.id)
            dyButton(coin.id)
            chartTitle.textContent = coin.querySelector('.chartname').textContent
            img.src = coin.querySelector('.coinlogo').src
            img.setAttribute('style', 'margin-left:15px; width:40px')
            chartTitle.appendChild(img)
        })       
    })   
})
