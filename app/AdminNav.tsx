"use client"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function AdminNav() {
    return (
        <div className="w-full flex justify-center pb-2 drop-shadow-lg">
            <button className="btn bg-green-300 flex flex-row">
                <FontAwesomeIcon icon={faPlus} size="xl" />
                <p>เพิ่มเรือเข้าระบบ</p>
            </button>
        </div>
    )
}

export default AdminNav