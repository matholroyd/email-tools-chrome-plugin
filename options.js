(function() {
  that = {};
  
  that.save_options = function() {
    var items = {
      username: document.getElementById('input_username').value,
      email: document.getElementById('input_email').value,
      password: document.getElementById('input_password').value
    };

    console.log("items saved are =>");
    console.log(items);

    chrome.storage.sync.set(items);
  };

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  that.restore_options = function() {
    chrome.storage.sync.get({
      username: null,
      email: null
    }, function(items) {
      document.getElementById('input_username').value = items.username;
      document.getElementById('input_email').value = items.email;
      
      that.showGeneratedEmail(items.username);
    });
  };
  
  that.showGeneratedEmail = function(username) {
    if(username === "" || username === null || username === undefined) {
      username = "username";
    } else {
      username = username.trim();
    }
    
    jQuery('.update-username').html(username);
  };
  
  jQuery('input#input_username').keyup(function() {
    that.showGeneratedEmail(jQuery(this).val());
  });

  document.addEventListener('DOMContentLoaded', that.restore_options);
  document.getElementById('save').addEventListener('click', that.save_options);
})();
