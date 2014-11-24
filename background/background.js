define(['/js/settings.js', '/js/server.js'], function (Settings, Server) {
  var HOST = "http://localhost:8000",
      READYSTATE_DONE = 4;

  function Background() {
    var that = this;

    this.api_key = null;
    this.server = null;
    
    chrome.contextMenus.create({
      title: "Generate Email",
      contexts: ["editable"],
      onclick: this.onclickGenerateEmail.bind(this)
    });
    
    chrome.storage.sync.get(function(items) {
      if(items.api_key === null || items.api_key === undefined) {
        this.createNewAccount();
      } else {
        this.api_key = items.api_key;
      }
    });

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      if(message.name === "msgOptionsSaved") {
        that.saveSettingsTosServer();
      } else if(message.name === "msgResetAccount") {
        that.resetAccount();
      } else {
        console.log("Unexpected message!\n" + message);
      }
    });
    
  }

  Background.prototype = {
    getServer: function() {
      if(this.server === null) {
        this.server = new Server(this.api_key);
      };
      
      return this.server;
    },
    saveSettingsTosServer: function() {
      chrome.storage.sync.get({
        api_key: null,
        username: null,
        email: null
      }, function(settings) {
        if(settings.api_key !== null && settings.api_key !== undefined) {
          var url = HOST + "/api/" + settings.api_key + "/settings",
              xhr = new XMLHttpRequest();

          xhr.open("PUT", url, true);
          xhr.send(JSON.stringify(settings));
        }
      });
    },
    createNewAccount: function() {
      var url = HOST + "/create-new-account",
          xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);
      xhr.onreadystatechange = function() {
        if(xhr.readyState === READYSTATE_DONE) {
          data = JSON.parse(xhr.responseText);
          this.api_key = data.api_key;
    
          chrome.storage.sync.set({
            api_key: data.api_key
          });
        }
      }
      xhr.send();
    },
    onclickGenerateEmail: function(info) {
      var that = this;
      
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        that.getServer().getRandomEmail(function(email) {
          chrome.tabs.sendMessage(tabs[0].id, {
            name: "msgGenerateEmail",
            email: email
          });
        });
      });
    },
    resetAccount: function() {
      chrome.storage.sync.set({
        api_key: null,
        username: null,
        email: null
      }, this.createNewAccount);
    }
  };

  new Background();
});