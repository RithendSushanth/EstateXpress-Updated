import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import '../styles/ChangePasswordForm.scss'

const ChangePasswordForm = ({ userId }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            console.log({ userId, currentPassword, newPassword })
            const response = await axios.put(`http://localhost:5000/auth/${userId}/update-password`, {
                currentPassword,
                newPassword,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        // <div>
        //   <h2>Change Password</h2>
        //   <form onSubmit={handleChangePassword}>
        //     <label>
        //       Current Password:
        //       <input
        //         type="password"
        //         value={currentPassword}
        //         onChange={(e) => setCurrentPassword(e.target.value)}
        //       />
        //     </label>
        //     <label>
        //       New Password:
        //       <input
        //         type="password"
        //         value={newPassword}
        //         onChange={(e) => setNewPassword(e.target.value)}
        //       />
        //     </label>
        //     <button type="submit">Change Password</button>
        //   </form>
        //   {message && <div>{message}</div>}
        // </div>
        <div className="ChangePasswordForm">
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
                <label>
                    Current Password:
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </label>
                <label>
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Change Password</button>
            </form>
            {message && <div className="message">{message}</div>}
        </div>

    );
};

export default ChangePasswordForm;
