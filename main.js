document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Dynamic Form Handlers
    const serviceSelect = document.getElementById('service');
    const detailsTextarea = document.getElementById('details');
    const destinationGroup = document.getElementById('destination-group');
    const destinationInput = document.getElementById('destination');
    const dateLabel = document.getElementById('date-label');
    const storageEndGroup = document.getElementById('storage-end-group');
    const storageEndInput = document.getElementById('storage-end');
    const dateInput = document.getElementById('date');
    
    if (serviceSelect && detailsTextarea) {
        serviceSelect.addEventListener('change', (e) => {
            if (e.target.value === 'Logistics') {
                detailsTextarea.placeholder = "Tell us about the contents of the item\nVALUE MUST BE UNDER 50,000";
                
                if(destinationGroup) destinationGroup.style.display = 'block';
                if(destinationInput) destinationInput.required = true;
                if(dateLabel) dateLabel.innerText = "Date Needed";
                if(storageEndGroup) storageEndGroup.style.display = 'none';
                if(storageEndInput) storageEndInput.required = false;

            } else if (e.target.value === 'Warehousing') {
                detailsTextarea.placeholder = "Tell us about the contents of the item";
                
                if(destinationGroup) destinationGroup.style.display = 'none';
                if(destinationInput) destinationInput.required = false;
                if(dateLabel) dateLabel.innerText = "Date of Pickup";
                if(storageEndGroup) storageEndGroup.style.display = 'block';
                if(storageEndInput) storageEndInput.required = true;
            } else {
                detailsTextarea.placeholder = "Tell us more about your requirements...";
                
                if(destinationGroup) destinationGroup.style.display = 'block';
                if(destinationInput) destinationInput.required = true;
                if(dateLabel) dateLabel.innerText = "Date Needed";
                if(storageEndGroup) storageEndGroup.style.display = 'none';
                if(storageEndInput) storageEndInput.required = false;
            }
        });
    }

    // 30 day validation for warehousing
    if(dateInput && storageEndInput) {
        dateInput.addEventListener('change', () => {
            if (serviceSelect.value === 'Warehousing' && dateInput.value) {
                const minDate = new Date(dateInput.value);
                minDate.setDate(minDate.getDate() + 30);
                const formattedMinDate = minDate.toISOString().split('T')[0];
                storageEndInput.min = formattedMinDate;
                
                if (storageEndInput.value && storageEndInput.value < formattedMinDate) {
                    storageEndInput.value = formattedMinDate;
                }
            }
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
            const pickup = document.getElementById('pickup').value;
            const destination = document.getElementById('destination').value;
            const date = document.getElementById('date').value;
            const details = document.getElementById('details').value;
            const storageEnd = document.getElementById('storage-end').value;

            // Get current date and time of submission
            const submissionDate = new Date();
            const formattedSubmissionTime = submissionDate.toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });

            // Construct WhatsApp message
            let rawMessage = `*New Booking/Inquiry from A&F Logistics Website*\n_Submitted on: ${formattedSubmissionTime}_\n\n*Name:* ${name}\n*Service:* ${service}\n*Pickup Point:* ${pickup}\n`;
            
            if (service === 'Warehousing') {
                rawMessage += `*Date of Pickup:* ${date}\n*Storage End Date:* ${storageEnd}\n`;
            } else {
                rawMessage += `*Destination:* ${destination}\n*Date Needed:* ${date}\n`;
            }

            rawMessage += `*Details:* ${details}`;
            
            // Generate WhatsApp URL
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(rawMessage)}`;

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
