import React, { useState, useEffect } from "react";
import { db } from "../Firebase.jsx"; // Adjust this import path
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import "../css/Edit.css";

export default function EditShoe() {
  const [shoe, setShoe] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchShoe = async () => {
      const shoeDocRef = doc(db, "shoes", id);
      const shoeDoc = await getDoc(shoeDocRef);
      if (shoeDoc.exists()) {
        setShoe(shoeDoc.data());
      } else {
        console.log("Shoe not found!");
      }
      setLoading(false);
    };

    fetchShoe();
  }, [id]);

  const handleUpdateShoe = async (e) => {
    e.preventDefault();

    if (!shoe.title || !shoe.price || !shoe.image) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const shoeDocRef = doc(db, "shoes", id);
      await updateDoc(shoeDocRef, {
        title: shoe.title,
        price: parseFloat(shoe.price),
        image: shoe.image,
      });

      navigate("/admin");
    } catch (error) {
      console.error("Error updating shoe: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="EditShoe">
      <h1>Edit Shoe</h1>
      <form onSubmit={handleUpdateShoe}>
        <input
          type="text"
          placeholder="Shoe Title"
          value={shoe.title}
          onChange={(e) => setShoe({ ...shoe, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={shoe.price}
          onChange={(e) => setShoe({ ...shoe, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={shoe.image}
          onChange={(e) => setShoe({ ...shoe, image: e.target.value })}
        />
        <button type="submit">Update Shoe</button>
      </form>
    </div>
  );
}
