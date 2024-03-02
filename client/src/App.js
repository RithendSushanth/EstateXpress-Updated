// import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import CreateListing from './pages/CreateListing';
// import ListingDetails from './pages/ListingDetails';
// import TripList from './pages/TripList';
// import WishList from './pages/WishList';
// import PropertyList from './pages/PropertyList';
// import ReservationList from './pages/ReservationList';
// import CategoryPage from './pages/CategoryPage';
// import SearchPage from './pages/SearchPage';
// import AboutPage from './pages/AboutPage';
// import Terms from './pages/Terms';
// import Refund from './pages/Refund';
// import ProfilePage from './pages/ProfilePage';
// import EditListing from './pages/EditListing';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminLoginPage from './pages/AdminLoginPage';
// import AdminRegisterPage from './pages/AdminRegisterPage';
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import jwt_decode, { jwtDecode } from "jwt-decode";


// function isAdmin() {
//   const token = localStorage.getItem("token");
//   if (!token) return false;

//   try {
//     const decodedToken = jwtDecode(token);
//     return decodedToken.isAdmin === true;
//   } catch (error) {
//     return false;
//   }
// }
// function App() {
//   // const isAdmin = true;
//   const isAdminUser = isAdmin();
  
//   return (
//     <div>
//       <ToastContainer />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/admin/login" element={<AdminLoginPage />} />
//           <Route path="/admin/register" element={<AdminRegisterPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/about" element={<AboutPage />} />
//           <Route path="/terms" element={<Terms />} />
//           <Route path="/refund" element={<Refund />} />
//           <Route path="/create-listing" element={<CreateListing />} />
//           <Route path="/properties/:listingId" element={<ListingDetails />} />
//           <Route path="/properties/category/:category" element={<CategoryPage />} />
//           <Route path="/properties/search/:search" element={<SearchPage />} />
//           <Route path="/:userId/trips" element={<TripList />} />
//           <Route path="/:userId/wishList" element={<WishList />} />
//           <Route path="/:userId/properties" element={<PropertyList />} />
//           <Route path="/:userId/reservations" element={<ReservationList />} />
//           <Route path="/:userId/profile" element={<ProfilePage />} />
//           <Route path="/properties/:listingId/edit" element={<EditListing />} />

//           {isAdminUser && (
//             <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           )}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateListing from './pages/CreateListing';
import ListingDetails from './pages/ListingDetails';
import TripList from './pages/TripList';
import WishList from './pages/WishList';
import PropertyList from './pages/PropertyList';
import ReservationList from './pages/ReservationList';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import ProfilePage from './pages/ProfilePage';
import EditListing from './pages/EditListing';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminRegisterPage from './pages/AdminRegisterPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode, { jwtDecode } from "jwt-decode";
import AdminUserListings from "./pages/AdminUserListings";
import { useSelector } from "react-redux";

function isAdmin(token) {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.isAdmin === true;
  } catch (error) {
    return false;
  }
}

function App() {

  const token = useSelector(state => state.token)


  // const token = localStorage.getItem("token");

  //console.log(token);
  const isAdminUser = isAdmin(token);
  
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          {/* <Route path="/admin/register" element={<AdminRegisterPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          <Route path="/:userId/trips" element={<TripList />} />
          <Route path="/:userId/wishList" element={<WishList />} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/:userId/profile" element={<ProfilePage />} />
          <Route path="/properties/:listingId/edit" element={<EditListing />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard/listings/:userID" element={<AdminUserListings />} />


          {/* {isAdminUser ? (
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          ) : (
            <Route path="/admin/dashboard" element={<Navigate to="/admin/login" />} />
          )} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
