import { NextUserButton } from "./components/atoms/nextUserButton";
import { TrackList } from "./components/atoms/trackList/TrackList";
import { allTracksPromise2 } from "./script";
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
            <TrackList></TrackList>
        </section>
    );
};

export default App;
