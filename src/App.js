import React from 'react';

function App() {
  const products = [
    {
      id: 1,
      name: "Neural Link",
      description: "Direct brain-to-device interface for enhanced computing.",
      price: "1500 credits",
    },
    {
      id: 2,
      name: "Nano-Optic Vision",
      description:
        "X-ray and night vision enhancements for low-light and security situations.",
      price: "2000 credits",
    },
    {
      id: 3,
      name: "Titanium Arm",
      description: "Bionic arm with enhanced strength and durability.",
      price: "3500 credits",
    },
    {
      id: 4,
      name: "Cyber Heart",
      description:
        "Artificial heart with extended durability and stamina boost.",
      price: "3000 credits",
    },
    {
      id: 5,
      name: "Stealth Skin",
      description: "Adaptive camouflage skin to blend into surroundings.",
      price: "2500 credits",
    },
  ];
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Dystopian Cyber Black Market</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #333",
              padding: "15px",
              borderRadius: "8px",
              backgroundColor: "#222",
              color: "#eee",
            }}
          >
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>
              <strong>Price:</strong> {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
