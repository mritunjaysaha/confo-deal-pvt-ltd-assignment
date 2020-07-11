import React from "react";
import Modal from "./modal.component";
export default function CourseDetails(props) {
    return (
        <>
            <p>{props.message}</p>
            {props.flag === true ? (
                <div>
                    <p>{props.name}</p>
                    <p>
                        {props.dateDescription}: {props.date.toString()}
                    </p>
                    {props.for === "completed" ? (
                        <Modal
                            points={props.points}
                            dateOfCompletion={props.date.toString()}
                        />
                    ) : null}

                    {props.for === "attempted" ? (
                        <button onClick={() => props.clickAttempt(props.name)}>
                            Complete
                        </button>
                    ) : null}

                    {props.for === "todo" ? (
                        <button onClick={() => props.clickTodo(props.name)}>
                            Attempt
                        </button>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}
