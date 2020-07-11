import React from "react";

export default function CourseDetails(props) {
    return (
        <>
            <p>{props.message}</p>
            {props.flag === true ? (
                <div>
                    <p>{props.name}</p>
                    <p>{props.points}</p>
                    <p>
                        {props.dateDescription}: {props.date.toString()}
                    </p>
                    {props.for === "completed" ? (
                        <button>Details</button>
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
