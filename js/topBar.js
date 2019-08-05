(function () {

      var {BrowserWindow} = require('electron');

     function init() {
          document.getElementById("min-btn").addEventListener("click", function (e) {
               window.minimize();
          });

          document.getElementById("close-btn").addEventListener("click", function (e) {
               window.close();
          });
     };

     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               init();
          }
     };

})();
