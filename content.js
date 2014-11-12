(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.name === "msgGenerateEmail") {
      // TODO should check the editable thing is actually something would want 
      // an email address put into it
      document.activeElement.value = message.email;
    } else {
      console.log("Unexpected message!\n" + message);
    }
  });
    
})();

