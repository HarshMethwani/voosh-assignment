import React, { useState } from "react";
import Avatar from "react-avatar";
import API from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";

const Profile = ({ user,setUser }) => {
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
  
    if (!file) {
      toast.error("Please select an image to upload!");
      return;
    }
  
    const formData = new FormData();
    formData.append("avatar", file);
  
    try {
      const response = await API.post("/tasks/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setAvatar(response.data.avatar);
      setUser((prevUser) => ({
        ...prevUser,
        avatar: response.data.avatar,
      }));
  
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar.");
    }
  };
  

  return (
    <div>
      <h2>Profile</h2>
      <Avatar name={user?.email} src={avatar} round={true} size="100" />
      <form onSubmit={handleAvatarUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Avatar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Profile;
