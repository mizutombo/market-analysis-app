
// set up event listeners to have page loads trigger functions
// window.addEventListener('load', initializeImgToTrack);
window.addEventListener('load', getThreeImages);

document.getElementById('image-container').addEventListener('click', recordClick);
