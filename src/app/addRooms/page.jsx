import React from 'react';

const AddRoomsPage = () => {
    return (
        <div>
            <div className="max-w-5xl mx-auto my-10 border rounded-xl p-8 shadow-sm">
  <div className="mb-8">
    <h2 className="text-3xl font-bold">Add New Study Room</h2>
    <p className="text-gray-500 text-sm">
      Fill in the details below to list your room.
    </p>
  </div>

  <form className="space-y-5">
    <div>
      <label className="font-medium">Room Name</label>
      <input
        type="text"
        placeholder="Enter room name"
        className="w-full border rounded-md px-4 py-2 mt-1"
      />
    </div>

    <div>
      <label className="font-medium">Description</label>
      <textarea
        rows={4}
        placeholder="Describe your room"
        className="w-full border rounded-md px-4 py-2 mt-1"
      />
    </div>

    <div>
      <label className="font-medium">Image URL</label>
      <input
        type="text"
        placeholder="Enter image URL"
        className="w-full border rounded-md px-4 py-2 mt-1"
      />
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      <div>
        <label className="font-medium">Floor</label>
        <input
          type="text"
          placeholder="Floor No"
          className="w-full border rounded-md px-4 py-2 mt-1"
        />
      </div>

      <div>
        <label className="font-medium">Capacity</label>
        <input
          type="number"
          placeholder="Capacity"
          className="w-full border rounded-md px-4 py-2 mt-1"
        />
      </div>

      <div>
        <label className="font-medium">Hourly Price</label>
        <input
          type="number"
          placeholder="$ / hr"
          className="w-full border rounded-md px-4 py-2 mt-1"
        />
      </div>
    </div>


                    {/* Amenities */}


    <div>
      <label className="font-medium mb-2 block">Amenities</label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <label className="flex items-center gap-2">
          <input type="checkbox" />
          WiFi
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Whiteboard
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Projector
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          AC
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Coffee Access
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Noise Cancellation
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Smart TV
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Charging Ports
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Premium Chairs
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Bookshelf
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" />
          Soundproof
        </label>


      </div>
    </div>

    <button className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600">
      Add Room
    </button>
  </form>
</div>
        </div>
    );
}

export default AddRoomsPage;
