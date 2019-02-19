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