$(document).ready(function() {
    feather.replace();
    
    $('#signup-form').on('submit', function(e) {
        e.preventDefault();
        
        const form = this;
        
        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(new FormData(form)).toString()
        })
        .then(() => {
            // Fade out existing content
            $('.signup-text, form').addClass('fade-out');
            
            // Wait for fade out to complete
            setTimeout(() => {
                // Hide the form and text
                $('.signup-text, form').hide();
                
                // Show success message with animation
                $('.success-message').css({
                    'display': 'block',
                    'transform': 'translateY(20px)',
                    'opacity': '0'
                });
                
                // Trigger the animation
                setTimeout(() => {
                    $('.success-message').addClass('fade-in');
                }, 50);
            }, 500);
        })
        .catch((error) => alert('Error submitting form. Please try again.'));
    });
});