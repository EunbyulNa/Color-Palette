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
let likeBtns = document.querySelectorAll("#like-btn")
let popup = document.querySelector('.copy-popup')
let savePopup = document.querySelector('.save-popup')
const saveBtn = document.querySelector('#save-btn')
const sideBarClose = document.querySelector('#sidebar-close')
const sideBar = document.querySelector('.sidebar')
const likeUl = document.querySelector('.like-ul')
let modalClose = document.querySelector("#modal-close")
const modalBtn = document.querySelector(".modal-submit")

let userColorName = document.querySelector(".color-save-input")
let inputColorName = document.querySelector('.input-color-name')
let inputColorPreview = document.querySelector('.input-color-preview')
let colorPicker = document.querySelector(".color-picker")
let  favColorInput = document.querySelectorAll("#favcolor")
const submitBtns = document.querySelectorAll("#submit-btn")


let itemsObject = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : {}


console.log(itemsObject)

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

    //copy 
     btns.forEach( (btn,i) => {
      btn.addEventListener("click", function(){
        
         navigator.clipboard.writeText(hexcodes[i].innerHTML)
        
        popup.style.display = "block";
        popup.style.bottom = "5rem"

        setTimeout( function(){ popup.style.display = "none"}, 1000 )
        
      })
     })

   //like 
     likeBtns.forEach( (btn,i) => {
      btn.addEventListener("click", function(){
        
         savePopup.style.display="block"  
         inputColorName.placeholder = hexcodes[i].innerHTML
         inputColorPreview.style.backgroundColor = hexcodes[i].innerHTML
         modalClose.addEventListener("click", function(){
            savePopup.style.display = "none"
            
            
         })
         
        
         

       



      })
     })

    
 

     hexcodes.forEach((hexcode) => {
      hexcode.addEventListener("click", function () {
        const sibling = this.parentElement.nextElementSibling;
        const windowSize = window.innerWidth;
       
         
        if (windowSize > 768 && sibling.style.display=== "none") {
         sibling.style.display = "block";
         
        } else {
          sibling.style.display = "none";
        
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
      this.parentElement.style.display= "none"
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



modalBtn.addEventListener("click", function(e){
   e.preventDefault()
   createList(inputColorName) //input pass 
  
 })


function createList() {
   if (!Array.isArray(itemsObject.name)) {
     itemsObject.name = [];
     itemsObject.color = [];
   }
   itemsObject.name.push(userColorName.value);
   itemsObject.color.push(inputColorPreview.style.backgroundColor);
 
   localStorage.setItem("items", JSON.stringify(itemsObject));
   location.reload();
 }
 


  saveBtn.addEventListener("click", function(){
   sideBar.style.width = '200px'
  })

  sideBarClose.addEventListener("click", function(){
   sideBar.style.width = '0'
  })


  //displayList()







 
   