const navContactBtn = document.getElementById('nav-contact-btn');

navContactBtn.addEventListener('click', function () {
    // Scroll to a certain element
    document.querySelector('#contact').scrollIntoView({
        top: -200,
        left: 0,
        behavior: 'smooth'
    });
});