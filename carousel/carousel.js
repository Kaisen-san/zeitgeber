// let imgs = document.querySelectorAll(".carousel-image");

// imgs.forEach( img => img.addEventListener('click', event => {

// }));
// img.addEventListener('click', event => {
//     img.classList.add("rotate");
// });

let left = document.querySelector(".left");
let middle = document.querySelector(".middle");
let right = document.querySelector(".right");

let images = Array.from(document.querySelectorAll(".carousel-image"));

images.forEach( img => img.addEventListener('click', function (event) {
    let position = img.classList[img.classList.length-1];
    console.log(position);

    if (position === "right") {
        let imageAux = images.shift();
        images.push(imageAux);
    } else if (position === "left") {
        let imageAux = images.pop();
        images.unshift(imageAux);
    }

    images[0].classList.add("left");
    images[0].classList.remove("middle", "right", "hide");
    images[1].classList.add("middle");
    images[1].classList.remove("left", "right", "hide");
    images[2].classList.add("right");
    images[2].classList.remove("left", "middle", "hide");
    

    for (let i = 3; i < images.length; i++) {
        images[i].classList.add("hide");
        images[i].classList.remove("left", "middle", "right");
    }
}));