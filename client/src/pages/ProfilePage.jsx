// // ProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { setUser, setPassword } from "../redux/state"; // Assuming setUser and setPassword actions are defined in your Redux state
// import "../styles/ProfilePage.scss";
// import axios from "axios";
// import ChangePasswordForm from "../components/ChangePasswordForm";
// import Navbar from "../components/Navbar";

// const ProfilePage = () => {
//     const { userId } = useParams();
//     const user = useSelector((state) => state.user);
//     const [loading, setLoading] = useState(true);
//     const [password, setPassword] = useState("");
//     const dispatch = useDispatch();
//     const [currentPassword, setCurrentPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [message, setMessage] = useState("");


//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/auth/${userId}`);
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch user data");
//                 }
//                 const data = await response.json();
//                 dispatch(setUser(data));
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, [dispatch, userId]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!user) {
//         return <div>User not found</div>;
//     }

//     return (
//         <><Navbar />
//             <div className="profile-page">

//                 {loading && <div className="loading">Loading...</div>}
//                 {!loading && !user && <div className="error">User not found</div>}
//                 {user && (
//                     <>
//                         <h1>{user.firstName} {user.lastName}'s Profile</h1>
//                         <img src={`http://localhost:5000/${user.profileImagePath.replace("public", "")}`} alt="profile photo" />
//                         <p>Email: {user.email}</p>
//                         {/* Add more profile information here */}
//                         <ChangePasswordForm userId={userId} />
//                         <Link to={`/${userId}/properties`}>
//                             <button>View Property List</button>
//                         </Link>
//                     </>
//                 )}
//             </div>
//         </>
//     );
// };

// export default ProfilePage;

// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { setUser, setPassword } from "../redux/state"; // Assuming setUser and setPassword actions are defined in your Redux state
// import "../styles/ProfilePage.scss";
// import axios from "axios";
// import ChangePasswordForm from "../components/ChangePasswordForm";
// import Navbar from "../components/Navbar";
// import PropertyList from "./PropertyList";
// import Properties from "./Properties";

// const ProfilePage = () => {
//     const { userId } = useParams();
//     const user = useSelector((state) => state.user);

//     console.log({ user })
//     const [loading, setLoading] = useState(true);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/auth/${userId}`);
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch user data");
//                 }
//                 const data = await response.json();
//                 dispatch(setUser(data));
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, [dispatch, userId]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!user) {
//         return <div>User not found</div>;
//     }


//     return (
//         <>
//             <Navbar />
//             <div className="profile-page">
//                 <h1>{user.firstName} {user.lastName}'s Profile</h1>
//                 <img src={`http://localhost:5000/${user.profileImagePath.replace("public", "")}`} alt="profile photo" />
//                 <p>Email: {user.email}</p>
//                 {/* Add more profile information here */}
//                 <ChangePasswordForm userId={userId} />
                
//                 {/* Property Management Section */}
//                 {user.propertyList && user.propertyList.length > 0 && (
//                     <div className="property-management">
//                         <br />
//                         <br />
//                         <h2>Manage Your Properties</h2>
//                         <ul>
//                             {user.propertyList.map(property => (
//                                 <li key={property._id} className="property-item">
//                                     <div className="property-details">
//                                         <p>{property.streetAddress}</p>
//                                         <p>{property.city}, {property.province}, {property.country}</p>
//                                     </div>
//                                     <div className="property-actions">
//                                         <Link to={`/properties/${property._id}/edit`} className="button">Edit Property</Link>
//                                         <button className="button">Delete Property</button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default ProfilePage;


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { setUser, setPassword } from "../redux/state"; // Assuming setUser and setPassword actions are defined in your Redux state
// import "../styles/ProfilePage.scss";
// import axios from "axios";
// import ChangePasswordForm from "../components/ChangePasswordForm";
// import Navbar from "../components/Navbar";
// import PropertyList from "./PropertyList";
// import Properties from "./Properties";

// const ProfilePage = () => {
//     const { userId } = useParams();
//     const user = useSelector((state) => state.user);
//     const navigate = useNavigate();

//     console.log({ user })
//     const [loading, setLoading] = useState(true);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/auth/${userId}`);
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch user data");
//                 }
//                 const data = await response.json();
//                 dispatch(setUser(data));
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//     }, [dispatch, userId]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!user) {
//         return <div>User not found</div>;
//     }

//     const handleDeleteProperty = async (propertyId) => {
//         try {
//             const response = await axios.delete(`http://localhost:5000/properties/delete/${propertyId}`);
//             if (response.status === 200) {
//               // Update the user's property list after deletion
//               const updatedUser = { ...user, propertyList: user.propertyList.filter(property => property._id !== propertyId) };
//               dispatch(setUser(updatedUser));
//               // Show toast message
//               alert("Property deleted successfully");
//             }
//           } catch (err) {
//             console.error("Failed to delete property:", err.message);
//           }
//     }


//     return (
//         <>
//             <Navbar />
//             <div className="profile-page">
//                 <h1>{user.firstName} {user.lastName}'s Profile</h1>
//                 <img src={`http://localhost:5000/${user.profileImagePath.replace("public", "")}`} alt="profile photo" />
//                 <p>Email: {user.email}</p>
//                 {/* Add more profile information here */}
//                 <ChangePasswordForm userId={userId} />
                
//                 {/* Property Management Section */}
//                 {user.propertyList && user.propertyList.length > 0 && (
//                     <div className="property-management">
//                         <br />
//                         <br />
//                         <h2>Manage Your Properties</h2>
//                         <ul>
//                             {console.log({propertyList: user.propertyList})}
//                             {user.propertyList.map(property => (
//                                 <li key={property._id} className="property-item">
//                                     <div className="property-details">
//                                         <p>{property.streetAddress}</p>
//                                         <p>{property.city}, {property.province}, {property.country}</p>
//                                     </div>
//                                     <div className="property-actions">
//                                         <button className="edit-button" onClick={() => navigate(`/properties/${property._id}/edit`)}>Edit Property</button>
//                                         <button className="delete-button" onClick={() => handleDeleteProperty(property._id)}>Delete Property</button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default ProfilePage;



import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { setUser, setPassword } from "../redux/state"; // Assuming setUser and setPassword actions are defined in your Redux state
import "../styles/ProfilePage.scss";
import axios from "axios";
import ChangePasswordForm from "../components/ChangePasswordForm";
import Navbar from "../components/Navbar";
import PropertyList from "./PropertyList";
import Properties from "./Properties";

const ProfilePage = () => {
    const userID  = useParams("userId");
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [listings, setListings] = useState([]);

    const [loading, setLoading] = useState(true);
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();



    useEffect(() =>{

        console.log(userID);
        axios.post("http://localhost:5000/admin/user_listings", { "userID": userID.userId },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then(res => {

                setListings(res.data.listingsByUser.flatMap(data => data));
                console.log(res.data.listingsByUser)
            });

    }, [clicked])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/auth/${userID.userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                dispatch(setUser(data));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [dispatch, userID]);

    const handleDeleteProperty = async (propertyId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/properties/delete/${propertyId}`);
            if (response.status === 200) {
                const updatedUser = { ...user, propertyList: user.propertyList.filter(property => property._id !== propertyId) };
                dispatch(setUser(updatedUser));
                setClicked(true);
                alert("Property deleted successfully");
            }
        } catch (err) {
            console.error("Failed to delete property:", err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <h1>{user.firstName} {user.lastName}'s Profile</h1>
                <img src={`http://localhost:5000/${user.profileImagePath.replace("public", "")}`} alt="profile photo" />
                <p>Email: {user.email}</p>
                <ChangePasswordForm userId={userID} />
                {user.propertyList && user.propertyList.length > 0 && (
                    <div className="property-management">
                        <br />
                        <br />
                        <h2>Manage Your Properties</h2>
                        <ul>
                            {listings.map(property => (
                                <li key={property._id} className="property-item">
                                    <div className="property-details">
                                        <p>{property.streetAddress}</p>
                                        <p>{property.city}, {property.province}, {property.country}</p>
                                    </div>
                                    <div className="property-actions">
                                        <button className="edit-button" onClick={() => navigate(`/properties/${property._id}/edit`)}>Edit Property</button>
                                        <button className="delete-button" onClick={() => handleDeleteProperty(property._id)}>Delete Property</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProfilePage;
