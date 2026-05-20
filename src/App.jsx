import { useState } from "react";

function App() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState("No analysis yet.");
  const [status, setStatus] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const analyzeReview = async () => {
    if (review.trim() === "") {
      setResult("Please enter a review first.");
      setStatus("warning");
      setConfidence(0);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://fake-review-detector-backend-ic20.onrender.com/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review }),
      });

      const data = await response.json();

      setResult(data.prediction);
      setConfidence(parseFloat(data.confidence));

      if (data.prediction.toLowerCase().includes("fake")) {
        setStatus("fake");
      } else if (data.prediction.toLowerCase().includes("real")) {
        setStatus("real");
      } else {
        setStatus("warning");
      }

    } catch (error) {
      setResult("Backend connection failed.");
      setStatus("warning");
      setConfidence(0);
    }

    setLoading(false);
  };

  const clearAll = () => {
    setReview("");
    setResult("No analysis yet.");
    setStatus("");
    setConfidence(0);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <div className="header-row">
          <h1>Fake Review Detector</h1>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>

        <p className="subtitle">
          Fake review detection using DistilBERT.
        </p>

        <textarea
          rows="8"
          placeholder="Paste a product review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        <div className="button-group">
          <button onClick={analyzeReview} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Review"}
          </button>

          <button className="clear-btn" onClick={clearAll}>
            Clear
          </button>
        </div>

        <div className={`result-box ${status}`}>
          <h3 className="result-title">Result</h3>
          <p>{result}</p>

          {confidence > 0 && (
            <>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${status}`}
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>

              <p className="confidence-text">
                {confidence}% Confidence
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
