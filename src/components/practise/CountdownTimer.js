import { cleanup } from '@testing-library/react';
import React, { useEffect, useState } from 'react'

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(10);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {

                    //nếu không có dòng này thì giá trị prev vẫn cứ chạy nên phải clear interval đi
                    clearInterval(intervalId);

                    return 0;
                }
                return prev - 1
            })
        }, 1000);

        //khi bị hủy hoặc có giá trị effect thì sẽ chạy return này 
        return () => {
            clearInterval(intervalId);
        }
    }, [])
    return (
        <div>
            CountdownTimer
            <h2>{timeLeft}</h2>
        </div>


    )
}

export default CountdownTimer