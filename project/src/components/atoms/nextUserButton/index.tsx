
import styles from './NextUserButton.module.scss';
import { allTracksPromise2 } from "../../../script";

type buttonProps = {
    onClick : () => void;
    children: string;
}



export const NextUserButton= ({onClick, children} : buttonProps)=> {


    return(
        <div>
            <button className={styles.button} 
    //         onClick={() => {
    //         allTracksPromise2.then((tracks) => {
    //             console.log(tracks);
    //         });
    // }}
                onClick= {onClick}>
                {children}
            </button>

        </div>

    )

}