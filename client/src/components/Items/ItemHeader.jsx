export default function ItemHeader({ onRefresh }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Items</h1>
      <button
        onClick={onRefresh}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Refresh
      </button>
    </div>
  );
}
