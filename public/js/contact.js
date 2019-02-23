const sendBtn = document.getElementById('btn-send');
const name = document.getElementById('input_name');
const email = document.getElementById('input_email');
const message = document.getElementById('input_message');
const contactMsg = document.getElementById('contact-msg');


sendBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // create object with contact name, email and message
    const contactForm = {
        name: name.value,
        email: email.value,
        message: message.value
    };

    // perform client side form validation and check if valid
    // if valid send to server
    if (clientSideValidation(contactForm)) {
        //ajax call to /contact to send email
        $.ajax({
            type: 'POST',
            url: '/contact',
            datatype: "application/json",
            data: contactForm,
        }).done((result) => {
            contactMsg.classList.remove('error');
            contactMsg.classList.add('success');
            contactMsg.innerHTML = 'message has been successfully sent.'
            // errors due to form form validation
            if (result.errors) {
                console.log(result.errors)
            }

        }).fail((err) => console.log(err));
    } else {
        console.log('invalid form');
        contactMsg.classList.remove('success');
        contactMsg.classList.add('error');
        contactMsg.innerHTML = 'invalid form please fill out all required fields.'
    }
});


function clientSideValidation(contactForm) {
    const errors = [];
    Object.keys(contactForm).forEach(function (input) {
        const key = input;
        const value = contactForm[input];
        const result = (validateInput(key, value));
    
        if (result.error) {
            console.log(result.error);
            errors.push(result);
            addErrorCSS(result.key);
        } else if(result.succcess) {
            addInitalCSS(result.key);
        }
    });

    if(errors.length > 0) {
        return false;
    }

    return true;
}

function validateInput(key, value) {

    // checks for name and message both must be larger than 1 character
    if (key == 'name' || key == 'message') {
        if (value === undefined || value === null || value.length < 1) {
            return {
                key,
                error: `invalid ${key}`
            }
        }
        return {
            key,
            'succcess': true
        }
    }

    // checks for email validation
    if (key == 'email') {
        if (!validateEmail(value)) {
            return {
                key,
                error: 'invalid email'
            }
        }
        return {
            key,
            'succcess': true
        }
    }
}

// use regex to validate email returns true or false
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// add error box shadow to input in which invalidation occurs
function addErrorCSS(key) {
    console.log('in ERRORS', key);

    const errorBoxShadow = '0px 5px 20px 0px rgba(255, 0, 0, 0.7)';

    if (key == 'name') {
        name.style.boxShadow = errorBoxShadow;
    }
    if (key == 'email') {
        email.style.boxShadow = errorBoxShadow;
    }
    if (key == 'message') {
        message.style.boxShadow = errorBoxShadow;
    }
}

function addInitalCSS(key) {
    console.log('in SUCCESS', key);

    // inital box shadow of input
    const initalBoxShadow = '0px 5px 20px 0px rgba(67, 76, 172, 0.3)';
    if (key == 'name') {
        name.style.boxShadow = initalBoxShadow;
    }
    if (key == 'email') {
        email.style.boxShadow = initalBoxShadow;
    }
    if (key == 'message') {
        message.style.boxShadow = initalBoxShadow;
    }
}