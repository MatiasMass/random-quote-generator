import { useState, useEffect } from "react";
import quoteService from "./services/quotes";
import CachedIcon from "@mui/icons-material/Cached";
import EastIcon from "@mui/icons-material/East";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [showAllQuotes, setShowAllQuotes] = useState(false);
  const [showChild, setShowChild] = useState(false);
  const [randomQuote, setRandomQuote] = useState({
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  });

  useEffect(() => {
    quoteService.getAll().then((initialQuotes) => {
      setQuotes(initialQuotes);
    });
  }, []);

  const generateRandomQuote = () => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  // console.log(randomQuote);

  return (
    <div className="App">
      <header className="header">
        <div className="random-container">
          <button
            className="btn"
            onClick={() => {
              generateRandomQuote();
              setShowAllQuotes(false);
            }}
          >
            random{" "}
            <span style={{ marginLeft: "15px" }}>
              <CachedIcon />
            </span>
          </button>
        </div>
      </header>
      <main className="main">
        {quotes && randomQuote && showAllQuotes === false && (
          <div key={quotes.text}>
            <p className="quote">"{randomQuote.text}"</p>
            <div
              className="author"
              onClick={() => {
                setShowAllQuotes(true)
              }}
              onMouseEnter={() => setShowChild(true)}
              onMouseLeave={() => setShowChild(false)}
            >
              <p>{randomQuote.author ? randomQuote.author : "unknown"}</p>
              {showChild && <EastIcon />}
            </div>
          </div>
        )}
        
        {showAllQuotes && (
          <div className="all-quotes">
            <p
              style={{
                fontSize: "36px",
                fontWeight: "700",
                margin: "1rem 3rem",
              }}
            >
              {randomQuote.author ? randomQuote.author : "unknown"}
            </p>
            {quotes
              .filter((quote) => quote.author === randomQuote.author)
              .map((quote) => (
                <div key={quote.text}>
                  <p className="quote">"{quote.text}"</p>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
