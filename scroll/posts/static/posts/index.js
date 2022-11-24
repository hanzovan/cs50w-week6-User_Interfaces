// Start with first post
let counter = 1;

// Load posts 20 at a time
const quantity = 20;

// when DOM loads, render the first 20 posts
document.addEventListener('DOMContentLoaded', function() {
    load();
});


// Prevent function to execute multiple times
let lastfire = 0;
let delay = 1000;
// If scrolled to bottom, load the next 20 posts
window.onscroll = function() {
    if (lastfire >= (Date.now() - delay)){
        return;
    }
    lastfire = Date.now();
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {       
        
        // Wait before load
        setTimeout(load, 50);
    }
}

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
    post.innerHTML = contents;

    // Add post to DOM
    document.querySelector('#posts').append(post);
}