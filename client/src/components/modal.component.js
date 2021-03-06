import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 40;
    // const left = 40;

    return {
        top: `${top}%`,
        // left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`,
        // display: "block",
        position: "relative",
        display: "flex",
        "justify-content": "center",
        "align-item": "center",
        margin: "0 auto",
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <p id="simple-modal-description">
                Points earned: {props.points}{" "}
                <span>
                    <p>Completed on: {props.dateOfCompletion}</p>
                </span>
            </p>
        </div>
    );

    return (
        <div>
            <Button className="cards-btn" type="button" onClick={handleOpen}>
                Details
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
