import { allTracksPromise2 } from "../script";

const addNextUser = () => {
    allTracksPromise2
        .then((tracks) => {
            console.log("Tracks:", tracks);
        })
        .catch((error) => {
            console.error("Failed to load tracks:", error);
        });
};

const compareLibraries = () => {
  const a = JSON.parse(sessionStorage.getItem('spotifyTracks') ?? '[]');
  const b = JSON.parse(sessionStorage.getItem('spotifyTracks2') ?? '[]');

  const idsB = new Set(b.map((item: { id: string }) => item.id));
  const matches = a.filter((item: { id: string }) => idsB.has(item.id));

  sessionStorage.setItem('matches', JSON.stringify(matches));
  console.log(matches)
  return matches;
};


export {
        addNextUser,
        compareLibraries}