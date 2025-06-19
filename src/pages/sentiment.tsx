/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Input, Button, Spin, Card, List, Alert } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sentiment = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    sentiment: string;
    moral_framing: { [key: string]: number };
    text: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError("Please enter some text to analyze.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const postResponse = await axios.post("http://localhost:5001/", { text }, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const data = postResponse.data as { sentiment?: string; moral_framing?: { [key: string]: number }; text?: string };
      setResult({
        sentiment: data.sentiment || "Neutral",
        moral_framing: data.moral_framing || {},
        text: data.text || text,
      });
    } catch (err) {
      setError("Failed to analyze text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setText("");
    setResult(null);
    setError(null);
    navigate("/sentiment");
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Moral Framing Analysis</h1>
      {loading && <Spin size="large" style={spinStyle} />}
      {error && <Alert message="Error" description={error} type="error" showIcon style={alertStyle} />}

      {!result ? (
        <div style={inputContainerStyle}>
          <Input.TextArea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your news article here..."
            style={textareaStyle}
          />
          <Button type="primary" block onClick={handleAnalyze} style={buttonStyle}>
            Analyze
          </Button>
        </div>
      ) : (
        <Card title="Analysis Results" style={cardStyle}>
          <h2 style={sectionTitleStyle}>Original Text</h2>
          <p style={textStyle}>{result.text}</p>
          <h2 style={sectionTitleStyle}>Sentiment</h2>
          <p style={sentimentStyle}>{result.sentiment}</p>
          <h2 style={sectionTitleStyle}>Moral Framing</h2>
          <List
            dataSource={Object.entries(result.moral_framing)}
            renderItem={([category, score]) => (
              <List.Item style={listItemStyle}>
                <strong style={categoryStyle}>{category}</strong>: <span style={scoreStyle}>{score.toFixed(2)}</span>
              </List.Item>
            )}
          />
          <Button onClick={handleReset} style={resetButtonStyle}>
            Analyze Another Article
          </Button>
        </Card>
      )}
    </div>
  );
};

// Enhanced inline styles
const containerStyle: React.CSSProperties = {
  width: "90%",
  maxWidth: "800px",
  margin: "50px auto",
  background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#2c3e50",
  fontSize: "2.5em",
  fontWeight: "bold",
  marginBottom: "20px",
  textTransform: "uppercase",
  letterSpacing: "2px",
};

const spinStyle: React.CSSProperties = {
  display: "block",
  margin: "40px auto",
};

const alertStyle: React.CSSProperties = {
  marginBottom: "30px",
  borderRadius: "8px",
};

const inputContainerStyle: React.CSSProperties = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px",
  fontSize: "16px",
  marginBottom: "20px",
  borderRadius: "8px",
  borderColor: "#dcdcdc",
  resize: "vertical",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px",
  background: "linear-gradient(90deg, #3498db, #2980b9)",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
  borderRadius: "8px",
  transition: "background 0.3s",
};

const cardStyle: React.CSSProperties = {
  marginTop: "30px",
  borderRadius: "10px",
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
  background: "#ffffff",
};

const sectionTitleStyle: React.CSSProperties = {
  color: "#34495e",
  fontSize: "1.5em",
  marginTop: "20px",
  marginBottom: "10px",
};

const textStyle: React.CSSProperties = {
  padding: "10px",
  background: "#f9f9f9",
  borderRadius: "5px",
  marginBottom: "20px",
};

const sentimentStyle: React.CSSProperties = {
  padding: "10px",
  background: "#e8f4f8",
  borderRadius: "5px",
  fontSize: "1.2em",
  color: "#27ae60",
  fontWeight: "bold",
  display: "inline-block",
  marginBottom: "20px",
};

const listItemStyle: React.CSSProperties = {
  background: "#f0f0f0",
  margin: "10px 0",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #e0e0e0",
};

const categoryStyle: React.CSSProperties = {
  color: "#2c3e50",
  marginRight: "10px",
};

const scoreStyle: React.CSSProperties = {
  color: "#e74c3c",
  fontWeight: "bold",
};

const resetButtonStyle: React.CSSProperties = {
  marginTop: "25px",
  padding: "10px 20px",
  background: "#e74c3c",
  border: "none",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background 0.3s",
};

export default Sentiment;