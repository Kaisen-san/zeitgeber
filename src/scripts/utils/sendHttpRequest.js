(() => {

  zeitgeber.sendHttpRequest = (method, url, data) => {
    console.log(data, JSON.stringify(data))
    console.log(data instanceof FormData);
    return fetch(url, {
      method: method,
      body: (data instanceof FormData) ? data : JSON.stringify(data),
      headers: (data instanceof FormData) ? {} : { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.status >= 400) {
        return response.json().then(errResData => {
          const error = new Error('Something went wrong requesting your data');
          error.data = errResData;
          throw error;
        });
      }

      return response.json();
    });
  }

})();
