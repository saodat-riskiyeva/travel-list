import { useState } from "react";

const itemsList = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
  { id: 4, description: "Toothbrush", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PakingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> ☀️ Far Away 🏠 </h1>;
}

function Form() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    setQuantity(1);
    setDescription("");
  }

  return (
    <div>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3> What do you need for your trip? 😍</h3>
        <select
          className="dropDown"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button> ADD </button>
      </form>
    </div>
  );
}

function PakingList() {
  return (
    <div className="list">
      <ul>
        {itemsList.map((item) => (
          <Item
            id={item.id}
            description={item.description}
            quantity={item.quantity}
            packedStatus={item.packed}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ id, description, quantity, packedStatus }) {
  const [packed, setPacked] = useState(packedStatus);

  function handleStatus() {
    setPacked(!packed);
  }

  return (
    <li>
      <input
        type="checkbox"
        id={id}
        checked={packed}
        onClick={handleStatus}
      ></input>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button> ❌ </button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em> You have X items in your list, and you already packed X (X%)</em>
    </footer>
  );
}
