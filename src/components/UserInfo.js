import React, { Component, useState } from "react";

const UserInfo = (props) => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handlerOnSubmit = (event) => {
        event.preventDefault();
        props.handlerAddNewUser({
            id: Math.round(Math.random() * 100) + '-random',
            name: name,
            age: age,
        })
    }

    const handlerOnInputName = (event) => {
        setName(event.target.value)
    }

    const handlerOnInputAge = (event) => {
        setAge(event.target.value)
    }

    return (
        <>
            My name is {name} <br></br>and i'm {age} years old
            <br></br>
            <form
                onSubmit={(event) => {
                    handlerOnSubmit(event);
                }}
            >
                Your name:
                <input
                    type="text"
                    name="name"
                    value={name}
                    onInput={(e) => {
                        handlerOnInputName(e);
                    }}
                ></input>
                <br />
                Your age:
                <input
                    type="text"
                    name="age"
                    value={age}
                    onInput={(e) => {
                        handlerOnInputAge(e);
                    }}
                />
                <br />
                <button>Submit</button>
            </form>
        </>
    );
};
export default UserInfo;
