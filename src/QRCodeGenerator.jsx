import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={styles.container}>
      <h2>QR Code Generator</h2>

      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
      />

      <div style={{ margin: "20px 0" }}>
        {text && (
          <QRCodeCanvas
            id="qr-code"
            value={text}
            size={size}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />
        )}
      </div>

      <div>
        <label>Size: </label>
        <input
          type="range"
          min="100"
          max="300"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>

      {text && (
        <button onClick={downloadQR} style={styles.button}>
          Download QR Code
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "350px",
    margin: "50px auto",
    textAlign: "center",
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "10px"
  },
  button: {
    marginTop: "15px",
    padding: "10px 15px",
    cursor: "pointer"
  }
};

export default QRCodeGenerator;