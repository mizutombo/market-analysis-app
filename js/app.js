
  // create constructor object
  var imgTrx = function(name, source) {
    this.imgSource = source;
    this.upVotes = 0;
    this.name = name;
  };
  var totalUpVotes = 0; // initiate var 'totalUpVotes' to track total upVotes
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
  document.getElementById('image-container').addEventListener('click', recordClick); // event listener to record clicks on selected images; triggers recordClick function
  function getThreeImages() { // function to present 3 images to user for review and voting
    pickedImages = []; // empty this memory array so that we can track 3 new images
    for (var imageID = 1; imageID <= 3; imageID++) {
      do { // gets a random index value for our image
        var index = Math.floor(Math.random() * 14); // random number engine
      }
      while (pickedImages.indexOf(index) >= 0); // method 'indexOf' returns index number of first time a character appears in string; keep cycling through random number engine until set of 3 unique images can be presented to user
      var source = imgOptions[index].imgSource; // pull img source for image
      document.getElementById('pix'+imageID).src = source; // update image presentation box with new image source to display image
      pickedImages.push(index); // add image location to memory array for later usage
    }
  };

  function recordClick(event) { // image clicks recorder function; triggered by event listener
    var clickedImage = event.target;
    console.log(clickedImage);
    var clickedImageSource = clickedImage.src;
    console.log('clicked SRC: '+clickedImageSource);
    for (var index = 0; index < imgOptions.length; index++) {
      if (clickedImageSource.indexOf(imgOptions[index].imgSource) >= 0) { // method 'indexOf' returns index number of first time a character appears in string;
        imgOptions[index].upVotes++; // log up-vote for user-selected image
        console.log('clicked item: '+imgOptions[index].name);
        console.log(imgOptions[index]);
        totalUpVotes += imgOptions[index].upVotes;
        console.log(totalUpVotes);
        document.getElementById('progress').innerHTML = 'You have completed '+totalUpVotes+' of 15 votes in this survey.' // Provide survey progress message to user
      }
    }
  };
  // do {
    getThreeImages(); // call function to randomly render 3 unique images into presentation box for user to view for selection and voting
  // }
    // while (totalUpVotes <= 15) // *** CREATES FATAL LOOP !!!

    // dynamically build table with product images and total up-votes
    var table = document.getElementById('product-votes');
    for (var index = 0; index < imgOptions.length; index++) {
      // establish variable to enable run through full array of images
      var currentImage = imgOptions[index];
      var upVotes = 0;
      var imageRow = document.createElement('tr');
      var imageNameCell = document.createElement('td');
      imageNameCell.innerText = currentImage.name;
      imageRow.appendChild(imageNameCell);
      // create row data cell for total up-votes for product image
      var totalUpVotesCell = document.createElement('td');
      totalUpVotesCell.innerText = currentImage.upVotes;
      console.log(totalUpVotesCell.innerText);
      imageRow.appendChild(totalUpVotesCell);
      // append new row onto table
      table.appendChild(imageRow);
    };
