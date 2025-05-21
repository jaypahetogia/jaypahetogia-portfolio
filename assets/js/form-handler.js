document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Show sending status
      formStatus.textContent = 'Sending message...';
      formStatus.className = 'alert alert-info';
      formStatus.style.display = 'block';
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      try {
        // Replace with your Azure Function URL after deployment
        const functionUrl = 'https://jaypcodes-functions.azurewebsites.net/api/ContactForm';
        
        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        const result = await response.text();
        
        if (response.ok) {
          // Success
          formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formStatus.className = 'alert alert-success';
          contactForm.reset();
        } else {
          // Error from server
          formStatus.textContent = `Error: ${result}`;
          formStatus.className = 'alert alert-danger';
        }
      } catch (error) {
        // Network or other error
        formStatus.textContent = 'Failed to send message. Please try again later.';
        formStatus.className = 'alert alert-danger';
        console.error('Error:', error);
      }
    });
  }
});