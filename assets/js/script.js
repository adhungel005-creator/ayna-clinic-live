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

// Chatbot Logic
function toggleChat() {
    const chat = document.getElementById('chatbot-window');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const chatBox = document.getElementById('chatbot-messages');
    if (input.value.trim() === "") return;
    
    const userDiv = document.createElement('div');
    userDiv.className = 'msg user-msg';
    userDiv.innerText = input.value;
    chatBox.appendChild(userDiv);
    
    const userText = input.value.toLowerCase();
    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Typing simulator delay
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'msg bot-msg';
        
        if (userText.includes("doctor") || userText.includes("bibisha") || userText.includes("expert")) {
            botDiv.innerText = "Dr. Bibisha Baaniya is our board-certified dermatologist (NMC No. 17402). She specializes in advanced skin, venereal, and aesthetic laser care.";
        } else if (userText.includes("pharmacy") || userText.includes("medicine") || userText.includes("skincare")) {
            botDiv.innerHTML = "Yes, we have a fully-stocked in-house pharmacy! We offer online home delivery too. <a href='https://wa.me/9779767797950?text=I%20want%20to%20order%20medicines' target='_blank'>Order via WhatsApp</a>";
        } else if (userText.includes("treatment") || userText.includes("service") || userText.includes("price") || userText.includes("pricing")) {
            botDiv.innerText = "We provide Hydrafacial, Chemical Peels, Hair Removal Lasers, HIFU, Microneedling, CO2 lasers, PRP, and GFC treatments. Drop us a line with the treatment you are looking for!";
        } else if (userText.includes("location") || userText.includes("find") || userText.includes("where")) {
            botDiv.innerHTML = "We are located at Rangeli Road, Biratnagar. See our <a href='#contact'>Google Map</a> or watch our path-finding video above.";
        } else {
            botDiv.innerHTML = "How can I help you today? Feel free to <a href='https://wa.me/9779767797950' target='_blank'>WhatsApp Us</a> directly or call us at +977 9767797950.";
        }
        
        chatBox.appendChild(botDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
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
