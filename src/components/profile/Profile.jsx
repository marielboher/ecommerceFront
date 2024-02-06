import React, { useEffect, useState, useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { user, isAuth } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (isAuth && user) {
        try {
          const response = await axios.get(`api/sessions/profile`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfileData();
  }, [user, isAuth]);

  const logout = async () => {
    try {
      await fetch("http://localhost:8000/api/sessions/logout", {
        method: "POST",
      });
      window.location.href = "/login";
      localStorage.removeItem("token");
    } catch {
      console.error("Error logging out");
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profileData) {
    return <div>No profile data found.</div>;
  }
  return (
    <div>
      <h1>Profile</h1>
      <p>
        <strong>Email:</strong> {profileData.email}
      </p>
      <p>
        <strong>User Name:</strong> {profileData.firstName}{" "}
        {profileData.lastName}
      </p>
      <p>
        <strong>Age:</strong> {profileData.age}
      </p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Profile;
