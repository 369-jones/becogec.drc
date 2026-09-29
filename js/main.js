const domains = ['d1','d2','d3','d4','d5','d6'];
const domainIcons = {d1:'batiment',d2:'routes',d3:'genie-civil',d4:'hydraulique',d5:'terrassement',d6:'bureau-etudes'};

/* fill every [data-icon] element with its Font Awesome SVG (self-hosted, see js/icons.js) */
function hydrateIcons(root){
  (root || document).querySelectorAll('[data-icon]').forEach(function(el){
    var size = el.dataset.size ? parseInt(el.dataset.size, 10) : 20;
    el.innerHTML = window.iconSvg(el.dataset.icon, { size: size });
  });
}
const domainBullets = {
  fr:{
    d1:['Construction de bâtiments résidentiels','Immeubles à plusieurs niveaux','Bâtiments administratifs','Établissements scolaires','Infrastructures sanitaires','Bâtiments commerciaux et industriels','Réhabilitation et rénovation','Gros œuvre et second œuvre'],
    d2:['Ouverture et aménagement de routes','Réhabilitation des routes','Entretien routier','Terrassements','Mise en forme et nivellement','Compactage','Aménagement de voiries urbaines','Revêtements et pavages'],
    d3:['Ponts et ouvrages de franchissement','Dalots et ouvrages hydrauliques','Ouvrages en béton armé','Murs de soutènement','Ouvrages de protection','Confortement et réhabilitation'],
    d4:['Réseaux d\'évacuation des eaux','Caniveaux','Fossés','Dalots','Drainage','Protection contre les eaux et le ruissellement'],
    d5:['Travaux de stabilisation','Protection des talus','Terrassements généraux','Remblai et déblai','Travaux de drainage','Ouvrages de protection contre l\'érosion'],
    d6:['Études architecturales','Études et calculs de structures','Études routières','Études d\'ouvrages d\'art','Études hydrauliques','Études environnementales','Contrôle et surveillance des travaux']
  },
  en:{
    d1:['Residential building construction','Multi-storey buildings','Administrative buildings','Schools','Health facilities','Commercial & industrial buildings','Rehabilitation and renovation','Structural and finishing works'],
    d2:['Road opening and development','Road rehabilitation','Road maintenance','Earthworks','Grading and levelling','Compaction','Urban street development','Surfacing and paving'],
    d3:['Bridges and crossing structures','Culverts and hydraulic structures','Reinforced-concrete structures','Retaining walls','Protective structures','Reinforcement and rehabilitation'],
    d4:['Water evacuation networks','Gutters','Ditches','Culverts','Drainage','Protection against water and runoff'],
    d5:['Stabilization works','Slope protection','General earthworks','Backfill and excavation','Drainage works','Erosion-protection structures'],
    d6:['Architectural studies','Structural design & calculations','Road studies','Engineering-structure studies','Hydraulic studies','Environmental studies','Works supervision and control']
  }
};
function buildDomainGrid(container, withMore){
  container.innerHTML = domains.map(d=>`<div class="card" data-domain="${d}"><span class="icon-tile" data-icon="${domainIcons[d]}" data-size="22"></span><h3 data-i18n="${d}_t"></h3><p data-i18n="${d}_d"></p>${withMore?`<span class="more"><span data-i18n="more">En savoir plus</span><span class="ico" data-icon="chevron" data-size="12"></span></span>`:''}</div>`).join('');
  container.querySelectorAll('.card').forEach(c=>c.addEventListener('click', ()=>showDetail(c.dataset.domain)));
  hydrateIcons(container);
}
buildDomainGrid(document.getElementById('expertises-grid'), true);
buildDomainGrid(document.getElementById('home-domain-grid'), true);

function showDetail(d){
  currentDetail = d;
  renderDetail();
  go('detail');
}
let currentDetail='d1';
function renderDetail(){
  const lang = document.documentElement.lang;
  document.getElementById('detail-title').textContent = i18n[lang][currentDetail+'_t'];
  document.getElementById('detail-desc').textContent = i18n[lang][currentDetail+'_d'];
  document.getElementById('detail-bullets').innerHTML = domainBullets[lang][currentDetail].map(b=>`<li>${b}</li>`).join('');
  const iconEl = document.getElementById('detail-icon');
  if (iconEl) iconEl.innerHTML = window.iconSvg(domainIcons[currentDetail], { size: 24 });
}

function go(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelectorAll('nav a[data-page]').forEach(a=>a.classList.toggle('current', a.dataset.page===page));
  window.scrollTo({top:0,behavior:'auto'});
  location.hash = page;
}
window.addEventListener('hashchange', ()=>{ const p=location.hash.replace('#','')||'accueil'; if(document.getElementById('page-'+p)) go(p==='detail'?'detail':p); });

/* carousel */
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.querySelector('.dots');
slides.forEach((s,i)=>{const b=document.createElement('button'); if(i===0)b.classList.add('active'); b.onclick=()=>setSlide(i); dotsWrap.appendChild(b);});
let cur=0;
function setSlide(i){
  slides[cur].classList.remove('active'); dotsWrap.children[cur].classList.remove('active');
  cur=i; slides[cur].classList.add('active'); dotsWrap.children[cur].classList.add('active');
}
let auto = setInterval(()=>setSlide((cur+1)%slides.length), 5500);
document.querySelector('.carousel').addEventListener('mouseenter',()=>clearInterval(auto));
document.querySelector('.carousel').addEventListener('mouseleave',()=>{auto=setInterval(()=>setSlide((cur+1)%slides.length), 5500);});

/* contact form -> mailto fallback (no backend on this demo site) */
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const lang = document.documentElement.lang;
  const name=document.getElementById('f_name').value, email=document.getElementById('f_email').value;
  const type=document.getElementById('f_type').value, msg=document.getElementById('f_msg').value;
  const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\nType de projet: ${type}\n\n${msg}`);
  window.location.href = `mailto:becogec23@gmail.com?subject=${encodeURIComponent('Demande de devis - '+name)}&body=${body}`;
});

const i18n = {
  fr:{disclaimer:"⚠ Site vitrine fictif, projet de démonstration en cours de développement — informations non contractuelles, à ne pas utiliser pour des transactions réelles.",
  tagline_small:"Construction & Génie Civil", navh:"Accueil", nav1:"Expertises", nav2:"Moyens", nav3:"Produits", nav4:"Contact", nav5:"Réalisations", nav_cta:"Demander un devis",
  hero_title:"Construire avec expertise. Exécuter avec rigueur. Livrer avec responsabilité.",
  hero_lead:"BECOGEC est une entreprise congolaise de Bâtiment, Travaux Publics et Génie Civil, de l'étude à la réalisation d'ouvrages durables.",
  hero_cta1:"Demander un devis", hero_cta2:"Voir nos expertises",
  s_r_t:"Routes, ouvrages d'art et infrastructures", s_r_d:"Un parc matériel propre — pelle, niveleuse, compacteur, camion-benne — pour exécuter sans dépendre de la sous-traitance.", s_r_cta:"Voir nos équipements",
  s_b_t:"Étude et exécution, une seule équipe", s_b_d:"Un bureau d'études de catégorie A intégré, pour une continuité maîtrisée entre conception et chantier.", s_b_cta:"Nos réalisations",
  stat1:"domaines d'intervention", stat2:"bureau d'études, catégorie A", stat3:"engins & équipements propres", stat4:"étapes de suivi de chantier",
  ads_eyebrow:"Actualités", ads_title:"Annonces & opportunités",
  ad1_t:"Devis gratuit ce mois-ci", ad1_d:"Toute étude préliminaire déposée ce mois bénéficie d'un devis gratuit.",
  ad2_t:"Location d'engins disponible", ad2_d:"Pelle, niveleuse et compacteur disponibles à la location pour partenaires.",
  ad3_t:"Pavés & blocs en vente", ad3_d:"Production de concassés, pavés et blocs autobloquants disponible à la vente.",
  ad4_t:"Recrutement", ad4_d:"BECOGEC renforce ses équipes techniques — contactez-nous pour candidater.",
  exp_eyebrow:"Nos domaines d'expertise", exp_title:"De l'étude à la réalisation",
  exp_desc:"BECOGEC intervient dans le bâtiment, les travaux publics, le génie civil et les infrastructures, au service des secteurs public et privé en RDC.",
  more:"En savoir plus", back:"Retour aux expertises",
  d1_t:"Bâtiment", d1_d:"Construction, réhabilitation et rénovation de bâtiments résidentiels, administratifs, scolaires, sanitaires et industriels.",
  d2_t:"Routes & Voiries", d2_d:"Ouverture, réhabilitation, entretien, terrassement, pavage et aménagement de voiries.",
  d3_t:"Génie civil", d3_d:"Ponts, dalots, ouvrages d'art, murs de soutènement et ouvrages en béton armé.",
  d4_t:"Hydraulique & assainissement", d4_d:"Réseaux d'évacuation, caniveaux, fossés, dalots et drainage.",
  d5_t:"Terrassement & érosion", d5_d:"Déblai, remblai, nivellement, stabilisation et protection des talus.",
  d6_t:"Bureau d'études", d6_d:"Études architecturales, structures, routes, hydrauliques, environnementales et contrôle des travaux.",
  moy_eyebrow:"Nos moyens", moy_title:"Un parc matériel pour des chantiers autonomes",
  moy_desc:"Équipements propres mobilisés directement sur nos chantiers, avec possibilité de location pour partenaires.",
  e1_t:"Pelle excavatrice", e1_d:"Caterpillar 320 D3 GC, sur chenilles", e2_t:"Niveleuse", e2_d:"Zoomlion PY190B",
  e3_t:"Compacteur", e3_d:"Caterpillar CB24B", e4_t:"Camion-benne", e4_d:"Sinotruk Howo 6x4, 30 tonnes",
  e5_t:"Concasseur", e5_d:"Production de concassés 2/8 pour pavés", e6_t:"Groupe électrogène", e6_d:"6 KVA avec poste à souder intégré",
  e7_t:"Machine à pavés", e7_d:"Production de pavés et blocs autobloquants", e8_t:"Panneaux & pompes solaires", e8_d:"Autonomie en eau et énergie sur site",
  e9_t:"Tricycles & échafaudages", e9_d:"Transport de matériaux, une vingtaine de modules",
  re_eyebrow:"Réalisations", re_title:"Types de projets que nous réalisons", re_desc:"Un aperçu des catégories de chantiers couvertes par nos équipes.",
  re1:"Résidentiel, administratif, scolaire, sanitaire, industriel.", re2:"Ouverture, réhabilitation, pavage, voiries urbaines.",
  re3:"Ponts, dalots, murs de soutènement.", re4:"Réseaux, caniveaux, ouvrages de drainage.", re5:"Stabilisation et protection contre l'érosion.", re6:"Architecture, structures, hydraulique, environnement.",
  re_note:"Références de chantiers spécifiques (photos, localisation, client) à ajouter dès disponibilité.",
  re_gal_eyebrow:"En images", re_gal_title:"Sur le terrain",
  pr_eyebrow:"Nos produits", pr_title:"Des matériaux pour construire durablement",
  pr_desc:"Production propre de matériaux de construction, disponibles pour nos chantiers et pour la vente.",
  p1_t:"Concassés", p1_d:"Granulats pour béton, voiries et aménagements.", p2_t:"Pavés", p2_d:"Pavés en béton pour voiries, parkings et espaces extérieurs.",
  p3_t:"Blocs autobloquants", p3_d:"Blocs pour la construction et l'aménagement.", p4_t:"Moellons", p4_d:"Matériaux rocheux pour différents ouvrages.",
  ap_eyebrow:"Notre approche", ap_title:"Une méthode claire, des résultats concrets",
  s1_t:"Analyser", s1_d:"Comprendre le projet, les besoins et les contraintes.", s2_t:"Préparer", s2_d:"Planifier les travaux et mobiliser équipes et matériel.",
  s3_t:"Installer", s3_d:"Mettre en place le chantier et organiser les équipes.", s4_t:"Exécuter", s4_d:"Réaliser les travaux avec rigueur, selon les plans.",
  s5_t:"Contrôler", s5_d:"Assurer la qualité et suivre l'avancement du chantier.", s6_t:"Livrer", s6_d:"Vérifications finales et remise de l'ouvrage au client.",
  w1_t:"Une expertise technique éprouvée", w1_d:"Une équipe d'ingénieurs et professionnels expérimentés dans différents domaines du génie civil en RDC.",
  w2_t:"Une capacité d'exécution propre", w2_d:"Un parc d'équipements propre, permettant une autonomie croissante sur les chantiers.",
  w3_t:"Une approche intégrée", w3_d:"Un bureau d'études intégré facilite la coordination entre conception et exécution.",
  w4_t:"Une organisation orientée résultats", w4_d:"Notre objectif : mener chaque chantier à son terme, dans les conditions convenues.",
  trust1:"<b>ARSP</b> Entreprise enregistrée en sous-traitance", trust2:"<b>Agrément ITP</b> Bureau d'études, catégorie A",
  ctp_eyebrow:"Contact", ct_title:"Vous avez un projet ? Parlons-en.", ct_desc:"Construction, voirie, génie civil, aménagement ou étude — nous sommes à votre écoute.", ct_cta:"Demander un devis",
  f_name:"Nom complet", f_email:"Email", f_type:"Type de projet", f_msg:"Message", f_send:"Envoyer la demande",
  ci_addr:"Adresse", ci_tel:"Téléphone", ci_mail:"Email", ci_soc:"Réseaux sociaux",
  foot_tag:"Bureau d'Études, Construction & Génie Civil", foot_h1:"Contact", foot_h2:"Navigation", foot_rights:"Tous droits réservés.", foot_fict:"Site fictif de démonstration.", foot_build:"Concevoir. Construire. Réaliser."},
  en:{disclaimer:"⚠ Fictional showcase site, a demo project still in development — non-contractual information, not for real transactions.",
  tagline_small:"Construction & Civil Engineering", navh:"Home", nav1:"Expertise", nav2:"Equipment", nav3:"Products", nav4:"Contact", nav5:"Projects", nav_cta:"Request a quote",
  hero_title:"Building with expertise. Executing with rigor. Delivering with responsibility.",
  hero_lead:"BECOGEC is a Congolese company in Building, Public Works and Civil Engineering, from design study through to delivery.",
  hero_cta1:"Request a quote", hero_cta2:"See our expertise",
  s_r_t:"Roads, structures and infrastructure", s_r_d:"Our own fleet — excavator, grader, compactor, dump truck — to execute without relying on subcontracting.", s_r_cta:"See our equipment",
  s_b_t:"Design and execution, one team", s_b_d:"An integrated category-A design office, for controlled continuity between design and site.", s_b_cta:"Our projects",
  stat1:"areas of expertise", stat2:"category-A design office", stat3:"own machines & equipment", stat4:"site follow-up steps",
  ads_eyebrow:"News", ads_title:"Announcements & opportunities",
  ad1_t:"Free quote this month", ad1_d:"Any preliminary study submitted this month gets a free quote.",
  ad2_t:"Equipment rental available", ad2_d:"Excavator, grader and compactor available for rental to partners.",
  ad3_t:"Paving blocks for sale", ad3_d:"Aggregate, paving blocks and interlocking blocks available for sale.",
  ad4_t:"Hiring", ad4_d:"BECOGEC is growing its technical teams — get in touch to apply.",
  exp_eyebrow:"Our areas of expertise", exp_title:"From design study to delivery",
  exp_desc:"BECOGEC works in building, public works, civil engineering and infrastructure, serving public and private sectors across DR Congo.",
  more:"Learn more", back:"Back to expertise",
  d1_t:"Building", d1_d:"Construction, rehabilitation and renovation of residential, administrative, school, health and industrial buildings.",
  d2_t:"Roads & Streets", d2_d:"Road opening, rehabilitation, maintenance, earthworks, paving and street development.",
  d3_t:"Civil Engineering", d3_d:"Bridges, culverts, engineering structures, retaining walls and reinforced-concrete works.",
  d4_t:"Water & Sanitation", d4_d:"Drainage networks, gutters, ditches, culverts and drainage works.",
  d5_t:"Earthworks & Erosion", d5_d:"Excavation, backfill, grading, stabilization and slope protection.",
  d6_t:"Design Office", d6_d:"Architectural, structural, road, hydraulic and environmental studies, plus works supervision.",
  moy_eyebrow:"Our equipment", moy_title:"A fleet built for self-sufficient sites",
  moy_desc:"Our own equipment mobilized directly on our sites, also available for rental to partners.",
  e1_t:"Excavator", e1_d:"Caterpillar 320 D3 GC, tracked", e2_t:"Grader", e2_d:"Zoomlion PY190B",
  e3_t:"Compactor", e3_d:"Caterpillar CB24B", e4_t:"Dump truck", e4_d:"Sinotruk Howo 6x4, 30 tons",
  e5_t:"Crusher", e5_d:"Produces 2/8 aggregate for paving blocks", e6_t:"Generator", e6_d:"6 KVA with built-in welding station",
  e7_t:"Paving-block machine", e7_d:"Produces paving blocks and interlocking blocks", e8_t:"Solar panels & pumps", e8_d:"On-site water and energy self-sufficiency",
  e9_t:"Tricycles & scaffolding", e9_d:"Material transport, around twenty scaffolding modules",
  re_eyebrow:"Projects", re_title:"Types of projects we deliver", re_desc:"An overview of the site categories our teams cover.",
  re1:"Residential, administrative, school, health, industrial.", re2:"Opening, rehabilitation, paving, urban streets.",
  re3:"Bridges, culverts, retaining walls.", re4:"Networks, gutters, drainage works.", re5:"Stabilization and erosion protection.", re6:"Architecture, structures, hydraulics, environment.",
  re_note:"Specific site references (photos, location, client) to be added once available.",
  re_gal_eyebrow:"In pictures", re_gal_title:"On the ground",
  pr_eyebrow:"Our products", pr_title:"Materials for building that lasts",
  pr_desc:"In-house production of construction materials, available for our sites and for sale.",
  p1_t:"Aggregate", p1_d:"Aggregate for concrete, roads and site development.", p2_t:"Paving blocks", p2_d:"Concrete paving blocks for roads, parking and outdoor areas.",
  p3_t:"Interlocking blocks", p3_d:"Blocks for construction and site development.", p4_t:"Rubble stone", p4_d:"Rock materials for various structures.",
  ap_eyebrow:"Our approach", ap_title:"A clear method, concrete results",
  s1_t:"Analyze", s1_d:"Understand the project, its needs and constraints.", s2_t:"Prepare", s2_d:"Plan the works and mobilize teams and equipment.",
  s3_t:"Set up", s3_d:"Set up the site and organize the teams.", s4_t:"Execute", s4_d:"Carry out the works rigorously, per the plans.",
  s5_t:"Control", s5_d:"Ensure quality and track site progress.", s6_t:"Deliver", s6_d:"Final checks and handover to the client.",
  w1_t:"Proven technical expertise", w1_d:"A team of engineers and professionals experienced across civil-engineering fields in DR Congo.",
  w2_t:"In-house execution capacity", w2_d:"Our own equipment fleet, giving growing autonomy on site.",
  w3_t:"An integrated approach", w3_d:"An in-house design office eases coordination between design and execution.",
  w4_t:"Results-driven organization", w4_d:"Our goal: carry every site through to completion, on the agreed terms.",
  trust1:"<b>ARSP</b> Registered subcontracting company", trust2:"<b>ITP licence</b> Category-A design office",
  ctp_eyebrow:"Contact", ct_title:"Have a project? Let's talk.", ct_desc:"Construction, roads, civil engineering, site development or studies — we're listening.", ct_cta:"Request a quote",
  f_name:"Full name", f_email:"Email", f_type:"Project type", f_msg:"Message", f_send:"Send request",
  ci_addr:"Address", ci_tel:"Phone", ci_mail:"Email", ci_soc:"Social media",
  foot_tag:"Design, Construction & Civil Engineering Office", foot_h1:"Contact", foot_h2:"Navigation", foot_rights:"All rights reserved.", foot_fict:"Fictional demo site.", foot_build:"Design. Build. Deliver."}
};
function setLang(lang){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n'); const val = i18n[lang][key];
    if(val!==undefined) el.innerHTML = val;
  });
  document.querySelectorAll('.langbtns button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  renderDetail();
  try{localStorage.setItem('becogec-lang', lang);}catch(e){}
}
document.querySelectorAll('.langbtns button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
let saved='fr'; try{saved = localStorage.getItem('becogec-lang') || 'fr';}catch(e){}
setLang(saved);
document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click', ()=>go(el.dataset.nav)));
document.querySelectorAll('nav a[data-page]').forEach(el=>el.addEventListener('click', ()=>go(el.dataset.page)));

const startPage = location.hash.replace('#','');
if(startPage && document.getElementById('page-'+startPage)) go(startPage); else go('accueil');

hydrateIcons(); // fill every static [data-icon] placeholder (header, hero, ads, moyens, produits, timeline, why-us, trust, contact, footer)
