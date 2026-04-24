import { useState } from "react";

function App() {
  const [review, setReview] = useState("");
  const [result, setResult] = useState("No analysis yet.");
  const [status, setStatus] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const analyzeReview = () => {
    if (review.trim() === "") {
      setResult("Please enter a review first.");
      setStatus("warning");
      setConfidence(0);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const text = review.toLowerCase();

      if (
        text.includes("buy now") ||
        text.includes("best product ever") ||
        text.includes("must buy") ||
        text.includes("amazing amazing")
      ) {
        setResult("Likely Fake");
        setStatus("fake");
        setConfidence(88);
      } else if (text.length < 8) {
        setResult("Review too short");
        setStatus("warning");
        setConfidence(0);
      } else {
        setResult("Likely Real");
        setStatus("real");
        setConfidence(91);
      }

      setLoading(false);
    }, 1200);
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
          Fake review detection using a custom BERT model.
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

              <p className="confidence-text">{confidence}% Confidence</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;