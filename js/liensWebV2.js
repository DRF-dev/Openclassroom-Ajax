//Activité 3 : Intéraction avec une base de donnée

//On créer une fonction qui nous permettra de faire afficher le contenu de notre base de donnée
function afficherLesElementsBaseDeDonnee(){
  ajaxGet("https://oc-jswebsrv.herokuapp.com/api/liens",
    //On applique une fonction qui permet d'afficherles liens présent dans la base de donnée
    function(liens){

      //on demande a notre appel AJAX de donner à la variable listeLiens la valeur "objet javascript" et de la relier avec notre API ci dessus
      let listeLiens = JSON.parse(liens);

      //on créer une fonction permettant de faire apparaitre les liens de notre base de donnée
      function popLesLiens(placeFormulaire){
        let a = document.createElement('p');
        a.classList.add('lien');
        document.getElementById('contenu').appendChild(a);

        let b = document.createElement('a')
        b.textContent = listeLiens[placeFormulaire].titre;
        b.setAttribute('href', listeLiens[placeFormulaire].url);
        b.style.color = '#428bca';
        b.style.fontWeight = 'bold';
        b.style.textDecoration = 'none';
        document.getElementsByTagName('p')[placeFormulaire].appendChild(b);

        let c = document.createElement('span');
        c.innerHTML = ' ' + listeLiens[placeFormulaire].url;
        document.getElementsByTagName('p')[placeFormulaire].appendChild(c);

        let d = document.createElement('span');
        d.innerHTML = '</br>Ajouté par ' + listeLiens[placeFormulaire].auteur;
        document.getElementsByTagName('p')[placeFormulaire].appendChild(d);
      }

      //on créer une boucle pour faire apparaitre une à une le contenue de notre JSON
      for (var i = 0; i < listeLiens.length; i++) {
        popLesLiens(i);
      }
    }
  )
}

//On affiche le contenu de notre base de donnée
afficherLesElementsBaseDeDonnee();

//Nos éléments pour cette partie
let boutonFormulaire = document.getElementById('ajoutLien');
let formulaire = document.querySelector('form');
let submit = document.getElementById('submit');
let inputs = document.getElementsByTagName('input');
let messageConfirmation = document.getElementById('messConfirmation');
let regexUrl = /[https?://]/;

//on fait disparaitre notre formulaire et notre message de confirmation
formulaire.style.display = 'none';
messageConfirmation.style.display = 'none';

//Bouton à cliquer pour faire apparaitre le formulaire
boutonFormulaire.addEventListener('click', function(){
  formulaire.style.display = 'block';
  boutonFormulaire.style.display = 'none';
});

//fonction pour supprimer notre liste avant d'en faire apparaitre une nouvelle
function deleteLesliens(){
  let x = document.getElementById('contenu');
  x.innerHTML = "";
}

//Evenment d'affichage de notre élément, en plus des autres, à la 1ère position
submit.addEventListener('click', function(){

  //on vérifie que tous les champs soit rempli
  if (inputs[0].value && inputs[1].value && inputs[2].value) {

    //on vérifie si il y'a un http(s) à l'aide de notre regex
    if (regexUrl.test(inputs[2].value)) {
      //On créer un élément qui contiendra les données que l'on souhaite ajouter a notre JSON
      let nouvelleElement = {
        titre: inputs[1].value,
        url: inputs[2].value,
        auteur: inputs[0].value
      }
      ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien", nouvelleElement, function(){
        //On recréer tout notre tableau avec le nouveau lien créer en 1ere position et remet tout au point de départ
        formulaire.style.display = 'none';
        boutonFormulaire.style.display = 'block';

        //On fait apparaitre le bloc de confirmation
        messConfirmation.style.display = 'flex';
        messConfirmation.innerHTML = 'le lien "' + nouvelleElement.titre + '" a bien été ajouté';
        window.setTimeout(
          function(){
            messConfirmation.style.display = 'none';
          },
          2000
        );

        //on suprimme tout
        deleteLesliens();
        //on affiche le contenu de notre base de donnée avec les nouveaux éléments
        afficherLesElementsBaseDeDonnee();
      }, true)
    }
    else if (!regexUrl.test(inputs[2].value)) {
      //On créer un élément qui contiendra les données que l'on souhaite ajouter, avec le http manquant, a notre JSON
      let nouvelleElement = {
        titre: inputs[1].value,
        url: "http://" + inputs[2].value,
        auteur: inputs[0].value
      }
      ajaxPost("https://oc-jswebsrv.herokuapp.com/api/lien", nouvelleElement, function(){
        //On recréer tout notre tableau avec le nouveau lien créer en 1ere position et remet tout au point de départ
        formulaire.style.display = 'none';
        boutonFormulaire.style.display = 'block';

        //On fait apparaitre le bloc de confirmation
        messConfirmation.style.display = 'flex';
        messConfirmation.innerHTML = 'le lien "' + nouvelleElement.titre + '" a bien été ajouté';
        window.setTimeout(
          function(){
            messConfirmation.style.display = 'none';
          },
          2000
        );

        //on suprimme tout
        deleteLesliens();
        //on affiche le contenu de notre base de donnée avec les nouveaux éléments
        afficherLesElementsBaseDeDonnee();
      }, true)
    }
  }

  //Si les champs ne sont pas rempli, on met les bordures en rouge
  if (inputs[0].value === "") {
    inputs[0].style.borderColor = "red";
  }
  else if (inputs[0].value !== "") {
    inputs[0].style.borderColor = "#CFCECE";
  }

  if (inputs[1].value === "") {
    inputs[1].style.borderColor = "red";
  }
  else if (inputs[1].value !== "") {
    inputs[1].style.borderColor = "#CFCECE";
  }

  if (inputs[2].value === "") {
    inputs[2].style.borderColor = "red";
  }
  else if (inputs[2].value !== "") {
    inputs[2].style.borderColor = "#CFCECE";
  }
});
