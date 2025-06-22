import React, { PureComponent, useEffect, useState } from 'react'
const ToggleParagraph = () => {
    const [isShowHide, setIsShowHide] = useState(true);
    const [countTime, setCountTime] = useState(0)
    const handlerShowHide = () => {
        setIsShowHide(!isShowHide)
        setCountTime(

            pre => pre + 1)
    }
    console.log(countTime)




    return (
        <>
            <h1>Count time :{countTime}</h1>
            <button onClick={() => { handlerShowHide() }}>{isShowHide === true ? "Show" : "Hide"}</button>
            {
                isShowHide && (<p>Hiểu cách dùng useState

                    Biết cách thay đổi state và render lại component

                    Áp dụng điều kiện hiển thị trong JSX</p>
                )}

        </>
    )
}

export default ToggleParagraph