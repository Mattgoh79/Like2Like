
import styles from './nextUserButton.module.scss';

type buttonProps = {
    onClick : () => void;
    children: string;
}

export const NextUserButton= ({onClick, children} : buttonProps)=> {


    return(
        <div>
            <button className={styles.button} 
                onClick= {onClick}>
                {children}
            </button>

        </div>

    )

}