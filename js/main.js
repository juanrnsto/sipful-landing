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
            // Add fade-out class to initiate transition
            $('.signup-text, form').addClass('fade-out');
            
            // Wait for fade out to complete
            setTimeout(() => {
                // Hide the form and text
                $('.signup-text, form').hide();
                
                // Show and fade in success message
                $('.success-message').css('display', 'block');
                setTimeout(() => {
                    $('.success-message').addClass('fade-in');
                }, 50);
            }, 500);
        })
        .catch((error) => alert('Error submitting form. Please try again.'));
    });
});