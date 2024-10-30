// Simple smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Custom cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Update cursor position
document.addEventListener('mousemove', (e) => {
    requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
});

// Cursor interaction with interactive elements
document.querySelectorAll('a, button, input').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('expanded');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('expanded');
    });
});

// Add this to your existing script.js

async function handleSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const submitButton = event.submitter;
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxhXCQ6EkA41QtLpGl6LhhcC5khLbA2zKQRuKxk7jBsktE7IHZ0k6g06QUxsNcTGkr5RQ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            })
        });

        // Clear form
        document.getElementById('contactForm').reset();
        
        // Show success message
        submitButton.textContent = 'Sent!';
        setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 2000);

    } catch (error) {
        console.error('Error:', error);
        submitButton.textContent = 'Error';
        setTimeout(() => {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }, 2000);
    }

    return false;
}