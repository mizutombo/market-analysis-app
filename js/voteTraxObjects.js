
var imgToTrax = []; // initialize variable array to track images w/ their sources

var imgUpVotes = 0; // initiate global var 'imgUpVotes' to track total upVotes for each image
var totalUpVotes = 0; // initiate global var 'totalUpVotes' to track cumulative total votes
var imgPool = []; // initiate global var array 'imgPool' for function 'initializeChart'
var pickedImages = []; // this is memory array; tracks images that have been shown to the user

var voteTracker = function (name, source) {
  this.name = name; // image name
  this.imgSource = source; // image source
  this.upVotes = 0;
  this.showVotes = function() {
    console.log(this.name+': '+this.upVotes+' votes');
  }
}
