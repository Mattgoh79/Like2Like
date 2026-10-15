import { useEffect, useState } from "react";
import { TrackList } from "./components/atoms/trackList/TrackList";

const clientId = "8a57f765adbf4334abf64a2e370ec977";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

let offset = 0;

if (code) {
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );

}
else if (sessionStorage.getItem('spotifyTracks') == null) {
    {
        redirectToAuthCodeFlow(clientId, "spotifyTracks");
        getLibrary();
}
}

async function getLibrary(){
    const slot = sessionStorage.getItem("pending") ?? "spotifyTracks";
    //so if its the first time the promise is being called,, pendingSlot wouldnt exist
    //therefore it would make spotifyTracks

    if (code) { //once sign in do this
        const accessToken = await getAccessToken(clientId, code);
        const tracks = await trackFetchLoop(accessToken, 0);
        sessionStorage.setItem(slot, JSON.stringify(tracks))
        sessionStorage.removeItem("pending");
    } 
    else if (!sessionStorage.getItem("spotifyTracks")) {  //if havent sign in yet
        await redirectToAuthCodeFlow(clientId, "spotifyTracks");
        console.log("FIRST TIME LOGGING IN!!!!");
        return [];
    }

}

export async function trackFetchLoop(token: any, offset: number) {
    //so i create a json, each  new loop, will append to that list, .json() it, that json will be what i return to be rendered!!

    const allTracks: any[] = [];

    while(offset<100){
        const data = await fetchTracks(token, 50, offset);
        allTracks.push(...data.items);
        offset += 50;

        if(offset >= data.total){
            break;
        }

    }

    return allTracks;

}


async function fetchTracks(token: any, limit = 50, offset: any) { // GET request for the user's Liked Songs. Fetches 50 songs per call 
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

export async function redirectToAuthCodeFlow(clientId: string, slot: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);
    sessionStorage.setItem("pending", slot);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://127.0.0.1:5173/callback");
    params.append("scope", "user-read-private user-read-email user-library-read"); //so this is like, what things are you accessing
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    params.append("show_dialog", "true")

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;

    //add promise?


}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string | undefined) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId: string, code: string) {
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

async function fetchProfile(token: any) {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    console.log(result); // Fixed: was `profile` which doesn't exist here

    return await result.json();
}
