function wrapEmojis(textInput) {
    const emojiRegex = /\p{Emoji}/u; // Unicode property escape for matching emojis
    const characters = [...textInput];
  
    let result = '';
    let currentEmojiSpan = '';
  
    characters.forEach(char => {
      if (emojiRegex.test(char)) {
        // If the current character is an emoji, add it to the current span
        currentEmojiSpan += char;
      } else {
        // If the current character is not an emoji, wrap and reset the current span
        if (currentEmojiSpan) {
          result += `<span class="emoji">${currentEmojiSpan}</span>`;
          currentEmojiSpan = '';
        }
        result += char;
      }
    });
  
    // Wrap any remaining emojis at the end of the input
    if (currentEmojiSpan) {
      result += `<span class="emoji">${currentEmojiSpan}</span>`;
    }
  
    return result;
  }
  
function wrapEmojisInTextElements() {
  const emojiRegex = /\p{Emoji}/u;

  // Select all text elements that may contain emojis
  const textElements = document.querySelectorAll(
    'p, h1, h2, h3, h4, h5, h6, input[type="text"], textarea, a, button'
  );

  textElements.forEach((element) => {
    // Process only non-link elements
    if (element.tagName.toLowerCase() !== "a") {
      // Get the text content of the element
      const originalText = element.innerHTML;

      // Wrap emojis in the text using the wrapEmojis function
      const newText = wrapEmojis(originalText);

      // Update the element's HTML with the modified text
      element.innerHTML = newText;
    } else {
      // For links, wrap only the text content and keep the link intact
      const originalText = element.textContent;
      const newText = wrapEmojis(originalText);

      // Update the element's text content with the modified text
      element.textContent = newText;
    }
  });
}

wrapEmojisInTextElements();
