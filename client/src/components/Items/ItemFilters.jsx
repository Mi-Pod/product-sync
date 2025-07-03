export default function ItemFilters({ filters, onChange }) {
  const handleInput = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="mb-4 space-x-4">
      <input
        type="text"
        name="number"
        placeholder="Item Number"
        value={filters.number || ""}
        onChange={handleInput}
        className="border px-2 py-1 rounded"
      />
      <input
        type="text"
        name="item_category_code"
        placeholder="Category Code"
        value={filters.item_category_code || ""}
        onChange={handleInput}
        className="border px-2 py-1 rounded"
      />
    </div>
  );
}
