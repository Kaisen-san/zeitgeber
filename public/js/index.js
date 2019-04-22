// const images = Array.from( document.querySelectorAll('.carrosel div img') );

// images.forEach( ( img, idx, arr ) => img.addEventListener( 'click', ( evt ) => {
//   arr.forEach( i => i.classList.remove( 'left', 'middle', 'right', 'hide' ) );

//   let leftIdx = idx - 1;
//   let rightIdx = idx + 1;

//   if ( leftIdx === -1 ) {
//     leftIdx = arr.length - 1;
//   }

//   if ( rightIdx === arr.length ) {
//     rightIdx = 0;
//   }

//   img.classList.add('middle');
//   arr[ leftIdx ].classList.add('left');
//   arr[ rightIdx ].classList.add('right');
//   arr.forEach( ( e, i ) => {
//     if ( i !== idx && i !== leftIdx && i !== rightIdx ) {
//       arr[ i ].classList.add('hide');
//     }
//   });
// }));

// select the images and buttons in the page
const images = Array.from(document.querySelectorAll(".carousel-image"));
const buttons = Array.from(document.querySelectorAll(".carousel-button"));

// function that moves the images
const warp = function(position){
    // makes it so the current middle image being clicked moves to the next image
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

    highlight(position);
};

// highlight the button for the current image on the carousel
const highlight = function(position){
    buttons.forEach(btn => {
        btn.style = "background-color: var(--light-theme);"
    });
    buttons[position].style = "background-color: var(--secondary-clr);"
}

// highlight the default image
highlight(1);

// add the listeners
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("click", (event) => {
        if(Array.from(event.target.classList).includes("carousel-middle")) warp(i+1);
        else warp(i);
    });
    buttons[i].addEventListener("click", (event) => {
        warp(i);
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


// add listener for scrolling effect on whole cloud section
let cloudItems = document.querySelectorAll(".cloud-item");

window.addEventListener("scroll", (event) => {
    cloudItems.forEach((item) => {
        // gets the position of the item within the screen - 0 is when it is around the top
        let position = item.getBoundingClientRect().top;// + document.documentElement.scrollTop;
        // console.log("pos: " + position + " | body: " + document.body.scrollTop);

        // add/remove the scroll effect class for the fade in effect
        if(position < 800) item.classList.remove("cloud-scroll-effect");
        else item.classList.add("cloud-scroll-effect");
    });
});

// button click effect
let cloudButtons = document.querySelectorAll(".cloud-button");

cloudButtons.forEach((button) => {
    button.addEventListener("mousedown", (event) => {
        button.id = "cloud-button-clicked";
    });
    button.addEventListener("mouseup", (event) => {
        button.id = "";
    });
});
