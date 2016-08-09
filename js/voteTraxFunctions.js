
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

function getThreeImages() { // function to present 3 images to user for review and voting
  if (userTotalUpVotes <= 15) { // stop presenting new images to user after 15 votes
  pickedImages = []; // empty this memory array to enable tracking of 3 new images
  for (var imageID = 1; imageID <= 3; imageID++) {
    do { // gets a random index value for our image
      var index = Math.floor(Math.random() * 14); // random number engine
    }
    while (pickedImages.indexOf(index) >= 0); // method 'indexOf' returns index number of first time a character appears in string; keep cycling through random number engine until set of 3 unique images can be presented to user
    var source = imgOptions[index].imgSource; // pull img source for image
    document.getElementById('pix' + imageID).src = source; // update image presentation box with new image source to display image
    pickedImages.push(index); // add image location to memory array for later usage
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
      console.log('userTotalUpVotes: ' + userTotalUpVotes);
      console.log('clicked item: ' + imgOptions[index].name);
      console.log('imgOptions[index]: ' + imgOptions[index]);
      userImgUpVotes += imgOptions[index].upVotes; // accumulate user up-votes for each image
      console.log('userImgUpVotes: ' + imgOptions[index].upVotes);

      localStorage.setItem('image-name', imgOptions[index].name);
      localStorage.setItem('image-votes', imgOptions[index].upVotes);
      localStorage.setItem('progress-tally', userTotalUpVotes);

      if (userTotalUpVotes < 15) { // limit user's votes to 15 votes for survey
        document.getElementById('progress').innerHTML = 'You have completed ' + localStorage.getItem('progress-tally') + ' of 15 votes in this survey.'; // provide survey progress message to user, up to 15 votes
      }
      else {
        document.getElementById('progress').innerHTML = 'You have completed 15 of 15 votes in this survey.<br/>The graph below represents your product vote results.'; // provide survey final results message to user
      }
    }
  }
  getThreeImages(); // call function 'getThreeImages' to display 3 images to user

// set condition to present image voting results chart to user AFTER he/she votes 15 times
if (userTotalUpVotes == 15) {
    for (var i = 0; i < imgOptions.length; i++) {
      var currentImage = imgOptions[i];
      var chart; // initiate global chart variable
      imgPool.push({label: imgOptions[i].name, y: imgOptions[i].upVotes}); // cycle through imgOptions array to push label names and associated upVotes into imgPool array
    }
initializeChart(); // call function 'initializeChart'
chartElementTrans(); // triggers function 'chartElementTrans' to fade in chart when user reaches 15 votes
}
getThreeImages(); // if total cumulative votes is less than 15 votes, then after each image vote click, call function 'getThreeImages' to display 3 new images to user
} // end of 'recordClick' function

function initializeChart() { // object constructor to build chart
  var chartProperties = {
    title: {
      text: 'Customer Preferences for BusMall Products'
    },
    data: [{
      type: 'column', // select type of chart to render
      dataPoints: imgPool
    }]
  };
  chart = new CanvasJS.Chart('chart-container', chartProperties);
  chart.render(); // draws chart
}

function progressElementTrans() { // function to fade in progress report message box
  document.getElementById('progress').setAttribute('class', 'progress-transitions');
}
function imageElementTrans1() {
  document.getElementById('pix1').setAttribute('class', 'image-transitions1');
}
function imageElementTrans2() {
  document.getElementById('pix2').setAttribute('class', 'image-transitions2');
}
function imageElementTrans3() {
  document.getElementById('pix3').setAttribute('class', 'image-transitions3');
}
function chartElementTrans() { // function to fade in chart
  document.getElementById('chart-container').setAttribute('class', 'chart-transitions');
}
