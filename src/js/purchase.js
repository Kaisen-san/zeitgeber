// Change currently selected image
const allImages = Array.from( document.getElementsByClassName("purchase-image-unselected") );
const selectedImage = document.querySelector(".purchase-image-display");

const changeImage = (imageList, imageDisplay, imageIcon) => {
    imageList.forEach(e => e.classList.remove('purchase-image-selected'));
    imageIcon.classList.add("purchase-image-selected");
    imageDisplay.src = imageIcon.src;
}

allImages.forEach(e => e.addEventListener( 'click', evt => {
    changeImage(allImages, selectedImage, e);
}));

// Zoom when clicking selected image
const zoomImage = document.querySelector(".purchase-zoom-image");
const zoomElement = document.querySelector(".purchase-zoom");

const toggleOverlay = (overlayContainer) => {
    overlayContainer.classList.toggle("purchase-overlay");
    document.body.classList.toggle("purchase-lock");
}

selectedImage.addEventListener( 'click', evt => {
    toggleOverlay(zoomElement);
    zoomImage.src = selectedImage.src;
});

zoomElement.addEventListener( 'click', evt => {
    toggleOverlay(zoomElement);
});

// Open up overlay to continue purchase (sending email)
const buyButton = document.querySelector(".purchase-send");
const buyElement = document.querySelector(".purchase-buy");
const buyOverlayHide = document.querySelector(".purchase-cancel");

buyButton.addEventListener( 'click', evt => {
    toggleOverlay(buyElement);
});

buyOverlayHide.addEventListener( 'click', evt => {
    toggleOverlay(buyElement);
});

// Dragging the image slider
const imagesElement = document.querySelector(".purchase-image-list");
const imageSlider = document.querySelector(".purchase-slider");
let isDown = false;
let offsetX = 0;
let currentPosition = 0;
let initialPosition = allImages[0].getBoundingClientRect().left;

const slideStart = (evt) => {
    isDown = true;
    // determines an offset comparing current position and where the user clicked
    offsetX = evt.clientX - currentPosition;
}

// this requires a bit clearer code
const slideEnd = () => {
    isDown = false;
    // how to do this without jQuery?
    let imageWidth = $(allImages[0]).outerWidth(true);
    // current X position of first image
    let currFirstPos = allImages[0].getBoundingClientRect().left;
    // which image to snap to
    let snapPosition = (currFirstPos > initialPosition) ?
        0 : Math.floor((currFirstPos - initialPosition) / imageWidth);
    // set current position to where it'll snap to
    if (allImages.length < 5)
        currentPosition = 0;
    else if (-snapPosition > allImages.length - 5)
        currentPosition = -(allImages.length - 5) * imageWidth;
    else
        currentPosition = snapPosition * imageWidth;

    imageSlider.style.transform = "translateX(" + currentPosition + "px)";
}

const slideMove = (evt) => {
    if (isDown) {
        imageSlider.style.transform = "translateX(" + (evt.clientX - offsetX) + "px)";
        currentPosition = evt.clientX - offsetX;
    }
}

imagesElement.addEventListener( 'mousedown', evt => {
    isDown = true;
    // determines an offset comparing current position and where the user clicked
    offsetX = evt.clientX - currentPosition;
});

imagesElement.addEventListener( 'mouseup', evt => {
    slideEnd();
});

imagesElement.addEventListener( 'mousemove', evt => {
    if (isDown) {
        imageSlider.style.transform = "translateX(" + (evt.clientX - offsetX) + "px)";
        currentPosition = evt.clientX - offsetX;
    }
});

// optimize mobile handling -> slow as hell for some reason
// also glitches out when tapping once after you slide it to the left?

imagesElement.addEventListener( 'touchstart', evt => {
    isDown = true;
    // determines an offset comparing current position and where the user clicked
    console.log(evt.touches[0].clientX);    
    offsetX = evt.touches[0].clientX - currentPosition;
});

imagesElement.addEventListener( 'touchend', evt => {
    slideEnd();
});

imagesElement.addEventListener( 'touchmove', evt => {
    if (isDown) {
        imageSlider.style.transform = "translateX(" + (evt.changedTouches[0].clientX - offsetX) + "px)";
        currentPosition = evt.changedTouches[0].clientX - offsetX;
    }
});