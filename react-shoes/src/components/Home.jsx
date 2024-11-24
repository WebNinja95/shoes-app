import NavBar from "./NavBar.jsx";
import ShoeCard from "./ShoeCard.jsx";
import "../css/Home.css";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase.jsx";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch shoes from Firestore
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Container">
      <NavBar />
      <h1>Our Shoes Collection</h1>
      <div className="shoe-grid">
        {shoes.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}
