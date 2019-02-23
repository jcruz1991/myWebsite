const sendBtn = document.getElementById('btn-send');

sendBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('input_name');
    const email = document.getElementById('input_email');
    const message = document.getElementById('input_message');
    const contactMsg = document.getElementById('contact-msg');

    // create object with contact name, email and message
    const contactForm = {
        name: name.value,
        email: email.value,
        message: message.value
    };

    // ajax call to /contact to send email
    $.ajax({
        type: 'POST',
        url: '/contact',
        datatype: "application/json",
        data: contactForm,
    }).done((result) => {
        // inital box shadow of input
        const initalBoxShadow = '0px 5px 20px 0px rgba(67, 76, 172, 0.3)';
        // errors due to form form validation
        if (result.errors) {
            const errors = result.errors;
            const errorBoxShadow = '0px 5px 20px 0px rgba(255, 0, 0, 0.7)';
            errors.map((error) => {

                contactMsg.classList.add('error');
                const param = error.param.toString();
                // change box shadow to red if error occurs on a input
                switch (param) {
                    case 'name':
                        name.style.boxShadow = errorBoxShadow;
                        break;
                    case 'email':
                        email.style.boxShadow = errorBoxShadow;
                        break;
                    case 'message':
                        message.style.boxShadow = errorBoxShadow;
                } 
            });
        } else if(result.nodemailerError) {
            // error due to email couldn't;t be sent
            contactMsg.classList.add('error');
            contactMsg.innerHTML = result.nodemailerError;
        } else {
            //successfully validated form and successfully sent email
            name.style.boxShadow = initalBoxShadow;
            email.style.boxShadow = initalBoxShadow;
            message.style.boxShadow = initalBoxShadow;
            contactMsg.classList.add('success');
            contactMsg.innerText = result.success;
        }
    }).fail((err) => console.log(err));
});
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '/work',
        success: function (items) {
            items.forEach((item) => {
                constructItem(item);
            });

        }
    });

    function constructItem(item) {
        $('.work-portfolio-container').append(
            `
            <div class="item">
                <div class="item-image" style="background-image: url(${item.image})">
                </div>
                <div class="item-content">
                    <h1 class="item-content-header">${item.header}</h1>
                    <p class="item-content-text">${item.text}.</p>
                    <div class="item-content-buttons">
                        <a href="${item.link}" target="_blank">
                            <span class="btn-visit">Visit Site</span>
                            <div class="rec"></div>
                        </a>
                    </div>
                </div>
          </div>`
        );
    }
});
const navContactBtn = document.getElementById('nav-contact-btn');

navContactBtn.addEventListener('click', function () {
    // Scroll to a certain element
    document.querySelector('#contact').scrollIntoView({
        top: -200,
        left: 0,
        behavior: 'smooth'
    });
});