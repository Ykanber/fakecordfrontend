import React, {type ReactNode} from "react";
import ReactDOM from "react-dom";

interface PopUpProps {
    visible: boolean;
    onClose: () => void;
    overlayClassName?: string;
    contentClassName?: string;
    children: ReactNode;
}


const PopUp: React.FC<PopUpProps> = ({
                                         visible, onClose, overlayClassName = "", contentClassName = "", children
                                     }) => {

    if (!visible) return null;


    return ReactDOM.createPortal(
        <div
            className={`popup-overlay ${overlayClassName}`}
            onClick={onClose}
        >
            <div
                className={`popup-content ${contentClassName}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>


        </div>,
        document.body
    );
}


export default PopUp;