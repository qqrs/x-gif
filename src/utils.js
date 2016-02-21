"use strict";

export var Promises = {
  xhrGet: (url, accept, responseType) => {
    return new Promise((resolve, reject) => {
      var loader = new XMLHttpRequest();
      loader.open('GET', url, true);
      loader.setRequestHeader("Accept", accept);
      loader.responseType = responseType;
      loader.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (this.status == 200) {
          // uncomment to reject half of successful requests for testing
          //if (Math.random() < 0.5) {
            //reject('chaos');
          //}
          // Resolve the promise with the response text
          resolve(this.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(this.statusText));
        }
      };

      // Handle network errors
      loader.onerror = function() {
        reject(Error("Network Error"));
      };
      loader.send();
    })
  }
}
