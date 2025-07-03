// client/src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

export default function Navbar() {
  const [dropShopifydownOpen, setShopifyDropdownOpen] = useState(false);
  const [dropdownBCOpen, setBCDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleShopifyDropdown = () => setShopifyDropdownOpen(!dropShopifydownOpen);
  const toggleBCDropdown = () => setBCDropdownOpen(!dropdownBCOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-zinc-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center text-white">
            <Link to="/" className="text-xl font-bold">
              Product Sync
            </Link>
          </div>

          <div className="hidden md:flex space-x-4 text-white">
            <Link to="/" className="px-3 py-2 hover:text-purple-500">
              Home
            </Link>
            {/* Shopify Related Links */}
            <div className="relative">
              <button
                onClick={toggleShopifyDropdown}
                className="px-3 py-2 flex items-center hover:text-purple-500"
              >
                Shopify <FiChevronDown className="ml-1" />
              </button>

              {dropShopifydownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-500 rounded-md shadow-xl py-1 text-white">
                  <Link
                    to="/shopify/products"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-purple-500"
                  >
                    Products
                  </Link>
                  <Link
                    to="/shopify/variants"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-purple-500"
                  >
                    Variants
                  </Link>
                  <Link
                    to="/shopify/inventory"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-purple-500"
                  >
                    Inventory
                  </Link>
                </div>
              )}
            </div>

            {/* Business Central Related Links */}
            <div className="relative">
              <button
                onClick={toggleBCDropdown}
                className="px-3 py-2 flex items-center hover:text-purple-500"
              >
                Business Central <FiChevronDown className="ml-1" />
              </button>

              {dropdownBCOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-zinc-500 rounded-md shadow-xl py-1 text-white">
                  <Link
                    to="/bc/items"
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-purple-500"
                  >
                    Items
                  </Link>

                </div>
              )}
            </div>

            <Link to="/logs" className="px-3 py-2 hover:text-purple-500">
              Logs
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-2 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <button
              onClick={toggleDropdown}
              className="w-full text-left px-3 py-2 rounded flex items-center justify-between hover:bg-gray-100"
            >
              Products
              <FiChevronDown />
            </button>

            {dropdownOpen && (
              <div className="pl-4">
                <Link
                  to="/products/items"
                  className="block px-3 py-2 rounded hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Items
                </Link>
                <Link
                  to="/products/variants"
                  className="block px-3 py-2 rounded hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Variants
                </Link>
                <Link
                  to="/products/prices"
                  className="block px-3 py-2 rounded hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Prices
                </Link>
              </div>
            )}

            <Link
              to="/logs"
              className="block px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              Logs
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
