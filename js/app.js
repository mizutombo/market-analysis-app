
  var totalClicks = 0;
  var source = 0;
  var name = 0;

  var imgTrx = function() {
    this.imageSource = source;
    this.upVotes = 0;
    this.name = name;
  }
  var imageOptions = [
    new imgTrx('Bag', 'img/bag.jpg'),
    new imgTrx('Banana', 'img/banana.jpg'),
    new imgTrx('Boots', 'img/boots.jpg'),
    new imgTrx('Chair', 'img/chair.jpg'),
    new imgTrx('Cthulu', 'img/cthulu.jpg'),
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
    var pickedImages = []; // this is engine memory - tracks images that have been shown
    document.getElementById('pix1').addEventListener('click', recordClick);
    document.getElementById('pix2').addEventListener('click', recordClick);
    document.getElementById('pix3').addEventListener('click', recordClick);
    function getThreeImages() {
      pickedImages = []; // empty this so that we can track 3 new images
      for (var imageID = 1; imageID <= 3; imageID++) {
        do { // gets a random index value for our image
          var index = Math.floor(Math.random() * 14);
        } while (pickedImages.indexOf(index) >= 0); // keep trying until unique
        var source = imageOptions[index].imageSource; // get source for image
        document.getElementById('pix'+imageID).src = source; // update image with new source
        pickedImages.push(index); // add image location to engine memory for later usage
      }
    }
  function recordClick(event) {
    var clickedImage = event.target;
    console.log(clickedImage);
    var clickedImageSource = clickedImage.src;
    console.log('clicked SRC: '+clickedImageSource);
    for (var index = 0; index < imageOptions.length; index++) {
      if (imageOptions[index].imageSource == clickedImageSource) {
        imgTrx[index].upVotes++;
        console.log('clicked item: '+imageOptions[index].name);
      }
    }
  }
