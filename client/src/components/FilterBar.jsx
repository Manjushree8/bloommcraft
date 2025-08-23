export default function FilterBar({ onSearch, onFilter }) {
  return (
    <div className="flex gap-3 items-center mb-6">
      <input onChange={(e) => onSearch(e.target.value)} placeholder="Search products..." className="px-3 py-2 rounded-xl border w-full" />
      <select onChange={(e) => onFilter(e.target.value)} className="px-3 py-2 rounded-xl border">
        <option value="">All styles</option>
        <option value="Traditional">Traditional</option>
        <option value="Minimalist">Minimalist</option>
      </select>
    </div>
  );
}
