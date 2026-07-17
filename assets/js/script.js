// Scroll State Logic for Floating Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Trigger scroll check on load
if (window.scrollY > 20) {
    const header = document.querySelector('header');
    if (header) header.classList.add('scrolled');
}

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

// Counter Animation Logic
const counters = document.querySelectorAll('.counter');
const counterObserverOptions = { threshold: 1, rootMargin: "0px 0px -50px 0px" };

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const updateCounter = () => {
                const targetValue = +target.getAttribute('data-target');
                const count = +target.innerText.replace("+", "");
                const increment = targetValue / 100;
                if (count < targetValue) {
                    target.innerText = Math.ceil(count + increment);
                    setTimeout(updateCounter, 20);
                } else { 
                    target.innerText = targetValue + "+"; 
                }
            };
            updateCounter();
            counterObserver.unobserve(target);
        }
    });
}, counterObserverOptions);

counters.forEach(c => counterObserver.observe(c));

// Improved Accordion FAQ Toggling
function toggleFaq(element) {
    const item = element.parentElement;
    const content = element.nextElementSibling;
    
    // Close other FAQs
    document.querySelectorAll('.faq-item').forEach(faq => {
        if (faq !== item && faq.classList.contains('active')) {
            faq.classList.remove('active');
            faq.querySelector('.faq-content').style.maxHeight = null;
        }
    });
    
    item.classList.toggle('active');
    if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        content.style.maxHeight = null;
    }
}



// WhatsApp Booking Submit handler
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const type = document.getElementById('consultationType').value;
        const date = document.getElementById('date').value;
        const message = document.getElementById('message').value || "None";

        const whatsappMessage = `*New Appointment Request* %0A%0A` +
            `*Name:* ${name}%0A` +
            `*Phone:* ${phone}%0A` +
            `*Service:* ${service}%0A` +
            `*Consultation:* ${type}%0A` +
            `*Date:* ${date}%0A` +
            `*Message:* ${message}`;

        const waLink = `https://wa.me/9779767797950?text=${whatsappMessage}`;
        window.open(waLink, '_blank');

        const successMsg = document.getElementById('successMsg');
        if (successMsg) successMsg.style.display = "block";
        bookingForm.reset();
    });
}
