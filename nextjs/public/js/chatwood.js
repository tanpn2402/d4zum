(function (d, t) {
  fetch("/api/v1/extension/chat", { method: "POST" })
    .then(function (res) {
      if (res.status === 200) {
        return res.json()
      }
      else {
        throw Error("error")
      }
    })
    .then(function (json) {
      var BASE_URL = json.url;
      var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + json.srcPath;
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g, s);
      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: json.token,
          baseUrl: BASE_URL
        })
      }
    })
    .catch(function (error) {
      console.error(error)
    })

})(document, "script")