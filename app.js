var url = "http://colormind.io/api/";

var data = {model : "default"}


let divs = document.querySelectorAll(".color")
let colorNames = document.querySelectorAll('h1');
//Creating XMLHttpRequest object
var http = new XMLHttpRequest();


http.onreadystatechange = function() {


	if(http.readyState == 4 && http.status == 200) {

		var palette = JSON.parse(http.responseText).result;
        
        //console.log(palette)
        let toHex = (r,g,b) => {
            return [r,g,b].reduce( (acc,cur) => { 
               let hex = Number(cur).toString(16)
               acc.push( hex.length < 2 ? (hex= '0' + hex) : hex)
               return acc
           
           },[]).join('')
           }
          
      
           
        //let paletteOne = palette[0] //palette[i]
        let hexArray = [];
        let hex;
     palette.forEach( (color) => {
        let hex = toHex(...color)
        hexArray.push( `#${hex}`) 
        
     })
     console.log( hexArray )
  
      
           
     divs.forEach ( (div,i) => {
        let h1 = document.createElement('h1');
        h1.innerText = hexArray[i]
         div.appendChild(h1)
        div.style.backgroundColor = hexArray[i]
     })
    
     
    
       
	}
}


//
          //Method(get or post), the server location, true(ascy),false(scyn)
http.open("POST", url, true);
//send request to the server 
http.send(JSON.stringify(data));




  

  