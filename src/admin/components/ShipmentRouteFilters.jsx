import React, { useState } from "react";
import { X, Search, Calendar, Truck, Package } from "lucide-react";
import {
  fetchRoutesByStatus,
  fetchRoutesByDateRange,
  fetchRoutesByCarrierId,
  fetchRoutesByShipmentStatus,
} from "../handler/HandlerApi";

const ShipmentRouteFilters = ({ onClose, onFilterApplied }) => {
  const [filterType, setFilterType] = useState("status");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [carrierId, setCarrierId] = useState("");
  const [shipmentStatus, setShipmentStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let filteredRoutes = [];

      switch (filterType) {
        case "status":
          filteredRoutes = await fetchRoutesByStatus(status);
          break;
        case "dateRange":
          filteredRoutes = await fetchRoutesByDateRange(startDate, endDate);
          break;
        case "carrier":
          filteredRoutes = await fetchRoutesByCarrierId(carrierId);
          break;
        case "shipmentStatus":
          filteredRoutes = await fetchRoutesByShipmentStatus(shipmentStatus);
          break;
        default:
          throw new Error("Invalid filter type");
      }

      onFilterApplied(filteredRoutes);
    } catch (err) {
      setError("Failed to apply filters");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setStatus("");
    setStartDate("");
    setEndDate("");
    setCarrierId("");
    setShipmentStatus("");
    setFilterType("status");
    onFilterApplied([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Filter Shipment Routes
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Filter Type
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="status">Route Status</option>
              <option value="dateRange">Date Range</option>
              <option value="carrier">Carrier</option>
              <option value="shipmentStatus">Shipment Status</option>
            </select>
          </div>

          {filterType === "status" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}

          {filterType === "dateRange" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {filterType === "carrier" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Carrier ID
              </label>
              <div className="relative">
                <Truck className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                  value={carrierId}
                  onChange={(e) => setCarrierId(e.target.value)}
                  required
                  placeholder="Enter carrier ID"
                />
              </div>
            </div>
          )}

          {filterType === "shipmentStatus" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Shipment Status
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <select
                  className="w-full pl-10 p-2 border border-gray-300 rounded-md"
                  value={shipmentStatus}
                  onChange={(e) => setShipmentStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="returned">Returned</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Apply Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentRouteFilters;
