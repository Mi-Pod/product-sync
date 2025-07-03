export default function ItemViewModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">Item Details</h2>
        <div className="space-y-2">
          <div><strong>Number:</strong> {item.number}</div>
          <div><strong>Description:</strong> {item.description}</div>
          <div><strong>Category:</strong> {item.item_category_code}</div>
          <div><strong>Blocked:</strong> {item.blocked ? "Yes" : "No"}</div>
          <div><strong>Available Inventory:</strong> {item.available_inventory}</div>
        </div>
      </div>
    </div>
  );
}
