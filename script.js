// Get references to all original images and full-screen view elements
const originalImages = document.querySelectorAll('.fullscreen-img');
const fullscreenView = document.querySelector('.fullscreen-view');
const fullscreenImage = document.querySelector('.fullscreen-image');

// Add click event listener to each original image
originalImages.forEach(originalImage => {
    originalImage.addEventListener('click', function() {
        // Set the full-screen image source to the clicked original image source
        fullscreenImage.src = this.src;
        // Show the full-screen view
        fullscreenView.style.display = 'flex'; // Using flex to center the image
    });
});

// Add click event listener to the full-screen view to exit full-screen
fullscreenView.addEventListener('click', function() {
    exitFullscreen();
});

// Function to exit full-screen mode
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }
    // Hide the full-screen view
    fullscreenView.style.display = 'none';
}

const originalVideos = document.querySelectorAll('.fullscreen-video');
const fullscreenViewVideo = document.querySelector('.fullscreen-view-video');
const fullscreenVideo = document.querySelector('.fullscreen-video-player');

// Function to update the video size based on window dimensions
function updateVideoSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get the original video dimensions
    const originalVideoWidth = fullscreenVideo.videoWidth;
    const originalVideoHeight = fullscreenVideo.videoHeight;

    // Calculate the aspect ratio of the original video
    const originalAspectRatio = originalVideoWidth / originalVideoHeight;

    // Calculate the aspect ratio of the window
    const windowAspectRatio = windowWidth / windowHeight;

    // Determine the video size based on the aspect ratios
    if (windowAspectRatio > originalAspectRatio) {
        // Window is wider than the video, resize based on height
        fullscreenVideo.style.width = 'auto';
        fullscreenVideo.style.height = '100%';
    } else {
        // Window is taller than the video, resize based on width
        fullscreenVideo.style.width = '100%';
        fullscreenVideo.style.height = 'auto';
    }
}

// Add click event listener to each original video
originalVideos.forEach(originalVideo => {
    originalVideo.addEventListener('click', function() {
        // Set the full-screen video source to the clicked original video source
        fullscreenVideo.src = this.src;
        // Show the full-screen view
        fullscreenViewVideo.style.display = 'flex'; // Using flex to center the video
        // Play the video automatically
        fullscreenVideo.play();
        // Update video size when it's loaded
        fullscreenVideo.addEventListener('loadedmetadata', updateVideoSize);
    });
});

// Function to close the fullscreen view
function closeFullscreenViewVideo() {
    // Hide the full-screen view
    fullscreenViewVideo.style.display = 'none';
    // Pause the video
    fullscreenVideo.pause();
}

// Add click event listener to the fullscreen view
fullscreenViewVideo.addEventListener('click', function(event) {
    // Check if the click event target is not the video element
    if (event.target !== fullscreenViewVideo) {
        // Close the fullscreen view
        closeFullscreenViewVideo();
    }
});

// Close fullscreen view when clicking outside the video
fullscreenViewVideo.addEventListener('click', function(event) {
    if (event.target === this) {
        closeFullscreenViewVideo();
    }
});

// Close fullscreen view when pressing the escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeFullscreenViewVideo();
    }
});

// Update video size when the window is resized
window.addEventListener('resize', updateVideoSize);

// Get references to all video elements with class "video"
var thumbnail = document.getElementsByClassName('mv');

// Iterate through each video element
Array.from(thumbnail).forEach(function(thumbnail) {
    // Wait for metadata to be loaded for each video
    thumbnail.addEventListener('loadedmetadata', function() {
        // Calculate the time point for the middle frame
        var middleTime = thumbnail.duration / 2;

        // Seek to the middle time point
        thumbnail.currentTime = middleTime;

        // Wait for the video to seek
        thumbnail.addEventListener('seeked', function() {
            // Get the canvas element
            var canvas = document.createElement('canvas');
            canvas.width = thumbnail.videoWidth;
            canvas.height = thumbnail.videoHeight;

            // Draw the current frame of the video onto the canvas
            var ctx = canvas.getContext('2d');
            ctx.drawImage(thumbnail, 0, 0, canvas.width, canvas.height);

            // Convert canvas to data URL
            var dataURL = canvas.toDataURL();

            // Set the data URL as the poster attribute for the current video
            thumbnail.setAttribute('poster', dataURL);
        });
    });
});