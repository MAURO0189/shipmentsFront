const API_URL = import.meta.env.VITE_BACKEND_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }
  return response.json();
};

const getAuthToken = () => {
  return sessionStorage.getItem("authToken");
};

export const fetchRoutes = async () => {
  const response = await fetch(`${API_URL}/shipment-route/list`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return handleResponse(response);
};

export const fetchRoutesByStatus = async (status) => {
  const response = await fetch(`${API_URL}/shipment-route/status/${status}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return handleResponse(response);
};

export const fetchRoutesByDateRange = async (startDate, endDate) => {
  const response = await fetch(
    `${API_URL}/shipment-route/date-range?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  return handleResponse(response);
};

export const fetchRoutesByCarrierId = async (carrierId) => {
  const response = await fetch(
    `${API_URL}/shipment-route/carrier/${carrierId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  return handleResponse(response);
};

export const fetchRoutesByShipmentStatus = async (status) => {
  const response = await fetch(
    `${API_URL}/shipment-route/shipment-status/${status}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  return handleResponse(response);
};

export const fetchRouteByUuid = async (uuid) => {
  const response = await fetch(`${API_URL}/shipment-route/detail/${uuid}`, {
    headers: { Authorization: `Bearer ${getAuthToken()}` },
  });
  return handleResponse(response);
};

export const fetchRoutesByShipmentId = async (shipmentId) => {
  const response = await fetch(
    `${API_URL}/shipment-route/shipment/${shipmentId}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );
  return handleResponse(response);
};

export const createShipmentRoute = async (routeData) => {
  const response = await fetch(`${API_URL}/shipment-route/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(routeData),
  });
  return handleResponse(response);
};

export const updateRouteStatus = async (routeId, status) => {
  const response = await fetch(`${API_URL}/shipment-route/status/${routeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
};

export const getAllCarriers = async () => {
  const response = await fetch(`${API_URL}/carrier/list`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return handleResponse(response);
};

export const getCarrierById = async (id) => {
  const response = await fetch(`${API_URL}/carrier/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
  return handleResponse(response);
};

export const createCarrier = async (carrierData) => {
  const response = await fetch(`${API_URL}/carrier/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(carrierData),
  });
  return handleResponse(response);
};
