var imgToTrack = [];

// create array of image & source sets
var imgOptions = [
  new ImgTrx('Bag', 'img/bag.jpg'),
  new ImgTrx('Banana', 'img/banana.jpg'),
  new ImgTrx('Boots', 'img/boots.jpg'),
  new ImgTrx('Chair', 'img/chair.jpg'),
  new ImgTrx('Cthulhu', 'img/cthulhu.jpg'),
  new ImgTrx('Dragon', 'img/dragon.jpg'),
  new ImgTrx('Pen', 'img/pen.jpg'),
  new ImgTrx('Scissors', 'img/scissors.jpg'),
  new ImgTrx('Shark', 'img/shark.jpg'),
  new ImgTrx('Sweep', 'img/sweep.jpg'),
  new ImgTrx('Unicorn', 'img/unicorn.jpg'),
  new ImgTrx('USB', 'img/usb.jpg'),
  new ImgTrx('Water_Can', 'img/water_can.jpg'),
  new ImgTrx('Wine_Glass', 'img/wine_glass.jpg'),
];

function initializeImgToTrack() {
  if (localStorage.getItem('images') == null) {
    imgToTrack.push(new voteTracker('Bag', 'img/bag.jpg'));
    imgToTrack.push(new voteTracker('Banana', 'img/banana.jpg'));
    imgToTrack.push(new voteTracker('Boots', 'img/boots.jpg'));
    imgToTrack.push(new voteTracker('Chair', 'img/chair.jpg'));
    imgToTrack.push(new voteTracker('Cthulhu', 'img/cthulhu.jpg'));
    imgToTrack.push(new voteTracker('Dragon', 'img/dragon.jpg'));
    imgToTrack.push(new voteTracker('Pen', 'img/pen.jpg'));
    imgToTrack.push(new voteTracker('Scissors', 'img/scissors.jpg'));
    imgToTrack.push(new voteTracker('Shark', 'img/shark.jpg'));
    imgToTrack.push(new voteTracker('Sweep', 'img/sweep.jpg'));
    imgToTrack.push(new voteTracker('Unicorn', 'img/unicorn.jpg'));
    imgToTrack.push(new voteTracker('USB', 'img/usb.jpg'));
    imgToTrack.push(new voteTracker('Water_Can', 'img/water_can.jpg'));
    imgToTrack.push(new voteTracker('Wine_Glass', 'img/wine_glass.jpg'));
  }
  else {
    var storedImages = JSON.parse(localStorage.getItem('images'));
    for (var index = 0; index < storedImages.length; index++) {
      var image = storedImages[index];
      var tracker = new VoteTracker(image.name, image.imgSource);
      tracker.upVotes = image.upVotes;
      imgToTrack.push(tracker);
    }
  }
}

function getThreeImages() {
  if (userTotalUpVotes <= 15) { // stop presenting new images to user after 15 votes
    pickedImages = []; // empty this memory array to enable tracking of 3 new images
    var imgContainer = document.getElementById('image-container');
    imgContainer.innerHTML = '';
    for (var imageID = 1; imageID <= 3; imageID++) {
      do { // get random index value for image
        var index = Math.floor(Math.random() * 14);
      }
      while (pickedImages.indexOf(index) >= 0);
      var source = imgOptions[index].imgSource; // pull image source for image
      var imageElement = document.createElement('img'); // create element 'img'
      imageElement.src = source; // update image with new source
      imgContainer.appendChild(imageElement); // append new element 'img' into 'image-container'
      pickedImages.push(index); // add image location to memory array for later use
    }
  }
}

function recordClick(event) {
  var clickedImage = event.target;
  var clickedImageSource = clickedImage.src;
  for (var index = 0; index < imgOptions.length; index++) {
    if (clickedImageSource.indexOf(imgOptions[index].imgSource) >= 0) {
      imgOptions[index].upVotes++; // add 1 up-vote for user-clicked image
      userTotalUpVotes++; // add 1 up-vote for survey user's total cumulative up-votes
      // console.log('userTotalUpVotes: ' + userTotalUpVotes);
      // console.log('clicked item: ' + imgOptions[index].name);
      // console.log('imgOptions[index]: ' + imgOptions[index]);
      userImgUpVotes += imgOptions[index].upVotes; // accumulate user up-votes for each image
      // console.log('userImgUpVotes: ' + imgOptions[index].upVotes);
      localStorage.setItem('images', imgOptions[index].name, userImgUpVotes);
      localStorage.setItem('progress', userTotalUpVotes);
      if (userTotalUpVotes < 15) { // limit user's votes to 15 votes for survey
        document.getElementById('progress').innerHTML = 'You have completed ' + userTotalUpVotes + ' of 15 votes in this survey.'; // provide survey progress message to user, up to 15 votes
      }
      else {
        document.getElementById('progress').innerHTML = 'You have completed 15 of 15 votes in this survey.<br/>The graph below represents your product vote results.'; // provide survey final results message to user
      }
    }
  }
  getThreeImages(); // call function 'getThreeImages' to display 3 images to user

// set condition to present image voting results to user AFTER he/she votes 15 times
if (userTotalUpVotes == 15) {
    for (var i = 0; i < imgOptions.length; i++) {
      var currentImage = imgOptions[i];
      var chart; // initiate global chart variable
      imgPool.push({label: imgOptions[i].name, y: imgOptions[i].upVotes}); // cycle through imgOptions array to push label names and associated upVotes into imgPool array
    }
initializeChart(); // call function 'initializeChart'
chartElementTrans();
}
getThreeImages(); // after each image vote click, call function 'getThreeImages' to display 3 new images to user
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

function progressElementTrans() {
  document.getElementById('progress').setAttribute("class", "progress-transitions");
}

function chartElementTrans() {
  document.getElementById('chart-container').setAttribute("class", "chart-transitions");
}

var imgContainer = document.getElementById("image-container");

imgContainer.addEventListener("click", progressElementTrans);
