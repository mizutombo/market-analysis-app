
window.addEventListener('load', getThreeImages);

document.getElementById('image-container').addEventListener('click', recordClick);

imgContainer.addEventListener('click', progressElementTrans);

image1.addEventListener('load', imageElementTrans1);
image2.addEventListener('load', imageElementTrans2);
image3.addEventListener('load', imageElementTrans3);

image1.addEventListener('click', imageElementTrans1);
image2.addEventListener('click', imageElementTrans2);
image3.addEventListener('click', imageElementTrans3);
