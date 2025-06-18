const conversation = document.getElementById("conversation");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addToConvo(text, sender = "user") {
    let li = document.createElement("li");
    li.innerText = sender === "user" ? `You: ${text}` : `AI: ${text}`;
    conversation.appendChild(li);
}

async function sendToOllama(prompt) {
    const url = "http://localhost:11434/api/generate";
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            stream: false,
            model: "gemma:2b"
        })
    };
    const response = await fetch(url, options);
    const data = await response.json();
    return data.response || "No response";
}

sendBtn.addEventListener("click", async () => {
    const prompt = userInput.value.trim();
    if (!prompt) return;
    addToConvo(prompt, "user");
    userInput.value = "";
    const aiResponse = await sendToOllama(prompt);
    addToConvo(aiResponse, "ai");
});