"use client"

import React, { useEffect, useState } from 'react';
function RegisterPage() {

    const [IsclickDone, setIsClickDone] = useState(false)

    const handleRegister = () => {
        alert("Handle Register")
    }


    return (
        <div className="w-screen h-screen items-center justify-center flex flex-col">
            <div className="h-96 w-96 flex flex-col py-8 px-10 drop-shadow-lg rounded-lg bg-white border border-[#E0E0E0]">
                <h1 className="py-4 px-2 text-center">เพิ่มเรือเข้าระบบ</h1>
                <p className="py-1 px-2 self-start">ชื่อเรือ</p>
                <input type="text" placeholder="ชื่อ" className="input input-bordered w-full max-w-xs" />
                <p className="py-1 px-2 self-start">ประเภทของเรือ</p>
                <input type="text" placeholder="ประเภท" className="input input-bordered w-full max-w-xs mb-4" />
                <button onClick={handleRegister} className="btn btn-wide w-full">เพิ่ม</button>
            </div>
        </div>
    )
}

export default RegisterPage