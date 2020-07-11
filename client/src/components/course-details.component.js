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
                        {props.dateDescription}: {props.date}
                    </p>
                    <button onClick={() => props.handle(props.name)}>
                        Attempt
                    </button>
                </div>
            ) : null}
        </>
    );
}
