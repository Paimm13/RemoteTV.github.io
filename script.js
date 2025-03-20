var playerInstance = jwplayer("jwplayerDiv");

// Initialize default player
playerInstance.setup({
    file: "https://d1abp075u76pbq.cloudfront.net/live/eds/RCTI-DD/sa_dash_vmx/RCTI-DD.mpd",
    image: "images/video.jpg",
    type: "dash",
    drm: {
        "clearkey": {
            "keyId": "9ba3e153ef8956d6e2b0684fcf74f58f",
            "key": "dbc28cb5c6426080f984a5b6d436bb30"
        }
    },
    autostart: true
});

// Helper function for Shaka Player
function initShakaPlayer(manifestUri, headers) {
    document.getElementById("jwplayerDiv").innerHTML = '<video id="shakaPlayer" controls autoplay></video>';
    const video = document.getElementById("shakaPlayer");
    
    shaka.polyfill.installAll();
    
    if (shaka.Player.isBrowserSupported()) {
        const player = new shaka.Player(video);
        
        player.getNetworkingEngine().registerRequestFilter((type, request) => {
            if (type === shaka.net.NetworkingEngine.RequestType.MANIFEST ||
                type === shaka.net.NetworkingEngine.RequestType.SEGMENT) {
                Object.entries(headers).forEach(([key, value]) => {
                    request.headers[key] = value;
                });
            }
        });

        player.load(manifestUri).then(() => {
            console.log("Stream loaded successfully");
            resizeShakaPlayer();
        }).catch(console.error);
        
    } else {
        console.error("Shaka Player not supported");
    }
}

// Channel Switching Functions
function switchToRCTI() {
    playerInstance.setup({
        file: "https://d1abp075u76pbq.cloudfront.net/live/eds/RCTI-DD/sa_dash_vmx/RCTI-DD.mpd",
        image: "images/video.jpg",
        type: "dash",
        drm: {
            clearkey: {
                keyId: "9ba3e153ef8956d6e2b0684fcf74f58f",
                key: "dbc28cb5c6426080f984a5b6d436bb30"
            }
        },
        autostart: true
    });
}

function switchToMNCTV() {
    playerInstance.setup({
        file: "https://cempedak-live-cdn.mncnow.id/live/eds/MNCTV-HD/sa_dash_vmx/MNCTV-HD.mpd",
        image: "images/video.jpg",
        type: "dash",
        drm: {
            widevine: {
                url: "https://mrpw.ptmnc01.verspective.net/?deviceId=MDA5MmI1NjctOWMyMS0zNDYyLTk0NDAtODM5NGQ1ZjdlZWRi"
            }
        },
        autostart: true
    });
}

function switchToTransTV() {
    initShakaPlayer("https://video.detik.com/transtv/smil:transtv.smil/index.m3u8", {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    });
}

function switchToSCTV() {
    initShakaPlayer("https://app.mt2dc.com/misc?id=204", {
        "User-Agent": "VidioPlayer/4.3.0-WITH_ADS",
        "Referer": "https://vidio.com"
    });
}

function switchToChampionsTV1() {
    initShakaPlayer("https://app.mt2dc.com/misc?id=6685", {
        "User-Agent": "VidioPlayer/4.3.0-WITH_ADS"
    });
}

function switchToHBO() {
    playerInstance.setup({
        file: "https://cdn01-telkomsel-01.akamaized.net/Content/DASH/Live/channel(92c7b96a-33fc-4899-a032-50ae0fbc9257)/manifest.mpd",
        type: "dash",
        drm: {
            widevine: {
                url: "https://ms.mayvee.workers.dev/hbohd/license-proxy-widevine/cenc/?specConform=true"
            }
        },
        autostart: true
    });
}

function switchToCinemax() {
    playerInstance.setup({
        file: "https://cdnjkt4.transvision.co.id:1000/live/master/1/4028c6856c3db2cc016cdbfc4a1934bf/manifest.mpd",
        dash: {
            dashConfiguration: {
                xhrSetup: function(xhr) {
                    xhr.setRequestHeader("dt-custom-data", "eyJ1c2VySWQiOiJyZWFjdC1qdy1wbGF5ZXIiLCJzZXNzaW9uSWQiOiIxMjM0NTY3ODkiLCJtZXJjaGFudCI6ImdpaXRkX3RyYW5zdmlzaW9uIn0=");
                }
            }
        },
        drm: {
            widevine: {
                url: "https://lic-cubmux.konslet.workers.dev/4rr0w/play.wv"
            }
        },
        autostart: true
    });
}

// YouTube Player Functions
function switchToYT(videoID) {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }

    document.getElementById("jwplayerDiv").innerHTML = `
        <div class="plyr__video-embed" id="plyrPlayer">
            <iframe src="https://www.youtube.com/embed/${videoID}?autoplay=1&playsinline=1"
                allowfullscreen allow="autoplay"></iframe>
        </div>`;

    new Plyr("#plyrPlayer", {
        autoplay: true,
        controls: ["play", "volume", "fullscreen"]
    }).on("ready", () => {
        requestFullscreen(document.getElementById("plyrPlayer"));
    });
}

// Utility Functions
function resizeShakaPlayer() {
    const container = document.getElementById("jwplayerDiv");
    const video = document.getElementById("shakaPlayer");
    
    const resize = () => {
        video.style.width = container.clientWidth + "px";
        video.style.height = (container.clientWidth * 9/16) + "px";
    };
    
    resize();
    window.addEventListener("resize", resize);
}

function requestFullscreen(element) {
    if (element.requestFullscreen) element.requestFullscreen();
    else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
    else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
    else if (element.msRequestFullscreen) element.msRequestFullscreen();
}
