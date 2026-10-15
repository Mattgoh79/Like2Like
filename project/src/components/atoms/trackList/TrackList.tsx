import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import Styles from './TrackList.module.scss';

type TrackListProps = {

    slot: string
}

export const TrackList = ({slot}: TrackListProps) => {

    const allTracks = JSON.parse(sessionStorage.getItem(slot) ?? "[]") ;
    

    // if (loading) {
    //     return <div>Loading tracks...</div>;
    // }

    return (
        <div className={Styles.entireTrackSection}>
            <h2 className={Styles.header}>Track List ({allTracks.length})</h2>
            {allTracks.map((item: { track: { id: any; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; artists: { name: string; }[]; }; }, index: any) => (
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
    );
};