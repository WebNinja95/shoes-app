import React, { useEffect, useState } from "react";
import { auth, db } from "../Firebase.jsx"; // Adjust this import path
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Get user role from Firestore
        const userDocRef = doc(db, "users", user.uid); // Assuming 'users' collection
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === "admin"); // Adjust based on your Firestore data structure
        } else {
          console.log("No user data found");
        }
      } else {
        setIsAdmin(false); // If no user is logged in
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth status
  }

  return (
    <div className="Nav-Container">
      <nav>
        <img src="/images/shoes.png" alt="logo" />
        <ul>
          {isAdmin && (
            <li>
              <button onClick={() => navigate("/admin")}>Admin</button>
            </li>
          )}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
