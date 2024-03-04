'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
const baseURL = "https://boat-protector-backend.onrender.com/"
function RegisterPage() {
    const [isDone, setIsDone] = useState(false)
    const [boatName, setBoatName] = useState('')
    const [boatType, setBoatType] = useState('')
    const params = useParams<{ boatId: string }>()
    const handleRegister = () => {
        regisBoat(params.boatId, boatName, boatType).then(() => {
            setIsDone(true)
        })
    }

    async function regisBoat(boatId: string, boatName: string, boatType: string) {
        const body = {
            boatName: boatName,
            boatType: boatType
        }
        const url = `${baseURL}boats/${boatId}`
        await axios.patch(url, body)
    }

    if (!isDone) return (
        <div className="w-screen h-screen items-center justify-center flex flex-col">
            <div className="h-96 w-96 flex flex-col py-8 px-10 drop-shadow-lg rounded-lg bg-white border border-[#E0E0E0]">
                <h1 className="py-4 px-2 text-center">เพิ่มเรือเข้าระบบ</h1>
                <p className="py-1 px-2 self-start">ชื่อเรือ</p>
                <input type="text" placeholder="ชื่อ" className="input input-bordered w-full max-w-xs" onChange={(e) => {
                    setBoatName(e.target.value)
                }} />
                <p className="py-1 px-2 self-start">ประเภทของเรือ</p>
                <input type="text" placeholder="ประเภท" className="input input-bordered w-full max-w-xs mb-4" onChange={(e) => {
                    setBoatType(e.target.value)
                }} />
                <button onClick={handleRegister} className="btn btn-wide w-full">เพิ่ม</button>
            </div>
        </div>
    )
    else return (
        <div className="w-screen h-screen items-center justify-center flex flex-col">
            <h1 className='text-8xl'>ลงทะเบียนเรือเสร็จสิ้น ท่านสามารถปิดเพจนี้ได้เลย</h1>
        </div>
    )
}

export default RegisterPage