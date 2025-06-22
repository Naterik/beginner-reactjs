import React, { Component, useEffect, useState } from "react";
import "./DisplayInfo.scss";

const DisplayInfo = (props) => {
    const { listUser } = props;
    const [isShowHide, setIsShowHide] = useState(true)

    const handlerShowHide = () => {
        setIsShowHide(!isShowHide)
    }

    useEffect(() => {
        if (listUser.length === 10) {
            alert("All all set")

        }
        console.log(">> effecting")
    }, [listUser])
    console.log(">> rendering")
    return (

        <div className="display-container">
            <button onClick={() => (handlerShowHide())}>{isShowHide === true ? "Show" : "Hide"}</button>
            {isShowHide &&
                <div>
                    {listUser.map((e, index) => {
                        return (
                            <div key={e.id} className={+e.age > 18 ? "green" : "red"}>
                                <div> My name's {e.name}</div>
                                <div> My age's {e.age}</div>
                                <button
                                    onClick={() => {
                                        props.handlerDeleteUser(e.id);
                                    }}
                                >
                                    Delete
                                </button>
                                <hr />
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
};
export default DisplayInfo;
