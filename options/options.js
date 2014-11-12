(function() {
  that = {};
  
  that.save_options = function() {
    var settings = {
      username: document.getElementById('input_username').value,
      email: document.getElementById('input_email').value
    };

    console.log("settings saved are =>");
    console.log(settings);

    chrome.storage.sync.set(settings);
    chrome.runtime.sendMessage({
      name: "msgOptionsSaved",
      settings: settings
    });
  };

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  that.restore_options = function() {
    chrome.storage.sync.get({
      username: null,
      email: null,
      api_key: null
    }, that.updateSettings);
  };
    
  that.updateSettings = function(settings) {
    if(settings.username !== null && settings.username !== undefined) {
      document.getElementById('input_username').value = settings.username;
    }
    
    if(settings.email !== null && settings.email !== undefined) {
      document.getElementById('input_email').value = settings.email;
    }
    
    if(settings.api_key !== undefined && settings.api_key !== null) {
      document.getElementById('output_api_key').innerText = settings.api_key;
    }
    
    that.showGeneratedEmail(settings.username);
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
  
  chrome.storage.onChanged.addListener(function(changes, areaName) {
    that.updateSettings(changes);
  });
  
})();
