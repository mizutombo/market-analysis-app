// create constructor object
var imgTrx = function(name, source) {
  this.name = name;
  this.imgSource = source;
  this.upVotes = 0;
};
var imgUpVotes = 0; // initiate global var 'imgUpVotes' to track total upVotes for each image
var totalUpVotes = 0; // initiate global var 'totalUpVotes' to track cumulative total votes
var imgPool = []; // initiate global var array 'imgPool' for function 'initializeChart'

// create array of image & source sets
var imgOptions = [
  new imgTrx('Bag', 'img/bag.jpg'),
  new imgTrx('Banana', 'img/banana.jpg'),
  new imgTrx('Boots', 'img/boots.jpg'),
  new imgTrx('Chair', 'img/chair.jpg'),
  new imgTrx('Cthulhu', 'img/cthulhu.jpg'),
  new imgTrx('Dragon', 'img/dragon.jpg'),
  new imgTrx('Pen', 'img/pen.jpg'),
  new imgTrx('Scissors', 'img/scissors.jpg'),
  new imgTrx('Shark', 'img/shark.jpg'),
  new imgTrx('Sweep', 'img/sweep.jpg'),
  new imgTrx('Unicorn', 'img/unicorn.jpg'),
  new imgTrx('USB', 'img/usb.jpg'),
  new imgTrx('Water_Can', 'img/water_can.jpg'),
  new imgTrx('Wine_Glass', 'img/wine_glass.jpg'),
];

var pickedImages = []; // this is memory array; tracks images that have been shown to the user

document.getElementById('image-container').addEventListener('click', recordClick); // event listener to record clicks on selected images; triggers 'recordClick' function

function getThreeImages() { // function to present 3 images to user for review and voting
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
getThreeImages(); // call function 'getThreeImages'

// image click recorder function; triggered by event listener
function recordClick(event) {
  var clickedImage = event.target;
  console.log(clickedImage);
  var clickedImageSource = clickedImage.src;
  console.log('clicked SRC: ' + clickedImageSource);
  for (var index = 0; index < imgOptions.length; index++) {
    if (clickedImageSource.indexOf(imgOptions[index].imgSource) >= 0) { // method 'indexOf' returns index number of first time a character appears in string;
      imgOptions[index].upVotes++; // add 1 up-vote for user-selected image
      totalUpVotes++; // add 1 up-vote for total cumulative up-votes
      console.log('totalUpVotes: ' + totalUpVotes);
      console.log('clicked item: ' + imgOptions[index].name);
      console.log('imgOptions[index]: ' + imgOptions[index]);
      imgUpVotes += imgOptions[index].upVotes;
      console.log('imgUpVotes: ' + imgOptions[index].upVotes);
      document.getElementById('progress').innerHTML = 'You have completed ' + totalUpVotes + ' of 15 votes in this survey.'; // Provide survey progress message to user
    }
  }

// set condition to present image voting results to user AFTER he/she votes 15 times
if (totalUpVotes == 15) {
    for (var i = 0; i < imgOptions.length; i++) {
      var currentImage = imgOptions[i];
      var chart; // initiate global chart variable
      imgPool.push({label: imgOptions[i].name, y: imgOptions[i].upVotes}); // cycle through imgOptions array to push label names and associated upVotes into imgPool array
    }
initializeChart(); // call function 'initializeChart'
}
getThreeImages(); // after each image vote click, call function 'getThreeImages'
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
