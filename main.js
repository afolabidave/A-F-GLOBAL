document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Form Submission Logic
    const bookingForm = document.getElementById('booking-form');
    // NOTE: Replace this with the actual WhatsApp number of the business. (Format: country code + number without +, e.g., 1234567890)
    const WHATSAPP_NUMBER = "2348117595965"; 

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const details = document.getElementById('details').value;

            // Construct WhatsApp message
            const message = `*New Booking/Inquiry from A&F Logistics Website*%0A%0A*Name:* ${name}%0A*Service:* ${service}%0A*Date Needed:* ${date}%0A*Details:* ${details}`;
            
            // Generate WhatsApp URL
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

            // Open in new tab
            window.open(whatsappUrl, '_blank');
        });
    }

    // Optional: Smooth scroll offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                // If mobile menu is open, close it
                if(navLinks.classList.contains('active')){
                    navLinks.classList.remove('active');
                }
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
});
