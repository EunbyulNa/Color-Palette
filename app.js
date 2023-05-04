const url = "http://colormind.io/api/";
const data = {
   model: "default",
   input: ["N", "N", "N", "N", "N"]
 };
let http = new XMLHttpRequest();


let divs = document.querySelectorAll('.color')
let hexcodes = document.querySelectorAll('.hexcode')
let options = document.querySelector('.option-list')

let btns = document.querySelectorAll('#copy-btn')
let popup = document.querySelector('.popup')


function generatePalette () {


http.onreadystatechange = function() {


	if(http.readyState == 4 && http.status == 200) {

      var palette = JSON.parse(http.responseText).result;
        
    
         
        let toHex = (r,g,b) => {
            return [r,g,b].reduce( (acc,cur) => { 
               let hex = Number(cur).toString(16)
               acc.push( hex.length < 2 ? (hex= '0' + hex) : hex)
               return acc
           
           },[]).join('')
           }
          
        let hexArray = [];
        
        palette.forEach( (color) => {
        let hex = toHex(...color)
        hexArray.push( `#${hex}`)    
     })
     console.log( hexArray )
  
      
          
     divs.forEach ( (div,i) => {
        div.style.backgroundColor = hexArray[i]    
     })
    
     hexcodes.forEach( (code,i) => {
        code.innerHTML = hexArray[i]
     } )

     btns.forEach( (btn,i) => {
      btn.addEventListener("click", function(){
        
         navigator.clipboard.writeText(hexcodes[i].innerHTML)
        
        popup.style.display = "block";
        popup.style.bottom = "5rem"

        setTimeout( function(){ popup.style.display = "none"}, 1000 )
        
      })
     })

  
         
	}

}

          //Method(get or post), the server location, true(ascy),false(scyn)
          http.open("POST", url, true);
          //send request to the server 
          http.send(JSON.stringify(data));
}


 //
window.addEventListener("keydown", function(e) {
   if(e.code === 'Space'){   
    generatePalette()
   }
   })

generatePalette()

  

  