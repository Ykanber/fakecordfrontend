import React, {type ReactNode} from "react";
import ReactDOM from "react-dom";

interface PopUpProps {
    visible: boolean;
    onClose: () => void;
    children: ReactNode;
}


const PopUp: React.FC<PopUpProps> = ({visible, onClose, children}) => {

    if (!visible) return null;


    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div style={{background: "white", padding: 20, borderRadius: 8}}
                 onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>


        </div>,
        document.body
    );
}


export default PopUp;