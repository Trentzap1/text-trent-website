document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById('chat-container');
    
    // The chat script that simulates the persona interaction
    const messages = [
        { 
            type: 'user', 
            text: "zero data. what time does bunnings close today?",
            delayAfter: 800 // Delay before Trent starts typing
        },
        { 
            type: 'trent', 
            text: "Most Bunnings close at 9:00 PM on weekdays, but weekend times vary. What is your postcode so I can check your exact store?", 
            typingTime: 3000, // How long Trent types
            delayAfter: 2000  // Delay before user sends next message
        },
        {
            type: 'user',
            text: "3000. do they have ryobi pressure washers?",
            delayAfter: 800
        },
        {
            type: 'trent',
            text: "Melbourne CBD (3000) doesn't have a Bunnings. The closest is Port Melbourne, closing at 9:00 PM. Yes, Ryobi is exclusive to Bunnings. Would you like directions?",
            typingTime: 3500,
            delayAfter: 0
        }
    ];

    let msgIndex = 0;

    // Process the sequence of messages dynamically
    function processNextMessage() {
        if (msgIndex >= messages.length) return;
        
        const msg = messages[msgIndex];
        
        if (msg.type === 'user') {
            appendMessage(msg.type, msg.text);
            
            // Wait before Trent starts replying
            if (msgIndex < messages.length - 1) {
                setTimeout(() => {
                    msgIndex++;
                    processNextMessage();
                }, msg.delayAfter || 1000);
            }
        } else if (msg.type === 'trent') {
            showTypingIndicator();
            
            // Wait for Trent's typing animation to finish
            setTimeout(() => {
                removeTypingIndicator();
                appendMessage(msg.type, msg.text);
                
                // Wait before the next user message
                if (msgIndex < messages.length - 1) {
                    setTimeout(() => {
                        msgIndex++;
                        processNextMessage();
                    }, msg.delayAfter || 2000);
                }
            }, msg.typingTime || 2000);
        }
    }

    function appendMessage(type, text) {
        const div = document.createElement('div');
        div.className = `msg ${type}`;
        div.textContent = text;
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatContainer.appendChild(typingDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function removeTypingIndicator() {
        const typingEl = document.getElementById('typing');
        if (typingEl) typingEl.remove();
    }

    // Initialize the chat sequence with a small intro delay so it catches the user's eye
    setTimeout(() => {
        if (chatContainer) {
            processNextMessage();
        }
    }, 1200);
    
    // Optional: Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
