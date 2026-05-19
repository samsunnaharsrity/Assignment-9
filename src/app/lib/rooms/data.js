export const fetchRoomData =async() =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms`)
    const data = await res.json()
    return data || []
}


// single data

export const fetchStudyRoomData =async() =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/visibleRooms`)
    const data = await res.json()
    return data || []
}