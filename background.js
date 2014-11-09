var EmailTools = function() {
  var that = {};
  
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
    var url = "http://www.google.com",
        xhr = new XMLHttpRequest();
    
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
      // Replace this with the actual xhr response once API built
      callback("some-random-email@tworgy.com");
    }
    xhr.send();
  };
      
  return that;
}();

EmailTools.initialize();


