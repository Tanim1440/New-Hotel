
import { Routes, Route, useLocation } from "react-router-dom";
import Navber from "./components/Navber";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AllRooms from "./components/pages/AllRooms";
import RoomDetails from "./components/pages/RoomDetails";
import MyBookings from "./components/pages/MyBookings";

import Layout from "./components/pages/hotelOwner/Layout";
import Dashboard from "./components/pages/hotelOwner/Dashboard";
import AddRoom from "./components/pages/hotelOwner/AddRoom";
import ListRoom from "./components/pages/hotelOwner/ListRoom";
import HotelReg from "./components/HotelReg";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith("/owner");
  const { showHotelReg } = useAppContext();

  return (
    <>
      <Toaster />
      {!isOwnerPath && <Navber />}
      {showHotelReg && <HotelReg />}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<AllRooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Owner Routes */}
        <Route path="/owner" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="list-room" element={<ListRoom />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
