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
let popup = document.querySelector('.copy-popup')
let colorPicker = document.querySelector(".color-picker")
let  favColorInput = document.querySelectorAll("#favcolor")
const submitBtns = document.querySelectorAll("#submit-btn")

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
        let hex = toHex(...color).toUpperCase()
        hexArray.push( `#${hex}`)    
       
     })
    
  
      
          
     divs.forEach ( (div,i) => {
        div.style.backgroundColor = hexArray[i]    
     })

    
     hexcodes.forEach( (code,i) => {
        code.innerHTML = hexArray[i]
     } )

     favColorInput.forEach( (favColor, i) => {
      favColor.value = hexArray[i]
     
     })

     btns.forEach( (btn,i) => {
      btn.addEventListener("click", function(){
        
         navigator.clipboard.writeText(hexcodes[i].innerHTML)
        
        popup.style.display = "block";
        popup.style.bottom = "5rem"

        setTimeout( function(){ popup.style.display = "none"}, 1000 )
        
      })
     })




     hexcodes.forEach((hexcode) => {
      hexcode.addEventListener("click", function () {
        const sibling = hexcode.parentElement.nextElementSibling;
        
        console.log(sibling)
        if(sibling){
         console.log("open")
        }
        if (sibling.style.opacity === "1") {
          sibling.style.opacity = "0";
         
        } else {
          sibling.style.opacity = "1";
        }
      });
    });
    

   
    favColorInput.forEach( (input) => {
      input.addEventListener('input', function(){       
         this.parentElement.parentElement.style.backgroundColor = this.value
         this.parentElement.previousElementSibling.firstElementChild.innerHTML = this.value.toUpperCase()
         
      })
    })

     favColorInput.forEach( (input) => {
      input.nextElementSibling.addEventListener("click", function(){
         this.parentElement.style.opacity = "0"
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

  

  