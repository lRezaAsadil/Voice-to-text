import { useState } from "react";
import "./App.css";

function App() {
  const speechToText = new window.webkitSpeechRecognition();
  const [lang, setLang] = useState("fa-FA");
  const [textArea, setTextArea] = useState("");

  const copyText = () => {
    navigator.clipboard.writeText(textArea);
  };
    speechToText.onend = () => {
    console.info("voice recognition ended, restarting...");
    speechToText.start();
  };
  speechToText.continuous = true;
  speechToText.interimResults = true;
  speechToText.lang = lang;
  speechToText.onresult = (event) => {
    let finalText = "";
    Object.values(event.results).forEach((item) => {
      finalText += item[0].transcript;
    });
    document.getElementById("result").innerHTML = finalText;
    setTextArea(finalText);
  };
  return (
    <div className="container">
      <div className="text">
        <p id="result"></p>
      </div>
      <div className="buttons">
        <select onClick={(e) => setLang(e.target.value)}>
          <option value="fa-FA" selected>
            زبان مورد نظر را انتخاب کنید
          </option>
          <option value="fa-FA">فارسی</option>
          <option value="az-AZ">آذری</option>
          <option value="tr-TR">ترکی</option>
          <option value="en-EN">انگلیسی</option>
        </select>
        <button
          onClick={() => {
            copyText();
          }}
        >
          کپی{" "}
        </button>
        <button
          onClick={() => {
            speechToText.stop();
          }}
        >
          پایان تبدیل{" "}
        </button>
        <button
          onClick={() => {
            speechToText.start();
          }}
        >
          شروع تبدیل{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
