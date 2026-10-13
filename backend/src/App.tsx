import { TrackList } from "./components/TrackList";

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
            <span id="avatar"></span>
            <ul>
                <li>User ID: <span id="id"></span></li>
                <li>Email: <span id="email"></span></li>
                <li>Spotify URI: <a id="uri" href="#"></a></li>
                <li>Link: <a id="url" href="#"></a></li>
                <li>Profile Image: <span id="imgUrl"></span></li>
                <li>Songs: <span id="tracks"></span></li>
            </ul>
            <TrackList></TrackList>
        </section>
    );
};

export default App;
