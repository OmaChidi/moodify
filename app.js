const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatWindow = document.getElementById("chat-window");
const playlistSuggestion = document.getElementById("playlist-suggestion");

// Enhanced emotion detection with more nuanced responses
const emotionResponses = {
  happy: {
    colors: ['#27ae60', '#2ecc71'],
    messages: [
      "That's wonderful! Let's keep that positive energy going! 🎉",
      "Your happiness is contagious! Here's something to keep the good vibes flowing! ✨",
      "Love your enthusiasm! This playlist will match your upbeat mood! 🌟"
    ],
    playlists: [
      "37i9dQZF1DXdPec7aLTmlC", // Feel Good Vibes
      "37i9dQZF1DX3rxVfibe1L0"  // Happy Hits
    ]
  },
  sad: {
    colors: ['#2980b9', '#3498db'],
    messages: [
      "I'm here for you. Let's find some music to help lift your spirits. 💙",
      "It's okay to feel down sometimes. Here's something gentle to help you through. 🫂",
      "Sending you virtual hugs. This playlist might help soothe your soul. 💜"
    ],
    playlists: [
      "37i9dQZF1DX7qK8ma5wgG1", // Sad Songs
      "37i9dQZF1DX3YSRoSdA634"  // Comfort Songs
    ]
  },
  angry: {
    colors: ['#c0392b', '#e74c3c'],
    messages: [
      "Let's channel that energy into something powerful. 🎸",
      "Sometimes we need to let it out. Here's something to help you release. 💪",
      "I hear you. This playlist might help you process those feelings. 🎵"
    ],
    playlists: [
      "37i9dQZF1DWSqBruwoIXkA", // Rock Classics
      "37i9dQZF1DX5q67ZpWyRrZ"  // Metal Essentials
    ]
  },
  calm: {
    colors: ['#16a085', '#1abc9c'],
    messages: [
      "Perfect for a peaceful moment. Let's maintain that tranquility. 🧘‍♂️",
      "Your calm energy is beautiful. Here's something to enhance it. 🌿",
      "Peaceful vibes call for peaceful tunes. Enjoy! 🎐"
    ],
    playlists: [
      "37i9dQZF1DX3Ogo9pFvBkY", // Peaceful Piano
      "37i9dQZF1DWU0ScTcjJBdj"  // Calm Vibes
    ]
  },
  anxious: {
    colors: ['#f39c12', '#f1c40f'],
    messages: [
      "Let's take a deep breath together. This music might help you find your center. 🧘‍♀️",
      "I understand that feeling. Here's something to help you ground yourself. 🌱",
      "Anxiety can be tough. Let's find some calm in the music. 🕊️"
    ],
    playlists: [
      "37i9dQZF1DX3Ogo9pFvBkY", // Peaceful Piano
      "37i9dQZF1DWU0ScTcjJBdj"  // Calm Vibes
    ]
  },
  excited: {
    colors: ['#f1c40f', '#f39c12'],
    messages: [
      "Your excitement is electric! Let's keep that energy flowing! ⚡",
      "Love your enthusiasm! This playlist will match your high spirits! 🎊",
      "That's the spirit! Here's something to keep the excitement going! 🎉"
    ],
    playlists: [
      "37i9dQZF1DX1s9knjP51Oa", // Energy Boost
      "37i9dQZF1DXdPec7aLTmlC"  // Feel Good Vibes
    ]
  },
  lonely: {
    colors: ['#8e44ad', '#9b59b6'],
    messages: [
      "You're not alone. Let's find some music to keep you company. 🤗",
      "I'm here to chat and share music with you. 💜",
      "Sometimes music is the best companion. Here's something to connect with. 🎵"
    ],
    playlists: [
      "37i9dQZF1DX6ziVCJnEm59", // Cozy Evening
      "37i9dQZF1DX3YSRoSdA634"  // Comfort Songs
    ]
  },
  neutral: {
    colors: ['#232323', '#2c3e50'],
    messages: [
      "Let's find something that speaks to you right now. 🎵",
      "What kind of music are you in the mood for? 🎧",
      "I'm here to help you discover new music. What's on your mind? 🎶"
    ],
    playlists: [
      "37i9dQZF1DX4WYpdgoIcn6", // Mellow Mix
      "37i9dQZF1DXcBWIGoYBM5M"  // Today's Top Hits
    ]
  }
};

// Show typing indicator
function showTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'typing-indicator';
  indicator.innerHTML = `
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
    <div class="typing-dot"></div>
  `;
  chatWindow.appendChild(indicator);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return indicator;
}

// Remove typing indicator
function removeTypingIndicator(indicator) {
  if (indicator && indicator.parentNode) {
    indicator.parentNode.removeChild(indicator);
  }
}

// Enhanced emotion detection
function detectEmotion(message) {
  const lower = message.toLowerCase();
  const words = lower.split(/\s+/);
  
  // Check for multiple emotions in the message
  const emotions = [];
  for (const [emotion, data] of Object.entries(emotionResponses)) {
    const keywords = {
      happy: ['happy', 'joy', 'glad', 'cheerful', 'delighted', 'excited', 'thrilled'],
      sad: ['sad', 'down', 'blue', 'depressed', 'unhappy', 'miserable', 'heartbroken'],
      angry: ['angry', 'mad', 'furious', 'rage', 'annoyed', 'irritated', 'frustrated'],
      calm: ['calm', 'peaceful', 'relaxed', 'tranquil', 'serene', 'chill'],
      anxious: ['anxious', 'nervous', 'worried', 'stressed', 'tense', 'overwhelmed'],
      excited: ['excited', 'thrilled', 'pumped', 'energetic', 'enthusiastic', 'stoked'],
      lonely: ['lonely', 'alone', 'isolated', 'empty', 'missing', 'homesick'],
      neutral: ['okay', 'fine', 'alright', 'neutral', 'meh', 'whatever']
    };
    
    if (keywords[emotion].some(keyword => words.includes(keyword))) {
      emotions.push(emotion);
    }
  }
  
  // Return the strongest emotion or neutral if none detected
  return emotions.length > 0 ? emotions[0] : 'neutral';
}

// Get random response for emotion
function getRandomResponse(emotion) {
  const responses = emotionResponses[emotion];
  const randomMessage = responses.messages[Math.floor(Math.random() * responses.messages.length)];
  const randomPlaylist = responses.playlists[Math.floor(Math.random() * responses.playlists.length)];
  return { message: randomMessage, playlist: randomPlaylist };
}

// Update chatbox color based on emotion
function updateChatboxColor(emotion) {
  const chatbox = document.getElementById('chatbox-center');
  chatbox.className = `emotion-${emotion}`;
}

// Enhanced message handling
async function handleUserMessage(message) {
  const emotion = detectEmotion(message);
  const typingIndicator = showTypingIndicator();
  
  // Simulate typing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  removeTypingIndicator(typingIndicator);
  
  const response = getRandomResponse(emotion);
  addMessage('bot', response.message);
  updateChatboxColor(emotion);
  
  // Add playlist with animation
  const playlistHtml = `
    <div class="playlist-suggestion">
      <iframe src="https://open.spotify.com/embed/playlist/${response.playlist}" 
              width="100%" 
              height="80" 
              frameborder="0" 
              allowtransparency="true" 
              allow="encrypted-media">
      </iframe>
    </div>
  `;
  
  playlistSuggestion.innerHTML = playlistHtml;
}

// Update chat form submission
chatForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;
  
  addMessage("user", message);
  userInput.value = "";
  
  await handleUserMessage(message);
});

// Add message to chat window
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `chat-bubble ${sender}-bubble`;
  div.textContent = text;
  chatWindow.appendChild(div);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Initialize chat with greeting
function initializeChat() {
  chatWindow.innerHTML = "";
  const greeting = "Hey! I'm Mr. Moody 😎 How are you feeling today?";
  addMessage("bot", greeting);
  updateChatboxColor('neutral');
}

const appSection = document.getElementById("app");
const aiIcon = document.getElementById("ai-icon");

// Ensure the chatbot toggles visibility correctly
function toggleChat() {
  if (!appSection) {
    console.error("Chat application section (#app) not found.");
    return;
  }

  const isHidden = appSection.style.display === "none" || appSection.style.display === "";
  if (isHidden) {
    appSection.style.display = "block";
    setTimeout(() => {
      appSection.style.opacity = "1";
    }, 10); // Delay for smooth opacity transition
    if (!chatWindow.hasChildNodes()) {
      initializeChat(); // Add greeting if chat is empty
    }
  } else {
    appSection.style.opacity = "0";
    setTimeout(() => {
      appSection.style.display = "none";
    }, 300); // Match the CSS transition duration
  }
}

// Bind the toggleChat function to the AI icon
aiIcon.addEventListener("click", toggleChat);

// Ensure the close button also works
const closeChatButton = document.getElementById("close-chat");
closeChatButton.addEventListener("click", () => {
  appSection.style.opacity = "0";
  setTimeout(() => {
    appSection.style.display = "none";
  }, 300); // Match transition duration
});

