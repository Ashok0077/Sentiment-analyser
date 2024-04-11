function analyzeSentiment() {
  var text = document.getElementById("inputText").value.trim();
  if (text === "") {
    alert("Please enter a message to analyze.");
    return;
  }

  fetch("http://localhost:5000/analyze_sentiment", {
    method: "POST",
    body: JSON.stringify({ text: text }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    displaySentiment(data.sentiment);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function displaySentiment(sentiment) {
  var sentimentLabel = sentiment > 0 ? "Positive" : sentiment < 0 ? "Negative" : "Neutral";
  var sentimentConfidence = (Math.abs(sentiment) * 100).toFixed(2);

  var resultDiv = document.getElementById("sentimentResult");
  resultDiv.innerHTML = "<strong>Sentiment:</strong> " + sentimentLabel + " (Confidence: " + sentimentConfidence + "%)";
}
