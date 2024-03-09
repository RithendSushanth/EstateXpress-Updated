// // AdminDashboard.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import '../styles/AdminDashboard.scss';
// import {Link} from "react-router-dom"
// import { useNavigate } from 'react-router-dom';
// import jwt_decode, { jwtDecode } from "jwt-decode";


// const AdminDashboard = () => {

//     function isAdmin(token) {
//         if (!token) return false;
      
//         try {
//           const decodedToken = jwtDecode(token);
//           console.log(decodedToken);
//           return decodedToken;
//         } catch (error) {
//           return false;
//         }
//       }


//     const [users, setUsers] = useState([]);

//     const nav = useNavigate();
    
//   const token = useSelector(state => state.token)


//   const isAdminUser = isAdmin(token);

//   console.log(isAdminUser);

//    if(!isAdminUser){
//         nav("/");
//    }

//     const userToken = useSelector(state => state.token)

//     console.log(userToken);


//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/admin/users', {
//                     headers: {
//                         Authorization: `Bearer ${userToken}`,
//                     },
//                 });

//                 console.log(response)
//                 setUsers(response.data.users);
//             } catch (error) {
//                 console.error('Failed to fetch users:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleDeleteUser = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
//                 headers: {
//                     Authorization: `Bearer ${userToken}`,
//                 },
//             });
//             // Update the users state to reflect the deletion
//             setUsers(users.filter(user => user._id !== userId));
//             alert('User deleted successfully');
//         } catch (error) {
//             console.error('Failed to delete user:', error);
//         }
//     };


//     return (
//         <div className="admin-dashboard">
//             <h1>Admin Dashboard</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>User ID</th>
//                         <th>Email</th>
//                         <th>Properties</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user._id}>
//                             <td>{user._id}</td>
//                             <td>{user.email}</td>
//                             <td>
//                                 <ul>
//                                     {/* {user.propertyList.map(property => (
//                                         <li key={property._id}>
//                                             {property.streetAddress}, {property.city}, {property.country}
//                                         </li>
//                                     ))} */}

//                                     <Link to={`listings/${user._id}`}>
//                                         <button>Check User Property</button>
//                                     </Link>

                                   
//                                 </ul>
//                             </td>
//                             <td>
//                                 <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;


// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../styles/AdminDashboard.scss';
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import jwt_decode, { jwtDecode } from "jwt-decode";
import AdminAnalytics from './AdminAnalytics'; // Import the AdminAnalytics component

const AdminDashboard = () => {

    function isAdmin(token) {
        if (!token) return false;
      
        try {
          const decodedToken = jwtDecode(token);
          console.log(decodedToken);
          return decodedToken;
        } catch (error) {
          return false;
        }
      }

    const [users, setUsers] = useState([]);
    const nav = useNavigate();
    const token = useSelector(state => state.token);
    const isAdminUser = isAdmin(token);

    console.log(isAdminUser);

    if(!isAdminUser){
        nav("/");
    }

    const userToken = useSelector(state => state.token)

    console.log(userToken);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/admin/users', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                console.log(response)
                setUsers(response.data.users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            // Update the users state to reflect the deletion
            setUsers(users.filter(user => user._id !== userId));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <AdminAnalytics /> {/* Render the AdminAnalytics component */}
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Properties</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.email}</td>
                            <td>
                                <ul>
                                    <Link to={`listings/${user._id}`}>
                                        <button>Check User Property</button>
                                    </Link>
                                </ul>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteUser(user._id)}>Delete User</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
