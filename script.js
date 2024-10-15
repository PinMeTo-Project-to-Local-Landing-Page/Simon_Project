document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully!');
    
    // Example: Add a click event to the CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(event) {
            event.preventDefault();
            alert('Thank you for your interest! Our booking system will open in a new tab.');
            window.open(this.href, '_blank');
        });
    }

    // You can add more JavaScript functionality here
});