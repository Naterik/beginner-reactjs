import React, { useState } from "react";
import DisplayInfo from "./DisplayInfo";
import UserInfo from "./UserInfo";



const MyComponent = () => {
    const [listUser, setListUser] = useState([
        { id: 1, name: "Khuong", age: 21 },
        { id: 2, name: "Nateri", age: 10 },
        { id: 3, name: "John", age: 30 }
    ])
    const handlerAddNewUser = (user) => {
        setListUser([user, ...listUser])
    }
    const handlerDeleteUser = (user) => {
        setListUser(listUser.filter((e) => e.id !== user))
    }
    return (
        <>
            <UserInfo
                handlerAddNewUser={handlerAddNewUser}
            />
            <hr />
            <DisplayInfo
                listUser={listUser}
                handlerDeleteUser={handlerDeleteUser}
            />
        </>
    )
}

export default MyComponent