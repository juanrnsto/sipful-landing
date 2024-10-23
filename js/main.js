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
            // Fade out both the signup text and form
            $('.signup-text').fadeOut();
            $(form).fadeOut();
            $('.success-message').fadeIn().focus();
        })
        .catch((error) => alert('Error submitting form. Please try again.'));
    });
});