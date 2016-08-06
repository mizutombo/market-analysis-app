
function initializeImgToTrax() {
  if (localStorage.getItem('images') == null) {
    imgToTrax.push(new voteTracker('Bag', 'img/bag.jpg'));
    imgToTrax.push(new voteTracker('Banana', 'img/banana.jpg'));
    imgToTrax.push(new voteTracker('Boots', 'img/boots.jpg'));
    imgToTrax.push(new voteTracker('Chair', 'img/chair.jpg'));
    imgToTrax.push(new voteTracker('Cthulhu', 'img/cthulhu.jpg'));
    imgToTrax.push(new voteTracker('Dragon', 'img/dragon.jpg'));
    imgToTrax.push(new voteTracker('Pen', 'img/pen.jpg'));
    imgToTrax.push(new voteTracker('Scissors', 'img/scissors.jpg'));
    imgToTrax.push(new voteTracker('Shark', 'img/shark.jpg'));
    imgToTrax.push(new voteTracker('Sweep', 'img/sweep.jpg'));
    imgToTrax.push(new voteTracker('Unicorn', 'img/unicorn.jpg'));
    imgToTrax.push(new voteTracker('USB', 'img/usb.jpg'));
    imgToTrax.push(new voteTracker('Water_Can', 'img/water_can.jpg'));
    imgToTrax.push(new voteTracker('Wine_Glass', 'img/wine_glass.jpg'));
    // localStorage.setItem('images', image.name, image.imgSource);
  }
  else {
    var storedImages = JSON.parse(localStorage.getItem('images'));
    for (var index = 0; index < storedImages.length; index++) {
      var image = storedImages[index];
      var tracker = new imageTracker(image.name, image.imgSource);
      tracker.upVotes = image.upVotes;
      imgToTrax.push(tracker);
    }
  }
}

function showImgs() {
  pickedImages = []; // empty this memory array to enable tracking of 3 new images
  var imgContainer = document.getElementById('image-container');
  imgContainer.innerHTML = '';
  for (var imageID = 1; imageID <= 3; imageID++) {
    do { // get random index value for image
      var index = Math.floor(Math.random() * 14);
    }
    while (pickedImages.indexOf(index) >= 0);
    var source = imgToTrax[index].imgSource; // pull image source for image
    var imageElement = document.createElement('img'); // create element 'img'
    imageElement.src = source; // update image with new source
    imgContainer.appendChild(imageElement); // append new element 'img' into 'image-container'
    pickedImages.push(index); // add image location to memory array for later use
  }
}

function recordClick(event) {
  var clickedImage = event.target;
  var clickedImageSource = clickedImage.src;
  for (var index = 0; index < imgToTrax.length; index++); {
    if (clickedImageSource.indexOf(imgToTrax[index].imgSource) >= 0); {
      imgToTrax[index].upVotes++;
      totalUpVotes++; // add 1 up-vote for total cumulative up-votes
      console.log('totalUpVotes: ' + totalUpVotes);
      console.log('clicked item: ' + imgToTrax[index].name);
      console.log('imgToTrax[index]: ' + imgToTrax[index]);
      imgUpVotes += imgToTrax[index].upVotes;
      console.log('imgUpVotes: ' + imgToTrax[index].upVotes);
      localStorage.setItem('images', imgToTrax[index].name, imgUpVotes);
      localStorage.setItem('progress', totalUpVotes);
      document.getElementById('progress').innerHTML = 'You have completed ' + totalUpVotes + ' of 15 votes in this survey.'; // Provide survey progress message to user
    }
  }
  showImgs(); // call function 'showImgs'

// set condition to present image voting results to user AFTER he/she votes 15 times
if (totalUpVotes == 15) {
    for (var i = 0; i < imgOptions.length; i++) {
      var currentImage = imgOptions[i];
      var chart; // initiate global chart variable
      imgPool.push({label: imgOptions[i].name, y: imgOptions[i].upVotes}); // cycle through imgOptions array to push label names and associated upVotes into imgPool array
    }
initializeChart(); // call function 'initializeChart'
}
showImgs(); // after each image vote click, call function 'showImgs'
} // end of recordClick function

function initializeChart() { // object constructor to build chart
  var chartProperties = {
    title: {
      text: "Customer Preferences for BusMall Products"
    },
    data: [{
      type: "column", // select type of chart to render
      dataPoints: imgPool
    }]
  };
  chart = new CanvasJS.Chart("chart-container", chartProperties);
  chart.render(); // draws chart
}
