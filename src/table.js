

const totalData = async() => {
    let req = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false')
    let res = await req.json()
    return res
}

const charTitle = document.querySelector('.chartTitle')
const logo = document.querySelector('.logo')

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
        let button = document.createElement('i')

        button.id=mcapData.id
        button.className=('fa-regular fa-gem myBtn add')
        button.addEventListener('click', e => {
            button.className = ('fa-solid fa-gem myBtn add')
        })

        th.scope='row'
        th.id='myBtnCol'
        th.appendChild(button)

        
        tr.id = mcapData.id
        tr.className ='coin'
        tdName.className='chartname'
        tdPrice.className='price'
        tdDiff.className='percentdiff'
       
        document.querySelector('.maintableinfo').appendChild(tr)
        tdName.textContent = mcapData.name
        img.src = mcapData.image
        img.className='coinlogo'
        img.style.width = '20px'
        tdName.appendChild(img)
        tr.append(th,tdName)
        
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
    //LINK BUTTON START
    const btnBody = document.querySelectorAll('.myBtn')
    console.log(btnBody)
    btnBody.forEach((btn)=>{
        console.log(btn)
        btn.addEventListener('click', (e)=>{
            e.preventDefault()
            data.forEach(btnData => {
                
                if (btn.id === btnData.id){
                    sendData(btnData.id,btnData.symbol,btnData.name,btnData.image,btnData['current_price'],btnData['price_change_percentage_24h'])

                } 
            })
            // const thisBtn = document.querySelectorAll('.delete')
            // thisBtn.forEach((dlt)=>{
            //     dlt.className==='delete'?dlt.className = ('fa-solid fa-gem'):dlt.className = ('fa-regular fa-gem')
            // })
        })
    })
    //LINK BUTTON END

    //CLICK BUTTON AND BECOMES SOLID START

    // btnBody.forEach(btn => {
    //     btn.addEventListener('click', e => {
    //         btn.className = "fa-solid fa-gem"
    //     })
    // })
    //CLICK BUTTON AND BECOMES SOLID END

    //Link table to Chart START//
    const tableBody = document.querySelectorAll('.coin')
    tableBody.forEach((coin)=>{
       coin.addEventListener('click',(e)=>
       {    
            recreateChart()
            //console.log('Initial',coin.id)
            let urlTarget = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=0.041&interval=1m`
            fetchData(urlTarget)
            hourData(coin.id)
            dayData(coin.id)
            //console.log('After day',coin.id)
            charTitle.textContent= coin.querySelector('.chartname').textContent
            const logo  = document.createElement('img')
            logo.className = 'logo'
            //console.log(coin.querySelector('.coinlogo').src)
            logo.src = coin.querySelector('.coinlogo').src
            //console.log(logo)
            charTitle.append(logo)
        })
        // clickFav(coin)

    })
     //Link table to Chart END//
})
