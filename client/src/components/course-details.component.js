import React from "react";
import moment from "moment";

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
                </div>
            ) : null}
        </>
    );
}
