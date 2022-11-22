window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        document.querySelector('body').style.background = 'cyan';
    } else {
        document.querySelector('body').style.background = 'springgreen';
    }
}