const sendBtn = document.getElementById('btn-send');

sendBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.getElementById('input_name');
    const email = document.getElementById('input_email');
    const message = document.getElementById('input_message');
    const contactMsg = document.getElementById('contact-msg');

    const contactForm = {
        name: name.value,
        email: email.value,
        message: message.value
    };

    $.ajax({
        type: 'POST',
        url: '/contact',
        datatype: "application/json",
        data: contactForm,
    }).done((result) => {
        const initalBoxShadow = '0px 5px 20px 0px rgba(67, 76, 172, 0.3)';
        if (result.errors) {
            const errors = result.errors;
            const errorBoxShadow = '0px 5px 20px 0px rgba(255, 0, 0, 0.7)';
            errors.map((error) => {

                contactMsg.classList.add('error');
                const param = error.param.toString();
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
        } else {
            name.style.boxShadow = initalBoxShadow;
            email.style.boxShadow = initalBoxShadow;
            message.style.boxShadow = initalBoxShadow;
            contactMsg.classList.add('success');
            contactMsg.innerText = result.success;
        }

    }).fail((err) => console.log(err));
});