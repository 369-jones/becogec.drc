# Site BECOGEC — code source

## Structure
```
index.html      → structure des 6 pages (accueil, expertises, moyens, réalisations, produits, contact)
css/style.css   → tous les styles (variables couleurs en haut du fichier, media queries responsive)
js/main.js      → navigation entre pages, carrousel, traductions FR/EN, formulaire de contact
```

## Ouvrir le site en local dans VS Code
1. Ouvrez le dossier `becogec-site` dans VS Code.
2. Installez l'extension **Live Server** (Ritwick Dey) si vous ne l'avez pas.
3. Clic droit sur `index.html` → **Open with Live Server**.
   (Double-cliquer sur `index.html` pour l'ouvrir directement dans le navigateur fonctionne aussi, mais Live Server rafraîchit automatiquement à chaque sauvegarde.)

## Points clés du code
- **Pas de dépendance externe** à part les polices Google Fonts (Space Grotesk + Inter) — tout le reste est autonome.
- **Navigation** : chaque page est une `<div class="page" id="page-XXX">`. La fonction `go(page)` dans `main.js` affiche la bonne page et met à jour l'URL (`#accueil`, `#contact`, etc.).
- **Traductions** : l'objet `i18n` (dans `main.js`) contient toutes les chaînes FR/EN, indexées par clé. Chaque élément traduisible a un attribut `data-i18n="cle"` dans le HTML. Pour ajouter une langue, dupliquez le bloc `fr:{...}` avec une nouvelle clé (ex. `sw` pour swahili) et ajoutez un bouton dans `.langbtns`.
- **Fiches d'expertise** : le contenu détaillé de chaque domaine (Bâtiment, Routes, Génie civil...) est dans `domainBullets` (`main.js`) — modifiable sans toucher au HTML.
- **Formulaire de contact** : ouvre actuellement un e-mail pré-rempli (`mailto:`) faute de serveur. Pour un vrai envoi, il faudra brancher un service (Formspree, Netlify Forms, ou votre propre backend) dans `contact-form`.

## À remplacer avant mise en ligne définitive
- Les liens Facebook/Instagram (`facebook.com/becogec`, `instagram.com/becogec`) sont des exemples — à remplacer par vos vraies pages.
- Le carrousel d'accueil utilise des dégradés + icônes (pas de vraies photos). Remplacez les `.slide .bg` par de vraies images/vidéos de chantiers dès que disponibles.
- La page Réalisations affiche des catégories de projets, pas des chantiers réels précis — à enrichir avec de vrais exemples (photos, client, lieu) quand vous les aurez.

## Déploiement
Le site est 100% statique (HTML/CSS/JS) : il peut être déposé tel quel sur Netlify, Vercel, GitHub Pages, ou n'importe quel hébergement web classique (FTP), sans build ni serveur.
