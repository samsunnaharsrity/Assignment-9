
const fetchDetailsData = async(id) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROOMS_DATA_URL}/rooms/${id}`)
    const data = await res.json()
    return data || {};
}

export default async function RoomsDetailsPage ({params}) {

const {data} = await params;
const rooms = await fetchDetailsData(data)
console.log(rooms);


    return (
        <div>
            my rooms details
        </div>
    );
}

// export default RoomsDetailsPage;
