import { useState } from "react";
import { assets, facilityIcons, roomsDummyData } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../StarRating";

/* Checkbox Component */
const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

/* Radio Button Component */
const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = [
    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite",
  ];

  const priceRanges = [
    "0 to 500",
    "500 to 1000",
    "1000 to 2000",
    "2000 to 3000",
  ];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const handleNavigate = (id) => {
    navigate(`/rooms/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-36 px-4 md:px-16 lg:px-24 xl:px-32">

      {/* Rooms Section */}
      <div className="w-full lg:w-2/3">
        <h1 className="font-playfair text-4xl mb-2">Hotel Rooms</h1>
        <p className="text-gray-500 mb-8">
          Take advantage of our limited-time offers and special packages.
        </p>

        {roomsDummyData.map((room) => (
          <div key={room._id} className="flex flex-col md:flex-row gap-6 mb-10">
            <img
              src={room.images[0]}
              alt="room"
              onClick={() => handleNavigate(room._id)}
              className="w-full md:w-1/2 max-h-64 rounded-xl shadow-lg object-cover cursor-pointer"
            />

            <div className="md:w-1/2 flex flex-col gap-2">
              <p className="text-gray-500">{room.hotel.city}</p>

              <p
                onClick={() => handleNavigate(room._id)}
                className="text-3xl font-playfair cursor-pointer hover:text-primary"
              >
                {room.hotel.name}
              </p>

              <div className="flex items-center">
                <StarRating rating={room.rating || 4} />
                <span className="ml-2 text-sm text-gray-500">200+ reviews</span>
              </div>

              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <img src={assets.locationIcon} className="w-4 h-4" />
                {room.hotel.address}
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                {room.amenities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 bg-[#F5F5FF] rounded-lg"
                  >
                    <img src={facilityIcons[item]} className="w-5 h-5" />
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-xl font-medium mt-4">
                ${room.pricePerNight} / night
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="w-full lg:w-1/3 w-80 bg-white border border-gray-300 text-gray-600 mb-10">

        <div className="flex justify-between px-5 py-3 border-b">
          <p className="font-medium text-gray-800">FILTERS</p>
          <span
            onClick={() => setOpenFilters(!openFilters)}
            className="text-xs cursor-pointer lg:hidden"
          >
            {openFilters ? "HIDE" : "SHOW"}
          </span>
        </div>

        <div className={`${openFilters ? "block" : "hidden"} lg:block`}>
          <div className="px-5 pt-5">
            <p className="font-medium">Popular Filters</p>
            {roomTypes.map((room, i) => (
              <CheckBox key={i} label={room} />
            ))}
          </div>

          <div className="px-5 pt-5">
            <p className="font-medium">Price Range</p>
            {priceRanges.map((range, i) => (
              <CheckBox key={i} label={`$ ${range}`} />
            ))}
          </div>

          <div className="px-5 pt-5 pb-5">
            <p className="font-medium">Sort By</p>
            {sortOptions.map((opt, i) => (
              <RadioButton key={i} label={opt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
