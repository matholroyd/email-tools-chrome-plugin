(function() {

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.name === "msgGenerateEmail") {
      document.activeElement.value = message.email;
    } else {
      console.log("Unexpected message!\n" + message);
    }
  });
  
})();

