define(function() {
  var HOST = "http://localhost:8000",
      READYSTATE_DONE = 4;
  
  function Server(api_key) {
    this.api_key = api_key;
  }
  
  Server.prototype = {
    getRandomEmail: function(callback) {
      var url = HOST + "/api/" + this.api_key + "/generate-email",
          xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);
      xhr.onreadystatechange = function() {
        if(xhr.readyState === READYSTATE_DONE) {
          callback(xhr.responseText)
        }
      }
      xhr.send();
    }
  };
  
  return Server;
});
