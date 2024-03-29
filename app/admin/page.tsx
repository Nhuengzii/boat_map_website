"use client"
import { faIdBadge, faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, Marker, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SosPage from '../Sos';
import Image from 'next/image'


const center = {
    lat: 13.851070,
    lng: 100.577713
};

const apiKey = process.env.NEXT_PUBLIC_MAP_KEY as string;
const baseURL = "https://boat-protector-backend.onrender.com/";

type Boat = {
    boatID: string,
    boatName: string,
    boatType: string,
    status: "normal" | "sos" | "crash",
    location: {
        latitude: number,
        longitude: number,
    }
}


function BoatTrackingMap() {
    const [boats, setBoats] = useState<Boat[]>([])
    const [selectedBoat, setSelectedBoat] = useState<Boat | null>(null)
    const [loading, setLoading] = useState(true)
    const [isClickStatus, setIsClickStatus] = useState(false)
    const [isCheckStatus, setIsCheckStatus] = useState(false)
    useEffect(() => {
        async function getBoat() {
            const url = baseURL + "boats"
            const fetchedBoats = await axios.get<{ boats: Boat[] }>(url)
            // console.log(JSON.stringify(fetchedBoats.data.boats.filter(p => p.location.latitude != null), null, 2))
            setBoats(fetchedBoats.data.boats.filter(p => {
                if (p.location.latitude == null || p.location.longitude == null) {
                    return false
                }
                if (p.boatName == null || p.boatType == null) {
                    return false
                }
                return true
            }))
        }
        const intv = setInterval(() => {
            getBoat()
        }, 2 * 1000)
        return () => {
            clearInterval(intv)
        }
    }, [])
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    })

    const [map, setMap] = useState(null)


    const onLoad = React.useCallback(function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    const handleClickedStatus = () => {
        setIsClickStatus(!isClickStatus)
    }
    const renderEmergencyEffect = () => {
        return (
            <div className='absolute w-16 h-16 animate-ping bg-red-400 rounded-full'></div>
        )
    }

    const renderShowStatus = () => {
        return (
            <>
                <button onClick={handleClickedStatus} className='btn'>X</button>
                <SosPage status={selectedBoat!.status} boatName={selectedBoat!.boatName} boatId={selectedBoat!.boatID} closeSOSPage={handleClickedStatus} />
            </>
        )
    }

    const renderInformation = () => {
        return (
            <>
                <div className='my-4 h-14 flex items-center justify-between'>
                    <button onClick={handleClickedStatus} className={`btn ${selectedBoat?.status == "normal" ? "bg-[#B0EACD]" : "bg-red-200"} border border-[#202020] w-3/5 flex h-full items-center self-center ml-8`}>
                        <h1> สถานะเรือ</h1>
                        <h1 className={`${selectedBoat?.status == "normal" ? "bg-[#A2FF86]" : "bg-red-400"} rounded-full px-4 py-2`}> {selectedBoat?.status}</h1>
                    </button>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle mr-4">✕</button>
                    </form>
                </div>
                <div className='flex flex-col py-2'>
                    <div className='flex flex-row items-center py-2 pt-8'>
                        <h1 className='text-green-500 mx-4'>ข้อมูลตัวเรือ</h1>
                        <FontAwesomeIcon icon={faIdBadge} size="2x" />
                    </div>
                    <div className='border-2 border-[#E0E0E0] px-6 py-4 '>
                        <div className='flex'>
                            <h1 className='py-0.5'>ชื่อเรือ</h1>
                            <h1 className='py-0.5 pl-10'>{selectedBoat?.boatName}</h1>
                        </div>
                        <div className='flex'>
                            <h1 className='py-0.5'>ประเภทของเรือ</h1>
                            <h1 className='py-0.5 pl-10'>{selectedBoat?.boatType}</h1>
                        </div>
                    </div>
                    <div className='flex flex-row items-center py-2 pt-8'>
                        <h1 className='text-green-500 mx-4'>ตำแหน่งเรือ</h1>
                        <FontAwesomeIcon icon={faLocation} size="2x" />
                    </div>
                    <div className='border-[#E0E0E0] border-2 px-6 py-4'>
                        <div className='flex py-0.5'>
                            <h1 className='pr-16'>ลองติจูด</h1>
                            <h1>{selectedBoat?.location.longitude}</h1>
                        </div>
                        <div className='flex py-0.5'>
                            <h1 className='pr-16'>ละติจูด</h1>
                            <h1>{selectedBoat?.location.latitude}</h1>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return isLoaded ? (
        <div>
            <dialog id="my_modal_3" className="modal flex">
                <div className="modal-box p-0 py-4 h-    const renderStatus = () => {

}
screen">
                    {isClickStatus ? renderShowStatus() : renderInformation()}
                </div>
            </dialog>
            <div className='w-full h-full flex items-center justify-center'>
                <GoogleMap
                    mapContainerStyle={{
                        height: "100vh",
                        width: "100vh",
                    }}
                    center={center}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    {boats.map(b => {
                        return (
                            <OverlayView
                                key={b.boatID}
                                position={{ lat: b.location.latitude, lng: b.location.longitude }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                                <button className='relative flex items-center justify-center' onClick={() => {
                                (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()
                                setSelectedBoat(b)
                            }}>
                                    {renderEmergencyEffect() ? b.status !== "normal" : <></>}
                                    <Image
                                        className='rounded-full'
                                        src="/boat.avif"
                                        width={80}
                                        height={80}
                                        alt="Picture of the author"
                                    />
                                </button>
                            </OverlayView>
                        )
                    })}
                </GoogleMap>
            </div>
        </div>
    ) : <></>
}

export default React.memo(BoatTrackingMap)


