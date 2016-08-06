
// set up event listeners to have page loads trigger functions
window.addEventListener('load', initializeImgToTrax);
window.addEventListener('load', showImgs);

document.getElementById('image-container').addEventListener('click', recordClick);
