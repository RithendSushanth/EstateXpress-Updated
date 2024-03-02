// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import '../styles/Admin.scss'

// const AdminRegisterPage = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [passwordMatch, setPasswordMatch] = useState(true);
//   const [error, setError] = useState(""); // Define error state here

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/auth/admin/register", formData);

//       if (response.data.success) {
//         navigate("/admin/login");
//       } else {
//         setError(response.data.message);
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };

//   return (
//     <div className="admin-register">
//       <div className="admin-register_content">
//         <form className="admin-register_content_form" onSubmit={handleSubmit}>
//           <input
//             placeholder="First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//           <input
//             placeholder="Password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             type="password"
//             required
//           />
//           <input
//             placeholder="Confirm Password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             type="password"
//             required
//           />

//           {!passwordMatch && (
//             <p style={{ color: "red" }}>Passwords are not matched!</p>
//           )}

//           {error && (
//             <p style={{ color: "red" }}>{error}</p>
//           )}

//           <button type="submit" disabled={!passwordMatch}>
//             REGISTER
//           </button>
//         </form>
//         <a href="/admin/login">Already have an account? Log In Here</a>
//       </div>
//     </div>
//   );
// };

// export default AdminRegisterPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/Admin.scss'

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/auth/admin/register", formData);
  
      if (response.data.success || 200) {
        // toast.success("Registration successful", { autoClose: 3000 }); // Display success toast
        toast.success(response.data.message, { autoClose: 3000 });
        navigate("/admin/login");
      } else {
        toast.error(response.data.message, { autoClose: 3000 }); // Display error toast
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("User already exists. Please login.", { autoClose: 3000 }); // Display error toast
    }
  };

  return (
    <div className="admin-register">
      <div className="admin-register_content">
        <form className="admin-register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}

          <button type="submit" disabled={!passwordMatch}>
            REGISTER
          </button>
        </form>
        <a href="/admin/login">Already have an account? Log In Here</a>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
