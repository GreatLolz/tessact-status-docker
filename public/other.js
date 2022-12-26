const images = document.querySelector('#images');
const loading = document.querySelector('.loading-screen');

const imagesResponse = await fetch('/images');
if (!imagesResponse.ok) {
    throw new Error('Couldn\'t fetch server images!');
}
var imageData = await imagesResponse.json();

images.src = imageData;

var randomDelay = Math.random() * 3;
loading.style.animationDelay = `${randomDelay + 1}s`;