// Simple smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Profile image tilt effect
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = profileImage.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            const img = profileImage.querySelector('img');
            if (img) {
                img.style.transform = `
                    perspective(1000px)
                    rotateY(${x * 10}deg)
                    rotateX(${-y * 10}deg)
                    scale(1.05)
                `;
            }
        });

        profileImage.addEventListener('mouseleave', () => {
            const img = profileImage.querySelector('img');
            if (img) {
                img.style.transform = 'none';
            }
        });
    }

    // Simple Gmail copy functionality
    const gmailIcons = document.querySelectorAll('.gmail-icon');
    
    gmailIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Create temporary textarea
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = 'acadarpanjain@gmail.com';
            document.body.appendChild(tempTextArea);
            
            // Select and copy
            tempTextArea.select();
            document.execCommand('copy');
            
            // Remove temporary element
            document.body.removeChild(tempTextArea);
            
            // Show feedback
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                const originalText = tooltip.textContent;
                tooltip.textContent = 'Copied!';
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    tooltip.textContent = originalText;
                    if (!icon.matches(':hover')) {
                        tooltip.style.opacity = '0';
                        tooltip.style.visibility = 'hidden';
                    }
                }, 2000);
            }
        });
    });
});