const images = document.querySelector('#images');
const loading = document.querySelector('.loading-screen');

const imagesResponse = await fetch('/images');
if (!imagesResponse.ok) {
    throw new Error('Couldn\'t fetch server images!');
}
var imageData = await imagesResponse.json();

var randomImg = Math.floor(Math.random() * imageData) + 1;
images.src = `./img/pozdrawiam/${randomImg}.png`;

var randomDelay = Math.random() * 3;
loading.style.animationDelay = `${randomDelay + 1}s`;