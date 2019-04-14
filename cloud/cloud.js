// add listener for scrolling effect on whole cloud section
let cloudItems = document.querySelectorAll(".cloud-item");

window.addEventListener("scroll", (event) => {
    cloudItems.forEach((item) => {
        // gets the position of the item within the screen - 0 is when it is around the top
        let position = item.getBoundingClientRect().top + document.documentElement.scrollTop;
        console.log("pos: " + position + " | body: " + document.body.scrollTop);

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