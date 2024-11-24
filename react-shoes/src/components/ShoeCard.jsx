import React from "react";

export default function ShoeCard({ shoe }) {
  return (
    <div className="shoe-card">
      <img src={shoe.image} alt={shoe.title} />
      <h2>{shoe.title}</h2>
      <p>Price: ${shoe.price.toFixed(2)}</p>
      <button>Add to Cart</button>
    </div>
  );
}
