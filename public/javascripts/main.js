document.addEventListener("DOMContentLoaded", function(event) {
  var app = new XMLHttpRequest();
  app.open("GET", "fazenda.json", true);

  var list = document.querySelector("#lista");
  var item = list.querySelector(".linha")
  list.innerHTML = '';

  app.onload = function(e) {
    if (app.status >= 200 && app.status < 400) {
      // Success!

      response = JSON.parse(app.responseText);
      listagem(response.data);
    }
  };

  app.send();

  function toNumber(n) {
    return Number(n) || 0
  }

  // Listagem do ranking
  function listagem(arr) {
    var posicao = arr.sort(function(a, b) {
      return toNumber(a.positive) < toNumber(b.positive)
    })

    .map(function(obj, index) {
      var newItem = item.cloneNode(true);

      var total = toNumber(obj.positive) + toNumber(obj.negative);
      var gostam = Math.round(toNumber(obj.positive) * 100 / total) || 0;
      var desgostam = Math.round(toNumber(obj.negative) * 100 / total) || 0;

      newItem.querySelector('.img-participante').style.background = "url(" + obj.picture + ")";
      newItem.querySelector('.position').textContent = index + 1;
      newItem.querySelector('.jsonnome').textContent = obj.name;
      newItem.querySelector('.jsondescricao').textContent = obj.description;
      newItem.querySelector('.gostam h3').textContent = gostam + "%";
      newItem.querySelector('.nao-gostam h3').textContent = desgostam + "%";

      list.appendChild(newItem)
    });
  }
});