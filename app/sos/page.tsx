"use client"
import React, { useState } from 'react'

export default function SosPage() {

    const [status, setStatus] = useState('sos') // ['normal', 'sos'

    const renderNormalStatus = () => {
        return (
            <>
                <div className='rounded-none bg-white border flex items-center justify-center px-2 py-2 border-[#E0E0E0] w-3/5 flex items-center self-center ml-8'>
                    <h1 className='p-2'> สถานะเรือ</h1>
                    <h1 className='bg-[#A2FF86] text-sm rounded-full px-4 py-1'>ปกติ</h1>
                </div>

                <div className='flex flex-col items-center justify-center pt-24'>
                    <p className='text-[#303030] md:text-sm my-1'>เรือบูมรักพ่อหลวงสุดดวงใจ</p>
                    <p className='text-lg md:text-sm font-bold'>ปลอดภัยดี</p>
                </div>
            </>
        )
    }

    const renderSosStatus = () => {
        return (
            <>
                <div className='rounded-none bg-white border flex items-center justify-center px-2 py-2 border-[#E0E0E0] w-4/5 flex items-center self-center ml-8'>
                    <h1 className='p-2'> สถานะเรือ</h1>
                    <span className=''></span>
                    <h1 className='bg-[#FC2947] text-sm rounded-full px-4 py-1 text-white'>SOS</h1>
                </div>

                <div className='flex flex-col items-center justify-center p-24 w-full'>
                    <p className='text-[#303030] md:text-sm my-1 text-center'>เรือบูมรักพ่อหลวงสุดดวงใจ</p>
                    <p className='text-lg md:text-sm font-bold w-80 text-center'>กำลังส่งสัญญาณความช่วยเหลือ . . .</p>
                </div>

                <div className='relative flex items-center justify-center'>
                    <div className='w-44 h-44 bg-red-200 rounded-full absolute z-1 animate-ping'></div>
                    <button className='w-64 h-64 rounded-full bg-[#FC2947] flex items-center relative justify-center drop-shadow-lg'>
                        <p className='text-2xl text-white absolute z-2'>resolve</p>
                    </button>
                </div>
            </>

        )
    }


    return (
        <div className='h-screen w-96 flex flex-col items-center py-10'>
            <button className='self-start md:text-sm font-bold px-4 py-6'>black</button>
            {status === 'normal' ? renderNormalStatus() : renderSosStatus()}
        </div>
    )
}
