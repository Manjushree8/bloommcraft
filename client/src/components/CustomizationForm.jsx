import { useState } from "react";

export default function CustomizationForm({ onAdd }) {
  const [flowerType, setFlowerType] = useState("Roses");
  const [colorScheme, setColorScheme] = useState("Red");
  const [style, setStyle] = useState("Traditional");
  const [size, setSize] = useState("Medium");
  const [messageTag, setMessageTag] = useState("");
  const [quantity, setQuantity] = useState(1);

  const submit = (e) => {
    e.preventDefault();
    onAdd({
      quantity,
      customization: { flowerType, colorScheme, style, size, messageTag }
    });
  };

  return (
    <form onSubmit={submit} className="grid gap-3">
      <select value={flowerType} onChange={(e) => setFlowerType(e.target.value)} className="rounded-xl border p-2">
        <option>Roses</option>
        <option>Jasmine</option>
        <option>Marigold</option>
      </select>
      <select value={colorScheme} onChange={(e) => setColorScheme(e.target.value)} className="rounded-xl border p-2">
        <option>Red</option>
        <option>White</option>
        <option>Multicolor</option>
      </select>
      <select value={style} onChange={(e) => setStyle(e.target.value)} className="rounded-xl border p-2">
        <option>Traditional</option>
        <option>Minimalist</option>
        <option>Layered</option>
      </select>
      <select value={size} onChange={(e) => setSize(e.target.value)} className="rounded-xl border p-2">
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
      </select>
      <input value={messageTag} onChange={(e) => setMessageTag(e.target.value)} placeholder="Message on ribbon (optional)" className="rounded-xl border p-2" />
      <input type="number" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} className="rounded-xl border p-2" />
      <button className="bg-primary text-white rounded-2xl px-4 py-2">Add to Cart</button>
    </form>
  );
}
