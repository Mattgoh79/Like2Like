import { useEffect, useState } from "react";
import { allTracksPromise } from "../script";
import Styles from './TrackList.module.scss';

export const TrackList = () => {
    const [allTracks, setAllTracks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        allTracksPromise
            .then((tracks) => {
                console.log("Tracks received:", tracks);

                setAllTracks(tracks);
            })
            .catch((error) => {
                console.error("Failed to load tracks:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading tracks...</div>;
    }

    return (
        <div className={Styles.entireTrackSection}>
            <div>   
            <h2 className={Styles.header}>Track List ({allTracks.length})</h2>
            {allTracks.map((item, index) => (
                <div className={Styles.eachTrack} key={item.track?.id ?? index}>
                    <p className={Styles.trackName}>{item.track?.name}</p>

                    <p className={Styles.artistName}>
                        {item.track?.artists
                            ?.map((artist: { name: string }) => artist.name)
                            .join(", ")}
                    </p>
                </div>
            ))}
            </div>
        </div>
    );
};