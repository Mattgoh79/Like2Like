import { NextUserButton } from "./components/atoms/nextUserButton";
import { TrackList } from "./components/atoms/trackList/TrackList";
import { addNextUser, compareLibraries } from "./utils/allFrontEndFunctionsForNow";

const App = () => {
    const renderError = (error: Error) => {
        return (
            <div>
                <h1>Something went wrong</h1>
                <p>{error.message}</p>
            </div>
        );
    };

    
    return (
        <section id="profile">
            <h2>Logged in as <span id="displayName"></span></h2>

            <NextUserButton onClick={addNextUser} children="Add Next User"></NextUserButton>
            <NextUserButton onClick={compareLibraries} children="compare library's"></NextUserButton>
            <div>
                <TrackList slot="spotifyTracks"></TrackList>
                <TrackList slot="spotifyTracks2"></TrackList>
                {/* make this conditional on whether spotifyTracks2 exists or not */}
            </div>
        </section>
    );
};

export default App;
