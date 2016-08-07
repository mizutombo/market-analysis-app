
var imgToTrack = []; // initialize variable array to track images w/ their sources

var ImgTrx = function (name, source) { // constructor object
  this.name = name;
  this.imgSource = source;
  this.upVotes = 0;
};

var userImgUpVotes = 0; // initiate global var 'userImgUpVotes' to track survey user's total upVotes for each image
var userTotalUpVotes = 0; // initiate global var 'userTotalUpVotes' to track CUMULATIVE total votes for survey user
var mktgImgTotalUpvotes = 0; // initiate global var 'mktgImgTotalUpvotes' to track CUMULATIVE total survey votes for each image
var imgPool = []; // initiate global var array 'imgPool' for function 'initializeChart'
var pickedImages = []; // this is memory array; tracks images that have been shown to the user

var VoteTracker = function (name, source) { // constructor object
  this.name = name; // image name
  this.imgSource = source; // image source
  this.upVotes = 0;
  this.showVotes = function() {
    console.log(this.name+': '+this.upVotes+' votes');
  }
}
