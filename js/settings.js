define(function() {
  function Settings() {
    // chrome.storage.sync.get(function(items) {
    //   if(items.api_key === null || items.api_key === undefined) {
    //     this.createNewAccount();
    //   }
    // });
    //
    // chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    //   if(message.name === "msgOptionsSaved") {
    //     this.saveSettingsTosServer();
    //   } else {
    //     console.log("Unexpected message!\n" + message);
    //   }
    // });
  }

  // Settings.prototype = {
  //   saveSettingsTosServer: function() {
  //     chrome.storage.sync.get({
  //       api_key: null,
  //       username: null,
  //       email: null
  //     }, function(settings) {
  //       if(settings.api_key !== null && settings.api_key !== undefined) {
  //         var url = HOST + "/api/" + settings.api_key + "/settings",
  //             xhr = new XMLHttpRequest();
  //
  //         xhr.open("PUT", url, true);
  //         xhr.send(JSON.stringify(settings));
  //       }
  //     });
  //   },
  //   createNewAccount: function() {
  //     var url = HOST + "/create-new-account",
  //         xhr = new XMLHttpRequest();
  //
  //     xhr.open("GET", url, true);
  //     xhr.onreadystatechange = function() {
  //       if(xhr.readyState === READYSTATE_DONE) {
  //         data = JSON.parse(xhr.responseText);
  //
  //         chrome.storage.sync.set({
  //           api_key: data.api_key
  //         });
  //       }
  //     }
  //     xhr.send();
  //   },
  //
  // };
      
  return Settings;
});