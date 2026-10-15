
// const addNextUser = () => {

import { redirectToAuthCodeFlow } from "../script";

const clientId = "8a57f765adbf4334abf64a2e370ec977";
const addNextUser = () => {
    redirectToAuthCodeFlow(clientId, "spotifyTracks2")
}


const compareLibraries = () => {
  const a = JSON.parse(sessionStorage.getItem('spotifyTracks') ?? '[]');
  const b = JSON.parse(sessionStorage.getItem('spotifyTracks2') ?? '[]');

    console.log(a);
    console.log(b); //ok so a and b is correct, but its giving only a


    const idsB = new Set(
        b.map((item: { track: { id: string } }) => item.track?.id)
    );

    const matches = a.filter(
        (item: { track: { id: string } }) => idsB.has(item.track?.id)
    );

    sessionStorage.setItem("matches", JSON.stringify(matches));

    console.log("Matching tracks:", matches);

    return matches;
};


export {
        addNextUser,
        compareLibraries
    }
