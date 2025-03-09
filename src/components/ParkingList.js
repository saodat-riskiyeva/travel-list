import { useState } from "react";
import Item from "./Item";

export default function PakingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          className="dropDown"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input" key="1">
            Sort by input order
          </option>
          <option value="description" key="2">
            Sort by description
          </option>
          <option value="packed" key="3">
            Sort by packed status
          </option>
        </select>
        <button onClick={() => onClearList()}> Clear list </button>
      </div>
    </div>
  );
}
