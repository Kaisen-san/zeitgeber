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