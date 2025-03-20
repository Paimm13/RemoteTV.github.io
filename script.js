function switchTo1() {
    playerInstance.setup({
        file: "https://cempedak-live-cdn.mncnow.id/live/eds/MNCTV-HD/sa_dash_vmx/MNCTV-HD.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo2() {
    playerInstance.setup({
        file: "https://cempedak-live-cdn.mncnow.id/live/eds/GTV-HD/sa_dash_vmx/GTV-HD.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo3() {
    playerInstance.setup({
        file: "https://dsgtq5sngxkde.cloudfront.net/live/eds/Trans7-2/sa_dash_vmx/Trans7-2.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo4() {
    playerInstance.setup({
        file: "https://dsgtq5sngxkde.cloudfront.net/live/eds/NetTV-HD/sa_dash_vmx/NetTV-HD.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo5() {
    playerInstance.setup({
        file: "https://dsgtq5sngxkde.cloudfront.net/live/eds/ANTV/sa_dash_vmx/ANTV.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo6() {
    playerInstance.setup({
        file: "https://dsgtq5sngxkde.cloudfront.net/live/eds/DAAITV/sa_dash_vmx/DAAITV.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo7() {
    playerInstance.setup({
        file: "https://dsgtq5sngxkde.cloudfront.net/live/eds/RTV/sa_dash_vmx/RTV.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo8() {
    playerInstance.setup({
        file: "https://dsgtq5sngxkde.cloudfront.net/live/eds/KompasTV/sa_dash_vmx/KompasTV.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo9() {
    playerInstance.setup({
        file: "https://dsgtq5sngxkde.cloudfront.net/live/eds/MNCnews-HDD/sa_dash_vmx/MNCnews-HDD.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}

function switchTo10() {
    playerInstance.setup({
        file: "https://dsgtq5sngxkde.cloudfront.net/live/eds/NickJr-HDD/sa_dash_vmx/NickJr-HDD.mpd",
        image: "images/video.jpg",
        type: "dash",
        autostart: true
    });
    playerInstance.on("audioTracks", function(event) {
        let audioTracks = playerInstance.getAudioTracks();
        console.log("Available Audio Tracks:", audioTracks);

        if (audioTracks.length > 1) {
            playerInstance.setCurrentAudioTrack(1);
            console.log("Switched to audio track 1");
        } else {
            console.log("No alternative audio tracks available.");
        }
    });
}
function switchToYT(videoID) {
    console.log("Switching to YouTube video ID:", videoID);
    // Exit fullscreen if active before switching
    if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.error("Error exiting fullscreen:", err));
    }

    // Replace content with Plyr player
    document.getElementById("jwplayerDiv").innerHTML = `
        <div class="plyr__video-embed" id="plyrPlayer">
            <iframe
                src="https://www.youtube.com/embed/${videoID}?autoplay=1&playsinline=1"
                allowfullscreen
                allow="autoplay"
            ></iframe>
        </div>
    `;

    // Initialize Plyr
    const player = new Plyr("#plyrPlayer", {
        autoplay: true,
        controls: ["play", "volume", "fullscreen"]
    });

    // Request fullscreen when the player is ready
    player.on("ready", () => {
        requestFullscreen(document.getElementById("plyrPlayer"));
    });
}


function resizeShakaPlayer() {
    let shakaContainer = document.getElementById("jwplayerDiv");
    let videoElement = document.getElementById("shakaPlayer");
    
    function adjustSize() {
        let width = shakaContainer.clientWidth;
        let height = width * (9 / 16); 
        videoElement.style.width = width + "px";
        videoElement.style.height = height + "px";
    }
    
    adjustSize();
    window.addEventListener("resize", adjustSize);
}

function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}
