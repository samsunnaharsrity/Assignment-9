export const fetchRoomData =async() =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms` ,
        {cache: 'no-store'}
    )
    const data = await res.json()
    return data || []
}


// single data

export const fetchStudyRoomData =async() =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/visibleRooms`,
         {cache: 'no-store'}
    )
    const data = await res.json()
    return data || []
}