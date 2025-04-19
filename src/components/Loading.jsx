import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function Loading() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/homeUser");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-blue-500 text-2xl font-bold mb-4">
            Ingresando...
          </h1>
          <BounceLoader color="#0033a0" size={150} loading={true} />
        </div>
      ) : null}
    </>
  );
}

export default Loading;
