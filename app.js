var url = "http://colormind.io/api/";
var data = {
	model : "default"
	//input : [[44,43,44],[90,83,82],"N","N","N"]
}

let divs = document.querySelectorAll(".color")
//console.log(divs)

var http = new XMLHttpRequest();

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		var palette = JSON.parse(http.responseText).result;
        let colorArray = [];
         palette.forEach( color => {
            colorArray.push( `RGB(${color})` )
         })
        console.log(colorArray)
       
        
        divs.forEach ( (div,i) => {
            div.style.backgroundColor = colorArray[i]
     
           
        })

        console.log(palette)
        //console.log( `RGB(${color})`)
        //divs.style.backgroundColor = `RGB(${color})`
     
	}
}



http.open("POST", url, true);
http.send(JSON.stringify(data));


