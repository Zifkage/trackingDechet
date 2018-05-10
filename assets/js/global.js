(function () {

  document.getElementById('puceForm')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      var request = new XMLHttpRequest();
      request.open('POST', '/create/puce');
      request.onload = function (rEv) {
        if(request.status === 200){
          for(var i = 0; i < e.target.length; i++){
            e.target[i].value = '';
          }
          alert('Bien enregistrer');
        }
        else alert("Une erreur s'est produite vérifiez votre connection, status : " + request.status);
      };
      request.send(new FormData(e.target))

    });


})();
