// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form elements
            const nameInput = contactForm.querySelector('input[placeholder="Enter your name"]');
            const emailInput = contactForm.querySelector('input[placeholder="Enter your email"]');
            const subjectInput = contactForm.querySelector('input[placeholder="Enter your subject"]');
            const messageInput = contactForm.querySelector('textarea');
            
            // Reset previous error states
            const inputs = [nameInput, emailInput, subjectInput, messageInput];
            inputs.forEach(input => {
                input.classList.remove('is-invalid');
            });
            
            // Validation
            let isValid = true;
            
            // Name validation
            if (!nameInput.value.trim()) {
                nameInput.classList.add('is-invalid');
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('is-invalid');
                isValid = false;
            }
            
            // Subject validation
            if (!subjectInput.value.trim()) {
                subjectInput.classList.add('is-invalid');
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                messageInput.classList.add('is-invalid');
                isValid = false;
            }
            
            // If valid, proceed with form submission
            if (isValid) {
                // Create a feedback message
                const feedbackDiv = document.createElement('div');
                feedbackDiv.className = 'alert alert-success mt-3';
                feedbackDiv.innerHTML = 'Thanks for your message! I\'ll get back to you soon.';
                
                // Append the feedback message
                contactForm.appendChild(feedbackDiv);
                
                // Reset the form
                contactForm.reset();
                
                // Remove the feedback message after 5 seconds
                setTimeout(() => {
                    feedbackDiv.remove();
                }, 5000);
                
                // In a real implementation, you would send the data to a server
                // using fetch API or another AJAX method
                /*
                fetch('your-backend-url', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: nameInput.value.trim(),
                        email: emailInput.value.trim(),
                        subject: subjectInput.value.trim(),
                        message: messageInput.value.trim()
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                */
            }
        });
    }
});