import React, { useEffect, useState } from "react";
import { db } from "../Firebase.jsx"; // Adjust this import path
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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

  // Handle add shoe
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

      // Add new shoe to the state without re-fetching
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

  // Handle edit
  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  // Handle remove
  const handleRemove = async (id) => {
    try {
      await deleteDoc(doc(db, "shoes", id));

      // Remove the shoe from the state immediately
      setShoes(shoes.filter((shoe) => shoe.id !== id));
    } catch (error) {
      console.error("Error removing shoe: ", error);
    }
  };

  // Handle update shoe after edit
  const handleUpdateShoe = async (id, updatedShoe) => {
    try {
      const shoeRef = doc(db, "shoes", id);
      await updateDoc(shoeRef, updatedShoe);

      // Update the shoe in the state immediately
      setShoes((prevShoes) =>
        prevShoes.map((shoe) =>
          shoe.id === id ? { ...shoe, ...updatedShoe } : shoe
        )
      );
    } catch (error) {
      console.error("Error updating shoe: ", error);
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
