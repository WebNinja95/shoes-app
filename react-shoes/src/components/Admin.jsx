import React, { useEffect, useState } from "react";
import { db } from "../Firebase.jsx";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../css/Admin.css";

export default function AdminPage() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newShoe, setNewShoe] = useState({
    title: "",
    price: "",
    image: "",
  });
  const navigate = useNavigate();

  // Fetch shoes from Firestore
  useEffect(() => {
    const fetchShoes = async () => {
      const shoesCollectionRef = collection(db, "shoes");
      const querySnapshot = await getDocs(shoesCollectionRef);
      const shoesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setShoes(shoesList);
      setLoading(false);
    };

    fetchShoes();
  }, []);

  const handleAddShoe = async (e) => {
    e.preventDefault();

    if (!newShoe.title || !newShoe.price || !newShoe.image) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const shoesCollectionRef = collection(db, "shoes");
      const docRef = await addDoc(shoesCollectionRef, {
        title: newShoe.title,
        price: parseFloat(newShoe.price),
        image: newShoe.image,
      });

      setShoes((prevShoes) => [
        ...prevShoes,
        { id: docRef.id, ...newShoe, price: parseFloat(newShoe.price) },
      ]);

      // Clear the form
      setNewShoe({ title: "", price: "", image: "" });
    } catch (error) {
      console.error("Error adding shoe: ", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, "shoes", id));

      setShoes(shoes.filter((shoe) => shoe.id !== id));
    } catch (error) {
      console.error("Error removing shoe: ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AdminPage">
      <h1>Admin - Manage Shoes</h1>

      {/* Add Shoe Form */}
      <div className="add-shoe-form">
        <h2>Add a New Shoe</h2>
        <form onSubmit={handleAddShoe}>
          <input
            type="text"
            placeholder="Shoe Title"
            value={newShoe.title}
            onChange={(e) => setNewShoe({ ...newShoe, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newShoe.price}
            onChange={(e) => setNewShoe({ ...newShoe, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newShoe.image}
            onChange={(e) => setNewShoe({ ...newShoe, image: e.target.value })}
          />
          <button type="submit">Add Shoe</button>
        </form>
      </div>

      {/* Shoe List */}
      <div>
        {shoes.map((shoe) => (
          <div key={shoe.id} className="shoe-item">
            <img src={shoe.image} alt={shoe.title} width="100" />
            <h2>{shoe.title}</h2>
            <p>Price: ${Number(shoe.price).toFixed(2)}</p>
            <button onClick={() => handleEdit(shoe.id)}>Edit</button>
            <button onClick={() => handleRemove(shoe.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}
