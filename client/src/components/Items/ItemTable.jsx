export default function ItemTable({ items, onViewItem }) {
  return (
    <table className="w-full text-sm bg-white border rounded">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Number</th>
          <th className="p-2 border">Description</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Blocked</th>
          <th className="p-2 border">Available Inventory</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center p-4">
              No items found.
            </td>
          </tr>
        )}
        {items.map((item) => (
          <tr key={item._id}>
            <td className="p-2 border">{item.number}</td>
            <td className="p-2 border">{item.description}</td>
            <td className="p-2 border">{item.item_category_code}</td>
            <td className="p-2 border">{item.blocked ? "Yes" : "No"}</td>
            <td className="p-2 border">{item.available_inventory}</td>
            <td className="p-2 border">
              <button
                onClick={() => onViewItem(item)}
                className="text-blue-600 hover:underline"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
