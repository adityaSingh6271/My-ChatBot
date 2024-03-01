// Function to fetch data from OpenAI API
const fetchData = async (messages) => {
  const url = 'https://api.openai.com/v1/chat/completions';
  const modelId = 'gpt-3.5-turbo'; // Set the model ID
  const apiKey = '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'; // Replace 'YOUR_API_KEY' with your OpenAI API key

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelId,
      messages: messages
    })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // Display the bot's response in the chat interface
    displayMessage(result.choices[0].message.content, 'assistant');
    document.getElementsByClassName('loading')[0].style.display = 'none';
  } catch (error) {
    document.getElementsByClassName('loading')[0].innerHTML = 'Not Found';
  } finally {
    document.getElementById('input').value = '';
    document.getElementById("inputicon").style.cursor = 'pointer';
  }
};

// Function to display messages in the chat interface
// Function to display messages in the chat interface
const displayMessage = (message, role) => {
  const historyElement = document.getElementById('history');
  const messageElement = document.createElement('pre');
  messageElement.classList.add(role === 'user' ? 'quebx' : 'ansbx');
  messageElement.innerHTML = `<p>${message}</p>`;
  historyElement.appendChild(messageElement);

  // Conditionally add clipboard icon to the answer box
  if (role === 'assistant') {
    const clipboardIcon = document.createElement('i');
    clipboardIcon.classList.add('bi', 'bi-clipboard-fill');
    messageElement.appendChild(clipboardIcon);
  }
};


// Event listener for user input
document.getElementById("inputicon").addEventListener("click", async function () {
  let inputValue = document.getElementById('input').value.trim(); // Trim input value to remove leading/trailing whitespaces
  if (inputValue !== "") {
    // Convert inputValue to an array of messages
    const messages = [{ role: 'user', content: inputValue }];

    // Display user message in the chat interface
    displayMessage(inputValue, 'user');

    document.getElementsByClassName("search")[0].style.boxShadow =
      "5px 5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 10px rgba(0, 0, 0, 0.5)";
    document.getElementsByClassName('loading')[0].style.display = 'flex';
    document.getElementsByClassName('loading')[0].innerHTML = `<div class="load">
      <h6></h6>
      <h6></h6>
      <h6></h6>
    </div>`;
   
    document.getElementById("inputicon").style.cursor = 'not-allowed';

    // Call fetchData with the conversation messages
    await fetchData(messages);
  } else {
    document.getElementsByClassName("search")[0].style.boxShadow =
      "5px 5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 10px rgba(255, 0, 0, 0.5)";
  }
});

document.getElementById("input").addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    let inputValue = this.value.trim(); // Trim input value to remove leading/trailing whitespaces
    if (inputValue !== "") {
      // Convert inputValue to an array of messages
      const messages = [{ role: 'user', content: inputValue }];

      document.getElementsByClassName("search")[0].style.boxShadow =
        "5px 5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 10px rgba(0, 0, 0, 0.5)";
      document.getElementsByClassName('loading')[0].style.display = 'flex';
      document.getElementsByClassName('loading')[0].innerHTML = `<div class="load">
        <h6></h6>
        <h6></h6>
        <h6></h6>
      </div>`;
     
      document.getElementById("inputicon").style.cursor = 'not-allowed';

      // Call fetchData with the conversation messages
      await fetchData(messages);

    } else {
      document.getElementsByClassName("search")[0].style.boxShadow =
        "5px 5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 10px rgba(255, 0, 0, 0.5)";
    }
  }
});


// Event listener for language selection buttons
Array.from(document.getElementsByClassName('button')).forEach((el) => {
  el.addEventListener('click', () => {
    // Toggle language selection buttons
    offButton();
    el.classList.add('lan');
    // Implement language selection logic here if needed
  });
});

// Function to remove active state from language selection buttons
let offButton = () => {
  Array.from(document.getElementsByClassName('button')).forEach((el) => {
    el.classList.remove('lan');
  });
};
