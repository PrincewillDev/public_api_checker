import { useState } from "react";
import Footer from "./footer";
export default function ApiChecker() {
  const [url, setUrl] = useState("");
  // const [endpoint, setEndpoint] = useState("");
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setError(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("not found");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
      setData(null);
    }
  };

  const handleReset = () => {
    setUrl("");
    setData();
    setError(null);
  };

  const handleClear = () => {
    setData();
    setError(null);
  };

  return (
    <>
      <div className="parent-container">
        <div className="subparent-container">
          <div className="input_area">
            <h1 className="heading">Public API Checker</h1>
            <div className="input_actions">
              <input
                type="text"
                value={url}
                className="input_field"
                onChange={(e) => setUrl(e.target.value.trim())}
                placeholder="Enter Api Url "
              />
              <input
                type="button"
                value="Request"
                onClick={() => fetchData()}
              />
              <input
                type="button"
                value="Clear Screen"
                onClick={() => handleClear()}
              />
              <input
                type="button"
                value="Reset"
                onClick={() => handleReset()}
              />
            </div>
          </div>

          <div>
            <p style={{fontSize:'12px', color:'#9F2B00'}}>Notice: Test free and open APIs without an API key. Any errors or failures are attributed to the API, not our platform. Use this tool to validate API functionality before integration.</p>
          </div>

          <div className="display-container">
            {error ? (
              <p style={{ color: "red" }}>Error: {error}</p>
            ) : (
              <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
