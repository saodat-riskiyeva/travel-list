import { useState } from "react";

// const itemsList = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
//   { id: 4, description: "Toothbrush", quantity: 1, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PakingList items={items} onDeleteItem={handleDeleteItem} />
      {/* <Stats items={items} /> */}
    </div>
  );
}

function Logo() {
  return <h1> ☀️ Far Away 🏠 </h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
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
  );
}

function PakingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  // const [packed, setPacked] = useState(packedStatus);

  // function handleStatus(e) {
  //   console.log(e);
  //   setPacked(!packed);
  // }

  return (
    <li>
      {/* <input
        type="checkbox"
        id={id}
        checked={packed}
        onClick={handleStatus}
      ></input> */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
    </li>
  );
}

// function Stats({ items }) {
//   return (
//     <footer className="stats">
//       <em>
//         You have {items.length} items in your list, and you already packed
//         {items.filter((item) => item.packed).length} items (X%)
//       </em>
//     </footer>
//   );
// }
