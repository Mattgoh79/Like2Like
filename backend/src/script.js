
const clientId = "8a57f765adbf4334abf64a2e370ec977";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
let offset = 0;
let allSongs = [];

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const tracks = await fetchTracks(accessToken, 50, 0);
    trackFetchLoop(accessToken, offset, allSongs);
    populateUI(profile, tracks);
}


export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    console.log(verifier);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://127.0.0.1:5173/callback");
    params.append("scope", "user-read-private user-read-email user-library-read"); //so this is like, what things are you accessing
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");
    if (!verifier) {
        throw new Error("No verifier in localStorage - did you reload after redirect, or is this a stale/reused code?");
    }

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://127.0.0.1:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const data = await result.json();
    if (!result.ok) {
        console.error("Token exchange failed:", data);
        throw new Error(data.error_description || data.error);
    }
    return data.access_token;
}

async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    console.log(result); // Fixed: was `profile` which doesn't exist here

    return await result.json();
}


async function trackFetchLoop(token, offset, allSongs) {
    //so i create a json, each  new loop, will append to that list, .json() it, that json will be what i return to be rendered!!
    let data = fetchTracks(token, 50, offset);

    allSongs.push(data);
    console.log(allSongs.name);
    
    offset += 50;
    console.log(offset);
    if(offset<500){
        trackFetchLoop(token, offset, allSongs)
    }
    else{
        return;
    }
}


async function fetchTracks(token, limit = 50, offset) { //so if i want to go through their whole library. then maybe i can loop it. fuck i have like 7k songs.
                                                // thats like 1400 loops?
    const result = await fetch(`https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await result.json();
    if (!result.ok) {
        console.error("Tracks error:", result.status, data);
        throw new Error(data.error?.message || `Failed: ${result.status}`);
    }
    console.log(data);
    return data;
}


function populateUI(profile, tracks) {
    // document.getElementById("displayName").innerText = profile.display_name;
    // if (profile.images[0]) {
    //     const profileImage = new Image(200, 200);
    //     profileImage.src = profile.images[0].url;
    //     document.getElementById("avatar").appendChild(profileImage);
    //     document.getElementById("imgUrl").innerText = profile.images[0].url;
    // }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
    const list = document.getElementById("tracks");
    tracks.items.forEach(({ track }) => {
        const li = document.createElement("li");
        li.textContent = `${track.name} — ${track.artists.map(a => a.name).join(", ")}`;
        list.appendChild(li);
    });
}