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

    chrome.storage.sync.get({
      api_key: null
    }, function(items) {
      if(items.api_key === null || items.api_key === undefined) {
        that.createNewAccount();
      }
    });
  };
  
  that.createNewAccount = function() {
    var url = host + "/create-new-account",
        xhr = new XMLHttpRequest();
    
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === READYSTATE_DONE) {
        data = JSON.parse(xhr.responseText);
        
        chrome.storage.sync.set({
          api_key: data.api_key
        });
      }
    }
    xhr.send();
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


