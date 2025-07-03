import { useEffect, useState } from "react";
import axios from "axios";
import ItemHeader from "../components/Items/ItemHeader";
import ItemFilters from "../components/Items/ItemFilters";
import ItemTable from "../components/Items/ItemTable";
import ItemViewModal from "../components/Items/ItemViewModal";

export default function Items() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState({ field: "number", order: "asc" });

  const fetchItems = async () => {
    const { data } = await axios.get("/api/items", {
      params: { ...filters, page, pageSize, sortField: sort.field, sortOrder: sort.order },
    });
    setItems(data.items || []);
    setTotal(data.total || 0);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/items/${id}`);
    fetchItems();
  };

  const handleExport = async () => {
    const { data } = await axios.get("/api/items/export");
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "items.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = JSON.parse(e.target.result);
      await axios.post("/api/items/import", data);
      fetchItems();
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    fetchItems();
  }, [filters, page, sort]);

  return (
    <div className="p-4">
      <ItemHeader
        onRefresh={fetchItems}
        onExport={handleExport}
        onImport={handleImport}
      />
      <ItemFilters filters={filters} onChange={setFilters} />
      <ItemTable
        items={items}
        onViewItem={setSelectedItem}
        onDelete={handleDelete}
        onSort={setSort}
        currentSort={sort}
      />
      <ItemViewModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 border rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => (p * pageSize < total ? p + 1 : p))}
          className="px-3 py-1 border rounded"
          disabled={page * pageSize >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
}
