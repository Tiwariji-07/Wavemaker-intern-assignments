var loader = document.getElementById('loader');
var body = document.getElementsByClassName('container')[0];

function loading(){
    loader.style.display = "block";
    body.style.display = "none"
}

function loaded(){
    loader.style.display = "none";
    body.style.display = "block"
}