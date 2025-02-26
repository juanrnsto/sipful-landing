$(document).ready(function() {
    
    // Form submission handling
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

// Function to load a specific YouTube video 
function loadLatestYouTubeVideo() {
    const videoContainer = document.getElementById('youtube-latest-video');
    
    if (videoContainer) {
        // Use a specific video ID that you know works
        // You can update this ID whenever you publish a new video
        const videoId = 'KTlwY9_5_0U'; // Replace with your video ID
        
        // Create the iframe with direct video ID approach
        videoContainer.innerHTML = `
            <iframe 
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/${videoId}" 
                title="Latest Sipful Update" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
    }
}