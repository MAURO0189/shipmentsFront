const API_URL = import.meta.env.VITE_BACKEND_URL;

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  const data = await response.json().catch(() => ({}));
  return data || {};
};

const getToken = () => {
  return sessionStorage.getItem("token");
};

export const fetchRoutes = async () => {
  const response = await fetch(`${API_URL}/api/shipment-route/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await handleResponse(response);
  return data.data || [];
};

export const fetchRoutesByStatus = async (status) => {
  const response = await fetch(
    `${API_URL}/api/shipment-route/status/${status}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await handleResponse(response);
  return data.data || [];
};

export const fetchRoutesByDateRange = async (startDate, endDate) => {
  const response = await fetch(
    `${API_URL}/api/shipment-route/date-range?startDate=${startDate}&endDate=${endDate}`,

    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await handleResponse(response);
  return data.data || [];
};

export const fetchRoutesByCarrierId = async (carrierId) => {
  const response = await fetch(
    `${API_URL}/api/shipment-route/carrier/${carrierId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await handleResponse(response);
  return data.data || [];
};

export const fetchRoutesByShipmentStatus = async (status) => {
  const response = await fetch(
    `${API_URL}/api/shipment-route/shipment-status/${status}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await handleResponse(response);
  return data.data || [];
};

export const fetchRouteByUuid = async (uuid) => {
  const response = await fetch(`${API_URL}/api/shipment-route/detail/${uuid}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  const data = await handleResponse(response);
  return data.data || [];
};

export const fetchRoutesByShipmentId = async (shipmentId) => {
  const response = await fetch(
    `${API_URL}/api/shipment-route/shipment/${shipmentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
  const data = await handleResponse(response);
  return data.data || [];
};

export const createShipmentRoute = async (routeData) => {
  const response = await fetch(`${API_URL}/api/shipment-route/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(routeData),
  });
  const data = await handleResponse(response);
  return data.data || [];
};

export const updateRouteStatus = async (routeId, status) => {
  const response = await fetch(
    `${API_URL}/api/shipment-route/status/${routeId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ status }),
    }
  );
  const data = await handleResponse(response);
  return data.data || [];
};

export const getAllCarriers = async () => {
  const response = await fetch(`${API_URL}/api/carrier/list`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await handleResponse(response);
  return data.data || [];
};

export const getCarrierById = async (id) => {
  const response = await fetch(`${API_URL}/api/carrier/detail/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  const data = await handleResponse(response);
  return data.data || [];
};

export const createCarrier = async (carrierData) => {
  const response = await fetch(`${API_URL}/api/carrier/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(carrierData),
  });
  const data = await handleResponse(response);
  return data.data || [];
};
