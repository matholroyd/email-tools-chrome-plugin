var EmailTools = function() {
  var that = {},
      host = "http://localhost:8000",
      READYSTATE_DONE = 4;
  
  that.initialize = function() {
    chrome.contextMenus.create({
      title: "Generate Email",
      contexts: ["editable"],
      onclick: that.onclickGenerateEmail
    });
  };

  that.onclickGenerateEmail = function(info) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      that.getRandomEmail(function(email) {
        chrome.tabs.sendMessage(tabs[0].id, {
          name: "msgGenerateEmail",
          email: email
        });
      });
    });
  };
  
  
  that.getRandomEmail = function(callback) {
    var url = host + "/email",
        xhr = new XMLHttpRequest();
    
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === READYSTATE_DONE) {
        callback(xhr.responseText);
      }
    }
    xhr.send();
  };
      
  return that;
}();

EmailTools.initialize();


