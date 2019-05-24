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

const zoomImage = document.querySelector(".purchase-zoom-image");
const zoomElement = document.querySelector(".purchase-zoom");

const zoomIn = (zoomImg, zoomDisplay, zoomContainer) => {
    zoomContainer.classList.toggle("purchase-zoom-active");
    zoomDisplay.src = zoomImg.src;
    document.body.classList.add("purchase-lock");
}

const zoomOut = (zoomContainer) => {
    zoomContainer.classList.toggle("purchase-zoom-active");
    document.body.classList.remove("purchase-lock");
}

selectedImage.addEventListener( 'click', evt => {
    zoomIn(selectedImage, zoomImage, zoomElement);
});

zoomElement.addEventListener( 'click', evt => {
    zoomOut(zoomElement);
});