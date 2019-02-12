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
        console.log(item);
    }
});