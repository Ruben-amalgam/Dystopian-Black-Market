import React, { useState, useEffect } from "react";

function App() {
  const initialProducts = [
    {
      id: 1,
      name: "Neural Link",
      basePrice: 1500,
      availableQty: 5,
      ownedQty: 0,
    },
    {
      id: 2,
      name: "Nano-Optic Vision",
      basePrice: 2000,
      availableQty: 3,
      ownedQty: 0,
    },
    {
      id: 3,
      name: "Titanium Arm",
      basePrice: 3500,
      availableQty: 4,
      ownedQty: 0,
    },
    {
      id: 4,
      name: "Cyber Heart",
      basePrice: 3000,
      availableQty: 2,
      ownedQty: 0,
    },
    {
      id: 5,
      name: "Stealth Skin",
      basePrice: 2500,
      availableQty: 6,
      ownedQty: 0,
    },
  ];

  const [products, setProducts] = useState(
    initialProducts.map((product) => ({
      ...product,
      currentPrice: product.basePrice,
    }))
  );
  const [cart, setCart] = useState([]);
  const [day, setDay] = useState(1);
  const [credits, setCredits] = useState(5000);
  const [eventMessage, setEventMessage] = useState("");

  const [question, setQuestion] = useState({
    text: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  });
  const [selectedOption, setSelectedOption] = useState("");

  const fluctuatePrices = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => ({
        ...product,
        currentPrice: Math.round(
          product.basePrice * (0.9 + Math.random() * 0.2)
        ),
      }))
    );
  };

  const handleQuizSubmit = () => {
    if (selectedOption === question.answer) {
      setCredits(credits + 100);
      alert("Correct! You've earned 100 credits.");
    } else {
      alert("Incorrect. Try again next time.");
    }
    setSelectedOption("");
  };

  const triggerEvent = () => {
    const events = [
      {
        message: "You got robbed! Lost 200 credits.",
        effect: () => setCredits(Math.max(credits - 200, 0)),
      },
      {
        message: "Lucky day! You found 150 credits on the street.",
        effect: () => setCredits(credits + 150),
      },
      {
        message: "Bonus question appeared! Answer correctly for a reward.",
        effect: () =>
          setQuestion({
            text: "What does CSS stand for?",
            options: [
              "Cascading Style Sheets",
              "Computer Style Sheets",
              "Colorful Style Sheets",
            ],
            answer: "Cascading Style Sheets",
          }),
      },
      {
        message: "A shady dealer stole an item from your cart.",
        effect: () => setCart(cart.slice(0, -1)),
      },
      {
        message: "Gained 50 credits from a successful hack!",
        effect: () => setCredits(credits + 50),
      },
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    setEventMessage(randomEvent.message);
    randomEvent.effect();
  };

  const nextDay = () => {
    setDay(day + 1);
    fluctuatePrices();
    triggerEvent();
  };

  const addToCart = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (
          product.id === productId &&
          product.availableQty > 0 &&
          credits >= product.currentPrice
        ) {
          setCredits(credits - product.currentPrice);
          return {
            ...product,
            availableQty: product.availableQty - 1,
            ownedQty: product.ownedQty + 1,
          };
        }
        return product;
      })
    );
  };

  useEffect(() => {
    fluctuatePrices();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        color: "#eee",
      }}
    >
      <div style={{ maxWidth: "1200px", width: "100%", display: "flex" }}>
        <div style={{ flex: "3", paddingRight: "20px" }}>
          <h1 style={{ color: "black" }}>Dystopian Cyber Black Market</h1>

          <div
            style={{
              marginBottom: "20px",
              padding: "10px",
              backgroundColor: "#222",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
          >
            <h2>Market Prices - Day {day}</h2>
            <p>Your Credits: {credits}</p>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {products.map((product) => (
                <li
                  key={product.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <span>
                      {product.name}: {product.currentPrice} credits
                    </span>
                    <br />
                    <span>Available: {product.availableQty}</span>
                  </div>
                  <button
                    onClick={() => addToCart(product.id)}
                    disabled={
                      product.availableQty === 0 ||
                      credits < product.currentPrice
                    }
                    style={{
                      padding: "5px 10px",
                      backgroundColor:
                        product.availableQty > 0 ? "#444" : "#888",
                      color: "#eee",
                      border: "none",
                      borderRadius: "5px",
                      cursor:
                        product.availableQty > 0 ? "pointer" : "not-allowed",
                    }}
                  >
                    {product.availableQty > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={nextDay}
              style={{
                padding: "10px",
                backgroundColor: "#444",
                color: "#eee",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Advance to Next Day
            </button>
          </div>

          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#222",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
          >
            <h2>Earn Credits - Quiz</h2>
            <p>{question.text}</p>
            {question.options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="quiz"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                <label style={{ marginLeft: "8px" }}>{option}</label>
              </div>
            ))}
            <button
              onClick={handleQuizSubmit}
              style={{
                padding: "10px",
                backgroundColor: "#0a0",
                color: "#eee",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Submit Answer
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: "10%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "300px",
            padding: "10px",
            backgroundColor: "#111",
            border: "9px solid #333",
            borderRadius: "8px",
            marginLeft: "20px",
          }}
        >
          <div>
            <h2>Random Event</h2>
            <p>{eventMessage}</p>
          </div>
          <div
            style={{
              marginTop: "40px",
              padding: "20px",
              backgroundColor: "#222",
              border: "1px solid #333",
              borderRadius: "8px",
            }}
          >
            <h2>Your Cart</h2>
            {products.filter((product) => product.ownedQty > 0).length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {products
                  .filter((product) => product.ownedQty > 0)
                  .map((product) => (
                    <div
                      key={product.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <span>
                        {product.name} x{product.ownedQty}
                      </span>
                      <span>
                        {product.currentPrice * product.ownedQty} credits
                      </span>
                    </div>
                  ))}
                <h3>
                  Total:{" "}
                  {products
                    .filter((product) => product.ownedQty > 0)
                    .reduce(
                      (acc, product) =>
                        acc + product.currentPrice * product.ownedQty,
                      0
                    )}{" "}
                  credits
                </h3>
                <button
                  style={{
                    padding: "10px",
                    backgroundColor: "#0a0",
                    color: "#eee",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                    width: "100%",
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default App;
