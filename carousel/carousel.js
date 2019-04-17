// select the images and buttons in the page
const images = Array.from(document.querySelectorAll(".carousel-image"));
const buttons = Array.from(document.querySelectorAll(".carousel-button"));

// function that moves the images
const warp = function(event, position){
    // makes it so the current middle image being clicked moves to the next image
    if(Array.from(event.target.classList).includes("carousel-middle")) position++;
    if(position > images.length - 1) position = 0;

    // adjusts position for the other side images
    let leftPosition = position - 1;
    let rightPosition = position + 1;
    if(leftPosition < 0) leftPosition = images.length - 1;
    if(rightPosition > images.length - 1) rightPosition = 0;
    
    // hides all images
    images.forEach( img => {
        img.classList.add("carousel-hide");
        img.classList.remove("carousel-left", "carousel-middle", "carousel-right");
    });

    // sets position for the select images
    images[position].classList.add("carousel-middle");
    images[position].classList.remove("carousel-hide");
    images[leftPosition].classList.add("carousel-left");
    images[leftPosition].classList.remove("carousel-hide");
    images[rightPosition].classList.add("carousel-right");
    images[rightPosition].classList.remove("carousel-hide");
};

// add the listeners
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", (event) => {
        warp(event, i);
    });
    buttons[i].addEventListener("click", (event) => {
        warp(event, i);
    });
}

// images.forEach( img => img.addEventListener('click', function (event) {
//     let position = img.classList[img.classList.length-1];

//     if (position === "right" || position === "middle") {
//         let imageAux = images.shift();
//         images.push(imageAux);
//     } else if (position === "left") {
//         let imageAux = images.pop();
//         images.unshift(imageAux);
//     }

//     images[0].classList.add("left");
//     images[0].classList.remove("middle", "right", "hide");
//     images[1].classList.add("middle");
//     images[1].classList.remove("left", "right", "hide");
//     images[2].classList.add("right");
//     images[2].classList.remove("left", "middle", "hide");
    

//     for (let i = 3; i < images.length; i++) {
//         images[i].classList.add("hide");
//         images[i].classList.remove("left", "middle", "right");
//     }
// }));