var randomMailGenerator = function() {
  var that = {};
  
  that.run = function() {
    that.getRandomEmail(function (email) {
      that.displayEmailAddress(email);
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
    
  that.displayEmailAddress = function(emailAddress) {
    document.getElementById('email').innerText = emailAddress;
  };
  
  return that;
};

document.addEventListener('DOMContentLoaded', function () {
  randomMailGenerator().run();
});
