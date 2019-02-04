$(document).ready(function () {
    const btnLoad = document.getElementById('btn-load');
    const btnSend = document.getElementById('btn-send');

    btnLoad.addEventListener('click', function () {
        console.log('bnt-load clicked');
    });

    btnSend.addEventListener('click', function () {
        console.log('bnt-send clicked');
    });

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
                <div class="item-image">
                    <img src="${item.image}"/>
                </div>
                <div class="item-content">
                    <h2 class="item-content-header">${item.header}</h2>
                    <p class="item-content-text">${item.text}.</p>
                    <div class="item-content-buttons">
                        <a href="#"><button class="btn-visit">Visit Site</button></a>
                        <a href="#"><button class="btn-git">Github <i class="fab fa-github"></i></button></a>
                    </div>
                </div>
          </div>`
        );
        console.log(item);
    }
});