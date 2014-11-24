(function() {
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(message.name === "msgGenerateEmail") {
      // TODO should check the editable thing is actually something would want
      // an email address put into it
      if(message.data.success) {
        document.activeElement.value = message.data.email;
      } else {
        alert(message.data.error);
      }
    } else {
      console.log("Unexpected message!\n" + message);
    }
  });
    
})();

