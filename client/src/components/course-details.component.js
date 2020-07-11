import React from "react";
import Modal from "./modal.component";
import Button from "@material-ui/core/Button";

export default function CourseDetails(props) {
    return (
        <>
            <div className="cards">
                <p className="cards-empty">{props.message}</p>

                {props.flag === true ? (
                    <div>
                        <p>{props.name}</p>

                        {props.for === "completed" ? (
                            <Modal
                                points={props.points}
                                dateOfCompletion={props.date.toString()}
                            />
                        ) : null}

                        {props.for === "attempted" ? (
                            <>
                                <p>
                                    {props.dateDescription}:{" "}
                                    {props.date.toString()}
                                </p>
                                <Button
                                    onClick={() =>
                                        props.clickAttempt(props.name)
                                    }
                                >
                                    Complete
                                </Button>
                            </>
                        ) : null}

                        {props.for === "todo" ? (
                            <>
                                <p>
                                    {props.dateDescription}:{" "}
                                    {props.date.toString()}
                                </p>
                                <Button
                                    onClick={() => props.clickTodo(props.name)}
                                >
                                    Attempt
                                </Button>
                            </>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </>
    );
}
