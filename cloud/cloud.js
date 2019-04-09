let cloudItems = document.querySelectorAll(".cloud-item");

window.addEventListener("scroll", (event) => {
    cloudItems.forEach((item) => {
        // gets the position of the item within the screen - 0 is when it is around the top
        let position = item.getBoundingClientRect().top;
        // console.log("pos: " + position + " | body: " + document.body.scrollTop);

        // add/remove the scroll effect class for the fade in effect
        if(position < 800) item.classList.remove("scroll-effect");
        else item.classList.add("scroll-effect");
    })
});