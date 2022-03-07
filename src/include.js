// const includeHtml = () =>{
//   const tags = document.querySelectorAll("div")
//   const one = tags.forEach(tag=>{
//     file = tag.getAttribute("w3-include-html");
//     if (file){
//       console.log("it exists")
//       const xhttp = new XMLHttpRequest()
//       xhttp.onreadystatechange = function() {
//         if (this.readyState == 4) {
//           if (this.status == 200) {tag.innerHTML = this.responseText;}
//           if (this.status == 404) {tag.innerHTML = "Page not found.";}
//           /* Remove the attribute, and call this function once more: */
//           tag.removeAttribute("w3-include-html");
//           includeHtml();
//         }
//     }
//     xhttp.open("GET", file, true);
//     xhttp.send();
//     /*exit the function:*/
//     return;
//   }
// }
// )
//   console.log(one)
// }
// includeHtml()

// xhr.open(method='GET', navFile, true);
// xhr.onreadystatechange = function () {
//   // In local files, status is 0 upon success in Mozilla Firefox
//   if(xhr.readyState === XMLHttpRequest.DONE) {
//     var status = xhr.status;
//     if (status === 0 || (status >= 200 && status < 400)) {
//       // The request has been completed successfully
//       console.log(xhr.responseText);
//     } else {
//       // Oh no! There has been an error with the request!
//     }
//   }
// };
// xhr.send();

//Navbar
const nav = document.querySelector('#topbar')
const navFile = nav.getAttribute('include-nav')

//Fetured
const feat = document.querySelector('#featured')
const featFile = feat.getAttribute('include-featured')

//Chart
// const chart = document.querySelector('#chart')
// const chartFile = chart.getAttribute('include-chart')
// console.log(chartFile)


const includeHtml = (select,attr) => {
  if(attr){
    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', attr, true)
    xhttp.onreadystatechange = (e)=>{
      if(xhttp.readyState === XMLHttpRequest.DONE) {
        var status = xhttp.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          // The request has been completed successfully
          select.innerHTML = xhttp.responseText
          //           includeHtml();
        } else {
          console.log("It didn't work")
        }
      }
    }
    xhttp.send()
  }
}

includeHtml(nav,navFile)

includeHtml(feat,featFile)


