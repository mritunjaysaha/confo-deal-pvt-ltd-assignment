import React from "react";
import moment from "moment";

export default function CourseDetails(props) {
    return (
        <>
            <p>{props.name}</p>
            <p>{props.points}</p>
            <p>
                {props.dateDescription}: {moment(props.date).format("LL")}
            </p>
        </>
    );
}
