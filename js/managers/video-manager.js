// ==========================================================================
// VIDEO INTERSECTION OBSERVER
// ==========================================================================
export class VideoManager {
    constructor() {
        this.videos = new Map();
        this.observers = new Map();
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;

        // Find all videos in the document
        const videoElements = document.querySelectorAll('video');

        videoElements.forEach(video => {
            this.setupVideoObserver(video);
        });

        this.initialized = true;

    }

    setupVideoObserver(video) {
        if (!video.id) {
            console.warn('Video element found without ID, skipping observer setup');
            return;
        }

        // Store video reference
        this.videos.set(video.id, video);

        // Create intersection observer for this video
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.playVideo(video);
                } else {
                    this.pauseVideo(video);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px' // Slight margin to ensure it's truly in view
        });

        // Start observing the video
        observer.observe(video);
        this.observers.set(video.id, observer);


    }

    playVideo(video) {
        if (video.paused) {
            video.play().then(() => {
                console.log(`Video ${video.id} started playing`);
            }).catch(error => {
                console.warn(`Could not auto-play video ${video.id}:`, error);
                // Auto-play might be blocked by browser policy
                // In this case, the user will need to manually start the video
            });
        }
    }

    pauseVideo(video) {
        if (!video.paused) {
            video.pause();
            console.log(`Video ${video.id} paused`);
        }
    }

    destroy() {
        // Clean up all observers
        this.observers.forEach((observer, videoId) => {
            observer.disconnect();
            console.log(`Observer disconnected for video: ${videoId}`);
        });

        this.videos.clear();
        this.observers.clear();
        this.initialized = false;
    }

    // Public method to manually control a specific video
    controlVideo(videoId, action) {
        const video = this.videos.get(videoId);
        if (!video) {
            console.warn(`Video with ID ${videoId} not found`);
            return;
        }

        switch (action) {
            case 'play':
                this.playVideo(video);
                break;
            case 'pause':
                this.pauseVideo(video);
                break;
            case 'reset':
                video.currentTime = 0;
                this.pauseVideo(video);
                break;
            default:
                console.warn(`Unknown video action: ${action}`);
        }
    }
}
