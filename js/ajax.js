function ajaxGet(url, callback){
  let requete = new XMLHttpRequest();
  requete.open("GET", url);

  requete.addEventListener("load",
    function(){
      if (requete.status >= 200 && requete.status < 400){
        callback(requete.responseText);
      }
      else {
        console.error(requete.status + " " + requete.statusText + " " + url);
      }
    }
  )
  requete.addEventListener("error",
    function(){
      console.error("Erreur réseau avec l'URL " + url);
    }
  )
  requete.send(null);
}

function ajaxPost(url, data, callback, isJason){
  let requete = new XMLHttpRequest();
  requete.open("POST", url);

  requete.addEventListener("load",
    function(){
      if (requete.status >= 200 && requete.status < 400) {
        callback(requete.responseText);
      }
      else {
        console.error(requete.status + " " + requete.statusText + " " + url);
      }
    }
  );

  requete.addEventListener("error",
    function(){
      console.error("Erreur réseau avec l'URL " + url);
    }
  );

  if (isJason === true) {
    requete.setRequestHeader("Content-Type", "application/json");
    data = JSON.stringify(data);
  }

  requete.send(data);
};
