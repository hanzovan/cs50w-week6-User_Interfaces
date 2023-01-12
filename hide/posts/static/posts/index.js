let counter = 1;
const quantity = 20;

function load() {
    let start = counter;
    let end = start + quantity - 1;
    counter = end + 1;
    fetch(`posts?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(post => {
            const p = document.createElement('div');
            p.className = 'post';
            p.innerHTML = `${post}<button class="hide">Hide</button>`;
            document.querySelector('#posts').append(p);
        })
    })
}

let lastfire = 0;
let delay = 1000;

document.addEventListener('DOMContentLoaded', function() {

    // When document loaded, load first 20 posts
    document.querySelector('body').style.background = '#FFDCE7';
    setTimeout(load, 500);

    // If window onscroll, check if it reach the end of the document, load more 20 posts, prevent multiple shot
    window.onscroll = function() {
        if (lastfire >= Date.now() - delay) {
            return;
        }
        lastfire = Date.now();
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setTimeout(load, 500);
        }
    }

    // If hide button was click, hide the post
    document.addEventListener('click', event => {
        const element = event.target;
        if (element.className === 'hide') {
            element.parentElement.style.animationPlayState = 'running';
            element.parentElement.addEventListener('animationend', function() {
                element.parentElement.remove();
            })
            
        }
    })

})