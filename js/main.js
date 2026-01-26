(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        nav: false,
        dots: true,
        dotsData: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });    
    
    async function fetchRSS(url, elementId) {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`);
            const data = await response.json();
    
            let output = "";
            data.items.slice(0, 5).forEach(item => {
                output += `<li><a href="${item.link}" target="_blank">${item.title}</a></li>`;
            });
    
            document.getElementById(elementId).innerHTML = output;
        } catch (error) {
            console.error("Error fetching RSS feed:", error);
            document.getElementById(elementId).innerHTML = "<li>⚠️ Failed to load news. Try again later.</li>";
        }
    }
    
    // Fetch Hackathon & Tech News Feeds
    fetchRSS("https://devpost.com/hackathons.rss", "hackathon-feed"); // Hackathon feed
    fetchRSS("https://techcrunch.com/feed/", "tech-news-feed"); // Tech news feed
    
    // Auto-refresh every 30 minutes
    setInterval(() => {
        fetchRSS("https://devpost.com/hackathons.rss", "hackathon-feed");
        fetchRSS("https://techcrunch.com/feed/", "tech-news-feed");
    }, 1800000);
    



    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;
        
        if(name && email && message) {
            document.getElementById("response").innerText = "Thank you! We'll get back to you soon.";
            document.getElementById("contactForm").reset();
        } else {
            document.getElementById("response").innerText = "Please fill all required fields.";
        }
    });

    



    // script.js
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    
    if (name && email && message) {
        document.getElementById("response").innerText = "Thank you, " + name + "! We will reach out to you soon.";
        document.getElementById("contactForm").reset();
    } else {
        document.getElementById("response").innerText = "Please fill in all fields.";
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const services = document.querySelectorAll(".service-box");
    services.forEach(service => {
        service.addEventListener("mouseenter", () => {
            service.style.transform = "scale(1.05)";
            service.style.transition = "0.3s ease";
        });
        service.addEventListener("mouseleave", () => {
            service.style.transform = "scale(1)";
        });
    });

});
    
})(jQuery);

