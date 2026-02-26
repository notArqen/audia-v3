const express = require('express');
const cors = require('cors');
const DiscordRPC = require('discord-rpc');

const app = express();
const PORT = 6969;

// The Client ID for your Discord Rich Presence application
// Note: The user will need to provide their own Client ID or we can try to use a generic one they set up
const clientId = '1344070243407986708'; // Example ID, please create one in Discord Developer Portal if you haven't!
const rpc = new DiscordRPC.Client({ transport: 'ipc' });

app.use(cors());
app.use(express.json());

let rpcReady = false;

rpc.on('ready', () => {
    console.log(`Audia RPC ready! Connected to Discord as ${rpc.user.username}`);
    rpcReady = true;

    // Set initial initial presence
    setPresence({
        details: 'Listening on Audia',
        state: 'Starting up...',
        startTimestamp: Date.now(),
        largeImageKey: 'audia_logo', // Fallback, we'll use URLs if provided
        largeImageText: 'Audia',
        smallImageKey: 'playing',
        smallImageText: 'Playing'
    });
});

async function setPresence(data) {
    if (!rpcReady) return;

    try {
        await rpc.setActivity(data);
    } catch (err) {
        console.error('Failed to set RPC activity:', err);
    }
}

app.post('/update', (req, res) => {
    if (!rpcReady) {
        return res.status(503).json({ error: 'RPC not ready yet.' });
    }

    const { title, artist, album, albumArtUrl, currentTime, duration, isPlaying } = req.body;

    if (!isPlaying) {
        // Clear or show paused state
        setPresence({
            details: title || 'Paused',
            state: artist || 'Audia',
            largeImageKey: albumArtUrl || 'audia_logo',
            largeImageText: album || 'Audia',
            smallImageKey: 'paused',
            smallImageText: 'Paused'
        });
        return res.json({ success: true, state: 'paused' });
    }

    // Calculate timestamps for accurate elapsed/remaining in Discord
    const startTimestamp = Date.now() - (currentTime * 1000);
    const remainingSeconds = duration - currentTime;
    const endTimestamp = Date.now() + (remainingSeconds * 1000);

    const presenceData = {
        details: title || 'Unknown Track',
        state: artist || 'Unknown Artist',
        startTimestamp: Math.floor(startTimestamp),
        endTimestamp: Math.floor(endTimestamp),
        largeImageKey: albumArtUrl || 'audia_logo',
        largeImageText: album || 'Audia',
        smallImageKey: 'playing',
        smallImageText: 'Listening on Audia'
    };

    setPresence(presenceData);
    res.json({ success: true, state: 'playing' });
});

// Auto-reconnect logic
function connectRPC() {
    console.log('Attempting to connect to Discord...');
    rpc.login({ clientId }).catch(err => {
        console.error('RPC Login failed:', err.message);
        console.log('Retrying in 10 seconds...');
        setTimeout(connectRPC, 10000);
    });
}

connectRPC();

app.listen(PORT, () => {
    console.log(`Audia Companion Server running on http://localhost:${PORT}`);
});
