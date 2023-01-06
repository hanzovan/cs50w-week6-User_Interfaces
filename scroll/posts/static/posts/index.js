let counter = 1;
const quantity = 20;
function load() {
    start = counter;
    end = start + quantity - 1;
    counter = end + 1;
    fetch(`posts?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(post => {
            let p = document.createElement('div');
            p.className = 'post';
            p.innerHTML = post;
            document.querySelector('#posts').append(p);
        })
    })
}


document.addEventListener('DOMContentLoaded', function() {
    // Load after 1 second delay
    setTimeout(load, 1000);
})

// When user scroll to the bottom of the body, load
// But don't allow multiple fire for load function

// Defire last time the function load call
let lastfire = 0;

// Define the delay time that won't allow function load to call again in that duration
let delay = 1000;

window.onscroll = function() {
    // If user scroll to bottom in delay duration
    if ((Date.now() - lastfire) < delay) {
        return;
    }
    // If user scroll after delay duration
    if ((window.innerHeight + scrollY) >= document.body.offsetHeight) {
        // Load after 1s delay
        setTimeout(load, 1000);
    }
    // Set lastfire to the current time
    lastfire = Date.now();
}