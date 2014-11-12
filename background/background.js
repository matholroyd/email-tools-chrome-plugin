define(function(require) {
  var EmailTools = function() {
    var that = {},
        host = "http://localhost:8000",
        READYSTATE_DONE = 4,
        config = null;
  
    that.initialize = function() {
      chrome.contextMenus.create({
        title: "Generate Email",
        contexts: ["editable"],
        onclick: that.onclickGenerateEmail
      });

      chrome.storage.sync.get(function(items) {
        if(items.api_key === null || items.api_key === undefined) {
          that.createNewAccount();
        }
      });
    
      chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        if(message.name === "msgOptionsSaved") {
          that.saveSettingsTosServer();
        } else {
          console.log("Unexpected message!\n" + message);
        }
      
      });
    
    };
  
    that.saveSettingsTosServer = function() {
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
   
    // that.loadSettings = function() {
    //   chrome.storage.sync.get({
    //     api_key: null
    //   }, function(items) {
    //     config = items;
    //   });
    // };
  
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
      
    return that;
  }();

  EmailTools.initialize();
});
