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
      window.chatwootSettings = {
        type: json.type || "expanded_bubble",
        launcherTitle: json.launcherTitle || "Tôi ở đây"
      };

      var BASE_URL = json.url;
      var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + json.srcPath;
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g, s);
      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken: json.token,
          baseUrl: BASE_URL,
        })
      }

      window.addEventListener("chatwoot:ready", function () {
        console.log("chatwoot:ready");
        // window.$chatwoot.reset();
        // window.$chatwoot.setUser("123-456-7895656-123", {
        //   "email": "test@gmail.com",
        //   "name": "test",
        //   "phone_number": "+84901234567",
        //   "identifier_hash": "TVR4G6kuaAUqDY1j23q9Vu6c"
        // });
      });
    })
    .catch(function (error) {
      console.error(error)
    })

})(document, "script")