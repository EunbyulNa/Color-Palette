let divs = document.querySelectorAll('.color');
let hexCodes = document.querySelectorAll('.hexcode');
const copyBtns = document.querySelectorAll('#copy-btn');
const copyPopup = document.querySelector('.copy-popup');
const colorPicker = document.querySelectorAll('.color-picker');
let colorPickerInput = document.querySelectorAll('#favcolor')
const colorPickerBtn = document.querySelectorAll('#submit-btn')
const likeBtn = document.querySelectorAll('#like-btn')
const savePopup = document.querySelector('.save-popup')
const inputColorName = document.querySelector('.input-color-name')
const inputColorPreview = document.querySelector('.input-color-preview')
const modalClose = document.querySelector("#modal-close")
const saveBtn = document.querySelector('#save-btn')
const sideBar = document.querySelector('.sidebar')
const sideBarClose = document.querySelector('#sidebar-close')


async function fetchAPI(){
  let baseURL = `https://x-colors.yurace.pro/api/random?number=5`;
  let response = await fetch(baseURL);
  let data = await response.json();
  console.log(data)
  generatedHTML(data);
  copyColor()
  showColorPicker()
  favColorInput()
  favColorSave()
  saveDisplay()
 
}

fetchAPI()


function generatedHTML(data){
  
  const colors = data.map((color) => color.hex)
  console.log(colors)

  //Generate div background color
  divs.forEach( (div,i) => {
    div.style.backgroundColor = colors[i]
  })
  
  //Generate h1 
  hexCodes.forEach( (hexcode, i) => {
    hexcode.innerHTML= colors[i]
  })

  //Generate color input 
  colorPickerInput.forEach( (input,i) => {
    input.value = colors[i]
  })
 
}


function copyColor(){
  copyBtns.forEach( (btn,i) => {
    btn.addEventListener("click", function(){
      navigator.clipboard.writeText(hexCodes[i].innerHTML)
        
      copyPopup.style.display = "block";
      copyPopup.style.bottom = "5rem"

      setTimeout( function(){ copyPopup.style.display = "none"}, 1000 )
    })
  }) 
}


function showColorPicker(){
  hexCodes.forEach( (hexCode,i) => {
    hexCode.addEventListener("click", function(){
      const windowSize = window.innerWidth;

      if(windowSize > 768 && colorPicker[i].style.display === 'none'){
        colorPicker[i].style.display = 'block'  
      }else{
        colorPicker[i].style.display = 'none'  
      }
     
  })
})
  
}


function favColorInput(){
  colorPickerInput.forEach( (input,i) => {
    
    input.addEventListener('input', function(){
      divs[i].style.backgroundColor = this.value
      hexCodes[i].innerHTML = this.value.toUpperCase()
    })
  })
}

function favColorSave(){
  colorPickerBtn.forEach( (btn,i) => {
    btn.addEventListener("click", function(){
      colorPicker[i].style.display = 'none'
    })
  })
}


function saveDisplay(){
  likeBtn.forEach((btn,i)=> {
    btn.addEventListener("click", function(){
      savePopup.style.display = 'block' 
      inputColorName.placeholder = hexCodes[i].innerHTML
      inputColorPreview.style.backgroundColor = hexCodes[i].innerHTML
      modalClose.addEventListener("click", function(){
        savePopup.style.display = 'none'
      })
    })
  })
}

saveBtn.addEventListener("click", function(){
  sideBar.style.width = '200px'
 })

 sideBarClose.addEventListener("click", function(){
  sideBar.style.width = '0'
 })


