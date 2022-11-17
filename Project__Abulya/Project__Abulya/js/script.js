"use strict";

new Swiper('.swiper1', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
		  dynamicBullets: true,
    },

    mousewheel: {
        sensitivity: 1,
        eventsTarget: ".swiper1"
    },
});

jarallax(document.querySelectorAll('.jarallax'), {
	speed: -0.2,
});

