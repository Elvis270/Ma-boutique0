
document.addEventListener("DOMContentLoaded", () => {
  const boutons = document.querySelectorAll(".carte-produit button");
  const panierKey = "empirePanier";
  const panierSection = document.getElementById("panier-section");

  function chargerPanier() {
    const panier = localStorage.getItem(panierKey);
    return panier ? JSON.parse(panier) : [];
  }

  function sauvegarderPanier(panier) {
    localStorage.setItem(panierKey, JSON.stringify(panier));
  }

  function ajouterAuPanier(produit) {
    const panier = chargerPanier();
    panier.push(produit);
    sauvegarderPanier(panier);
    afficherPanier();
    alert(`${produit} a été ajouté au panier`);
  }

  function afficherPanier() {
    const panier = chargerPanier();
    if (!panierSection) return;

    if (panier.length === 0) {
      panierSection.innerHTML = "<p>Votre panier est vide.</p>";
      return;
    }

    let html = "<ul>";
    let total = 0;

    panier.forEach((item) => {
      html += `<li>${item}</li>`;
      const match = item.match(/(\d+[,.]?\d*)€/);
      if (match) total += parseFloat(match[1].replace(',', '.'));
    });

    html += `</ul><p><strong>Total : ${total.toFixed(2)}€</strong></p>`;
    html += `<button onclick="viderPanier()">Vider le panier</button>`;
    panierSection.innerHTML = html;
  }

  window.viderPanier = function () {
    localStorage.removeItem(panierKey);
    afficherPanier();
  }

  boutons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const carte = btn.parentElement;
      const produit = `${carte.querySelector("h3").textContent} - ${carte.querySelector("p").textContent}`;
      ajouterAuPanier(produit);
    });
  });

  const rechercheInput = document.getElementById("recherche-produit");
  if (rechercheInput) {
    rechercheInput.addEventListener("input", (e) => {
      const valeur = e.target.value.toLowerCase();
      document.querySelectorAll(".carte-produit").forEach(carte => {
        const titre = carte.querySelector("h3").textContent.toLowerCase();
        carte.style.display = titre.includes(valeur) ? "block" : "none";
      });
    });
  }

  afficherPanier();
});
