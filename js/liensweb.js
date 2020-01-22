/*
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
'use strict';

var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

//Activité 1
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

for (var i = 0; i < listeLiens.length; i++) {
  popLesLiens(i);
}

//ajout de liens dans notre tableau

//Nos variables pour cet activité 2
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
submit.addEventListener('click', function(e){

  //on vérifie que tous les champs soit rempli
  if (inputs[0].value && inputs[1].value && inputs[2].value) {
    //on suprimme tout
    deleteLesliens();

    //on vérifie si il y'a un http(s) à l'aide de notre regex
    if (regexUrl.test(inputs[2].value)) {
      listeLiens.unshift({
        titre: inputs[1].value,
        url: inputs[2].value,
        auteur: inputs[0].value
      });
    }
    else if (!regexUrl.test(inputs[2].value)) {
      listeLiens.unshift({
        titre: inputs[1].value,
        url: "http://" + inputs[2].value,
        auteur: inputs[0].value
      });
    }

    //On recréer tout notre tableau avec le nouveau lien créer en 1ere position et remet
    for (var i = 0; i < listeLiens.length; i++) {
      popLesLiens(i);
    }
    formulaire.style.display = 'none';
    boutonFormulaire.style.display = 'block';

    //On fait apparaitre le bloc de confirmation
    messConfirmation.style.display = 'flex';
    messConfirmation.innerHTML = 'le lien "' + listeLiens[0].titre + '" a bien été ajouté';
    window.setTimeout(
      function(){
        messConfirmation.style.display = 'none';
      },
      2000
    );
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
