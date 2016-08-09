
var ImgTrx = function (name, source) { // constructor object
  this.name = name;
  this.imgSource = source;
  this.upVotes = 0;
};

var userImgUpVotes = 0; // initiate global var 'userImgUpVotes' to track survey user's total upVotes for each image
var userTotalUpVotes = 0; // initiate global var 'userTotalUpVotes' to track CUMULATIVE total votes for survey user

var imgPool = []; // initiate global var array 'imgPool' for function 'initializeChart'
var pickedImages = []; // this is memory array; tracks images that have been shown to the user

var imgContainer = document.getElementById('image-container'); // global variable
var image1 = document.getElementById('pix1');
var image2 = document.getElementById('pix2');
var image3 = document.getElementById('pix3');
