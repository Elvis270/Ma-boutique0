const form = document.getElementById('form-contact');
const message = document.getElementById('form-message');
const recherche = document.getElementById('recherche');
const tri = document.getElementById('tri');
const produits = document.querySelectorAll('.produit');
const listeProduits = document.getElementById('liste-produits');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const response = await fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
  if (response.ok) {
    form.reset();
    message.style.display = 'block';
  } else {
    alert("Une erreur est survenue. Merci d'essayer à nouveau.");
  }
});

recherche.addEventListener('input', () => {
  const valeur = recherche.value.toLowerCase();
  produits.forEach(prod => {
    const nom = prod.dataset.nom.toLowerCase();
    prod.style.display = nom.includes(valeur) ? 'block' : 'none';
  });
});

tri.addEventListener('change', () => {
  const valeur = tri.value;
  const items = Array.from(produits);
  if (valeur === 'prix-asc') {
    items.sort((a, b) => a.dataset.prix - b.dataset.prix);
  } else if (valeur === 'prix-desc') {
    items.sort((a, b) => b.dataset.prix - a.dataset.prix);
  }
  items.forEach(item => listeProduits.appendChild(item));
});
