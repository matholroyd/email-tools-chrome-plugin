(function() {
  var host = "http://localhost:8000",
      READYSTATE_DONE = 4;

  function Background() {
    chrome.contextMenus.create({
      title: "Generate Email",
      contexts: ["editable"],
      onclick: this.onclickGenerateEmail
    });

    chrome.storage.sync.get(function(items) {
      if(items.api_key === null || items.api_key === undefined) {
        this.createNewAccount();
      }
    });

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if(message.name === "msgOptionsSaved") {
        this.saveSettingsTosServer();
      } else {
        console.log("Unexpected message!\n" + message);
      }
  
    });
  }

  Background.prototype.saveSettingsTosServer = function() {
    chrome.storage.sync.get({
      api_key: null,
      username: null,
      email: null
    }, function(settings) {
      if(settings.api_key !== null && settings.api_key !== undefined) {
        var url = host + "/api/" + settings.api_key + "/settings",
            xhr = new XMLHttpRequest();

        xhr.open("PUT", url, true);
        xhr.send(JSON.stringify(settings));
      }
    });
  };
  
  Background.prototype.createNewAccount = function() {
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
  
  Background.prototype.onclickGenerateEmail = function(info) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      Background.prototype.getRandomEmail(function(email) {
        chrome.tabs.sendMessage(tabs[0].id, {
          name: "msgGenerateEmail",
          email: email
        });
      });
    });
  };
  
  Background.prototype.getRandomEmail = function(callback) {
    chrome.storage.sync.get({
      api_key: null
    }, function(settings) {
      if(settings.api_key !== null && settings.api_key !== undefined) {
        var url = host + "/api/" + settings.api_key + "/generate-email",
            xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.onreadystatechange = function() {
          if(xhr.readyState === READYSTATE_DONE) {
            callback(xhr.responseText);
          }
        }
        xhr.send();
      }
    });
  };

  new Background();
})();