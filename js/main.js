$(document).ready(function() {
    // Load latest YouTube video from juanrnsto channel
    loadLatestYouTubeVideo();
    
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

// Function to load the latest YouTube video
function loadLatestYouTubeVideo() {
    // Using your personal channel: juanrnsto
    const videoContainer = document.getElementById('youtube-latest-video');
    
    if (videoContainer) {
        // Create iframe element
        const iframe = document.createElement('iframe');
        
        // Set attributes for the iframe
        iframe.setAttribute('width', '560');
        iframe.setAttribute('height', '315');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('title', 'Latest Sipful Update');
        
        // Set the source to embed the latest public video from your personal channel
        // The 'UU' prefix is for user uploads playlist which contains only public videos
        iframe.setAttribute('src', 'https://www.youtube.com/embed?listType=playlist&list=UUecIQI61B0YV9L83gSrww7g');
        
        // Clear any loading message
        videoContainer.innerHTML = '';
        
        // Add the iframe to the container
        videoContainer.appendChild(iframe);
        
        // Handle potential errors
        iframe.onerror = function() {
            console.log("Error loading video, using fallback");
            loadFallbackVideo();
        };
        
        // Check if iframe loaded correctly after a timeout
        setTimeout(function() {
            if (videoContainer.querySelector('.video-placeholder')) {
                loadFallbackVideo();
            }
        }, 3000);
    }
    
    // Fallback function to load a specific video if the playlist approach fails
    function loadFallbackVideo() {
        if (videoContainer) {
            // Load a specific video from your personal channel
            // You should replace this ID with any public video ID from your channel
            const fallbackVideoId = 'KTlwY9_5_0U'; // Replace with a public video ID from your channel
            videoContainer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${fallbackVideoId}" title="Sipful Latest Update" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
    }
}