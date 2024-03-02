import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";
import axios from "axios";
import '../styles/Admin.scss'

const AdminLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //       const response = await axios.post("http://localhost:5000/auth/admin/login", {
    //         email,
    //         password,
    //       });

    //       if (response.data.success) {
    //         const { user, token } = response.data;
    //         dispatch({ type: "ADMIN_LOGIN", payload: { user, token } });
    //         navigate("/admin/dashboard");
    //       } else {
    //         console.log(response.data.message);
    //       }
    //     } catch (error) {
    //       console.error("Login failed:", error);
    //     }
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:5000/auth/admin/login", {
                email,
                password,
            });

    
            if (response.status == 200) {
                const { user, token } = response.data;
                // dispatch({ type: "ADMIN_LOGIN", payload: { user, token } });
                dispatch(setLogin({ user, token }));
                console.log("Successfully logged in as admin");
                navigate("/admin/dashboard");
            } else {
                if (response.data.message) {
                    console.log(response.data);
                } else {
                    console.log("Login failed: Unknown error");
                }
            }
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };
    
    

    return (
        <div className="admin-login">
            <div className="admin-login_content">
                <form className="admin-login_content_form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">LOG IN</button>
                </form>
                <a href="/admin/register">Don't have an account? Sign Up Here</a>
            </div>
        </div>
    );
};

export default AdminLoginPage;
