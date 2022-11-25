// Start with first post
let counter = 1;

// load 20 posts at a time
const quantity = 20;

// Load next set of posts
function load() {

    // Set start and end post numbers, and update counter
    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    // Get new posts and add posts
    fetch(`/posts?start=${start}&${end}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(add_post);
    })
}

// Add a new post with given contents to DOM
function add_post(contents) {
    // Create new post
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `${contents} <button class='hide'>Hide</button>`;

    // Add post to DOM
    document.querySelector('#posts').append(post);
}

// When Dom loads, render the first 20 posts
document.addEventListener('DOMContentLoaded', load);

// If scrolled to bottom, load the next 20 posts
let lastfire = 0;
let delay = 1000;
window.onscroll = function() {
    if (lastfire >= (Date.now() - delay)) {
        return;
    }
    lastfire = Date.now();
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Wait before load
        setTimeout(load, 50);
    }
}

// If hide button is clicked, delete the post
document.addEventListener('click', event => {
    const element = event.target;
    if (element.className === 'hide') {
        element.parentElement.style.animationPlayState = 'running';
        element.parentElement.addEventListener('animationend', function() {
            element.parentElement.remove();
        })
    }
})