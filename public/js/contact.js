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
        data: JSON.stringify(contactForm),
        success: function (message) {
            console.log(message);
        },
        error: function({ responseJSON: { errors }}) {
            contactMsg.innerHTML = 'One or more fields are invalid';
            errors.map(error => {
                const { param } = error;
                if(param == 'name') {
                    name.style.boxShadow = '0px 5px 20px 0px rgba(255, 0, 0, 0.7)';
                }
                else if(param == 'email') {
                    email.style.boxShadow = '0px 5px 20px 0px rgba(255, 0, 0, 0.7)';
                }
                else if(param == 'message') {
                    message.style.boxShadow = '0px 5px 20px 0px rgba(255, 0, 0, 0.7)';
                }
            });
        }
    });
});