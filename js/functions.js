function clickForm() {
    if (document.getElementById("emailform").style.display == "block") {
        document.getElementById("emailform").style.display = "none";
    }
    else {
        document.getElementById("emailform").style.display = "block";
    }
}

function closeForm() {
    document.getElementById("emailform").style.display = "none";
}

function enterNewsletter() {

}

function selectBackground() {
    const images = [
        "cloudy-forest-1600x900.jpg",
        "cloudy-mountain-1600x900.jpg",
        "cloudy-mountainrange-1600x900.jpg",
        "sunny-mountain-1600x900.jpg"
    ];
    var number = Math.floor(Math.random() * (images.length - 0)) + 0;
    document.getElementById("main-area").style.backgroundImage = `url(images/${images[number]})`;
}