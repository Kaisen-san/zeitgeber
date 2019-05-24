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