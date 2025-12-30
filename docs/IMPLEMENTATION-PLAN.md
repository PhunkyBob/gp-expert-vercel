# Plan d'Implémentation - Landing Page Wealth AI Co-pilot
**Parallaxe Immersive & Animations 3D**

---

## 🎯 Objectif

Créer une landing page hyper-moderne avec effets de parallaxe pour convertir les experts (CGP, Experts-comptables, Avocats) sur une liste d'attente prioritaire.

**Promesse :** "Éliminez 90% de la saisie administrative. L'IA gère l'ingénierie, vous gérez l'humain."

---

## 🛠 Stack Technique

### Core Framework
- **Next.js 14+ (App Router)** - Pour le SEO, Server Components, et performance
- **TypeScript** - Typage strict pour la maintenance
- **Tailwind CSS** - Styling rapide et responsive
- **shadcn/ui** - Composants UI accessibles et personnalisables

### Animation & 3D
- **Framer Motion** - Animations scroll, transitions, interactions fluides
- **React Three Fiber (R3F)** - React renderer pour Three.js
- **@react-three/drei** - Helpers pour R3F (controls, loadings, etc.)
- **Lenis (Studio Freight)** - Smooth scroll pour animations fluides
- **Lucide React** - Iconographie moderne

### Forms & Data
- **React Hook Form** - Gestion performante des formulaires
- **Zod** - Validation de schémas (client & serveur)
- **Resend / React Email** - Notifications par email

---

## 📐 Structure du Projet

```
gp-expert/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Landing page principale
│   ├── globals.css             # Styles globaux Tailwind
│   └── api/
│       └── waitlist/
│           └── route.ts        # API endpoint pour inscription waitlist
├── components/
│   ├── ui/                     # Composants shadcn/ui
│   ├── sections/               # Sections de la landing page
│   │   ├── HeroSection.tsx    # Section A - Globe 3D
│   │   ├── GhostwriterSection.tsx  # Section B - STT & IA
│   │   ├── VaultSection.tsx   # Section C - Agrégation 360°
│   │   ├── EngineSection.tsx  # Section D - Ingénierie
│   │   ├── AssistantSection.tsx    # Section E - RAG
│   │   └── CTASection.tsx     # Formulaire d'inscription
│   ├── 3d/                     # Composants 3D
│   │   └── DataGlobe.tsx      # Globe de données 3D
│   ├── animations/            # Utilitaires d'animation
│   └── layout/                 # Layout components (Header, Footer)
├── lib/                        # Utilitaires
│   ├── utils.ts                # Fonctions utilitaires
│   └── validations.ts          # Schémas Zod
├── hooks/                      # Custom React hooks
│   └── use-smooth-scroll.ts    # Hook pour Lenis smooth scroll
└── public/                     # Assets statiques
```

---

## 🎨 Design System

### Palette de Couleurs
```css
/* Primary - Deep Navy & Electric Blue */
--primary: #0a0e27;           /* Background principal */
--secondary: #1e293b;         /* Sections alternées */
--accent: #3b82f6;            /* Electric blue - Actions */
--accent-glow: #60a5fa;       /* Glow effect */
--gold: #fbbf24;              /* Premium accents */

/* Text */
--text-primary: #f8fafc;
--text-secondary: #94a3b8;
--text-muted: #64748b;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
--gradient-gold: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
```

### Typography
```css
/* Font: Inter + JetBrains Mono (code) */
--font-heading: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Spacing & Layout
- Container max-width: 1400px
- Section min-height: 100vh
- Padding horizontal: 1.5rem (mobile), 4rem (desktop)

---

## 🎬 Structure & Animations Parallaxe

### A. Section Hero (L'Impact)

**Contenu :**
- Titre principal : "L'Intelligence Artificielle au service de l'Excellence Patrimoniale."
- Sous-titre : "Ne soyez plus un gestionnaire de données. Devenez l'architecte du futur de vos clients."
- CTA : "Suivre l'évolution du projet"

**Animation (Parallaxe) :**
- **Scroll progress 0-30%** : Le titre principal s'éloigne (scale down, opacity decrease)
- **Scroll progress 0-30%** : L'interface de l'application "monte" vers l'utilisateur depuis le bas de l'écran
- **Globe 3D** : Positionné à gauche, pulse doucement (scale 0.95 → 1.05 en boucle)
- **Données flottantes** : Particules de données orbitent autour du globe

**Implémentation technique :**
```typescript
// Framer Motion useScroll + useTransform
const { scrollYProgress } = useScroll();
const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
const interfaceY = useTransform(scrollYProgress, [0, 0.3], [400, 0]);
```

**Composant 3D :** `DataGlobe.tsx` - Sphere avec particules et lignes de connexion (wireframe style)

---

### B. Module Ghostwriter (🎙️ STT & IA)

**Contenu :**
- Titre : "Écoutez. L'IA s'occupe du reste. 0 minute de saisie post-RDV."
- Visuel gauche : Onde sonore organique qui pulse
- Visuel droite : Fiche client qui se remplit automatiquement avec les données

**Animation (Parallaxe) :**
- **Scroll progress 30-50%** : Apparition progressive de l'onde sonore (draw SVG)
- **Scroll progress 30-50%** : Les mots de l'onde se transforment en données structurées qui remplissent la fiche client à droite
- **Stagger animation** : Chaque champ de la fiche se remplit successivement (Nom → Profession → Patrimoine → Fiscalité)

**Implémentation technique :**
```typescript
// Wave effect via SVG path animation
// Form fill via stagger children
const fields = [
  { label: "Nom", value: "M. Martin Dupont" },
  { label: "Profession", value: "Chef d'entreprise" },
  { label: "Patrimoine", value: "2.3M€" },
  { label: "Fiscalité", value: "IR + IFI" }
];

// Framer Motion staggerChildren
<motion.div variants={container} initial="hidden" whileInView="visible">
  {fields.map((field, i) => (
    <motion.div variants={item} custom={i}>
      <Label>{field.label}</Label>
      <Value>{field.value}</Value>
    </motion.div>
  ))}
</motion.div>
```

---

### C. Module The Vault (💎 Agrégation 360°)

**Contenu :**
- Titre : "Votre vue panoramique, sans l'effort. Mise à jour à la seconde."
- Visuel : Origami de logos bancaires et immobiliers
- Transition : La mosaïque se replie pour former un graphique "Donut" parfait du patrimoine total

**Animation (Parallaxe) :**
- **Scroll progress 50-70%** : Logos bancaires apparaissent en mosaïque (grid 3x3)
- **Scroll progress 60-70%** : La mosaïque se replie avec une animation de type "origami fold"
- **Scroll progress 70-80%** : Les logos se recomposent pour former un donut chart circulaire
- **Donut chart** : Sections colorées représentant la répartition du patrimoine (Immobilier 45%, Assurance-vie 30%, Actions 25%)

**Implémentation technique :**
```typescript
// SVG morphing avec Framer Motion
// Donut chart avec réanimation scroll-based
const segments = [
  { label: "Immobilier", value: 45, color: "#3b82f6" },
  { label: "Assurance-vie", value: 30, color: "#8b5cf6" },
  { label: "Actions", value: 25, color: "#fbbf24" }
];

// Transition scroll-based
const mosaicVisible = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
const donutVisible = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
```

---

### D. Module The Engine (🔥 Ingénierie & Simulations)

**Contenu :**
- Titre : "Transformez des heures de calcul en secondes de décision."
- Visuel : Graphique de projection de patrimoine sur 30 ans
- Animation : Une barre de simulation "nettoie" les zones rouges (impôts) au passage du scroll

**Animation (Parallaxe) :**
- **Scroll progress 80-100%** : Graphique de projection apparaît (line chart 30 ans)
- **Scroll progress 85-100%** : Une barre verticale (scanner) se déplace de gauche à droite
- **Effet scanner** : Au passage de la barre, les zones rouges (impôts élevés) disparaissent et sont remplacées par des zones vertes (optimisées)
- **Comparaison** : Deux courbes - rouge (sans optimisation) vs verte (avec optimisation)

**Implémentation technique :**
```typescript
// Line chart avec SVG + Framer Motion pathLength
// Scanner effect via motion.div with linear-gradient mask
const scannerX = useTransform(scrollYProgress, [0.85, 1], [0, 100], {
  clamp: false
});

// Mask reveal optimized path
<motion.div
  style={{ x: scannerX }}
  className="absolute h-full w-1 bg-gradient-to-b from-transparent via-green-500 to-transparent"
/>
```

---

### E. Module The Assistant (📖 RAG & Intelligence)

**Contenu :**
- Titre : "Votre expert juridique interne, disponible 24/7. Certitude juridique absolue."
- Visuel : Champ de recherche lumineux sur fond de codes de loi défilants
- Interactive : Champ de recherche fonctionnel (demo) avec résultat IA simulé

**Animation (Parallaxe) :**
- **Scroll progress 100-120%** : Fond de codes de loi qui défilent en parallaxe (background parallax)
- **Scroll progress 105-120%** : Champ de recherche apparaît avec glow effect
- **Input interaction** : Quand l'utilisateur tape une question → Animation de recherche (loader) → Résultat IA s'affiche typewriter style

**Implémentation technique :**
```typescript
// Background parallax via CSS transform: translateY
// Typewriter effect pour le résultat IA
const [query, setQuery] = useState("");
const [result, setResult] = useState("");
const [isSearching, setIsSearching] = useState(false);

// Simulation RAG response
const handleSearch = async () => {
  setIsSearching(true);
  await new Promise(r => setTimeout(r, 1500)); // Simulate API call
  setResult("Selon l'article 885 A du Code Général des Impôts, l'IFI...");
  setIsSearching(false);
};
```

---

### F. Section CTA & Formulaire

**Contenu :**
- Titre : "Rejoignez l'avenir du conseil patrimonial"
- Formulaire :
  1. Nom & Prénom
  2. Profession (CGP, Expert-comptable, Avocat, Banquier)
  3. Taille du cabinet (nombre de conseillers, nombre de clients sous gestion)
  4. "Quel est votre plus gros point de douleur actuel ?" (Champ libre)
- Bouton : "Suivre l'évolution du projet"

**Animation :**
- **Scroll progress > 120%** : Formulaire apparaît avec stagger animation
- **Input focus** : Glow effect sur les champs actifs
- **Submit** : Animation de succès + confetti

**Validation :** Zod schema + React Hook Form

---

## ⚡ Performance Optimisation

### 1. Code Splitting & Lazy Loading
```typescript
// Lazy load 3D components
const DataGlobe = dynamic(() => import('@/components/3d/DataGlobe'), {
  loading: () => <GlobeSkeleton />,
  ssr: false // Three.js needs browser environment
});
```

### 2. 3D Performance
- Utiliser `useMemo` pour la géométrie du globe
- Limiter le nombre de particules (max 1000)
- Utiliser `InstancedMesh` pour les particules
- Réduire le polygon count

### 3. Smooth Scroll Performance
- Lenis avec `raf` pour RequestAnimationFrame
- Désactiver Lenis sur mobile pour éviter jank
- Fallback CSS smooth scroll

### 4. Image Optimization
- Next.js Image component
- WebP format
- Lazy load below-the-fold images

### 5. CSS Performance
- Utiliser `will-change` pour les éléments animés
- Éviter le reflow pendant les animations
- Utiliser `transform` et `opacity` uniquement (GPU-accelerated)

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
  /* Stack all sections vertically */
  /* Simplify 3D globe (less particles) */
  /* Disable smooth scroll */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  /* Side-by-side layouts for some sections */
  /* Moderate 3D globe */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Full parallax experience */
  /* High-quality 3D globe */
}
```

### Touch Device Detection
```typescript
// Disable complex animations on touch devices
const isTouch = 'ontouchstart' in window;
```

---

## 🔐 Accessibilité (a11y)

- Semantic HTML (section, h1-h6, nav, main, footer)
- ARIA labels pour les éléments interactifs
- Focus management
- Keyboard navigation
- Screen reader support
- Color contrast ratio WCAG AA
- Reduced motion preference (`prefers-reduced-motion`)

---

## 🚀 Deployment

### Vercel (Recommended)
- Automatic SSL
- CDN edge caching
- Preview deployments
- Analytics

### Environment Variables
```env
# Resend API Key (email notifications)
RESEND_API_KEY=your_resend_api_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

---

## 📝 Next Steps

### Phase 1: Initialisation (15 min)
1. `npx create-next-app@latest` avec TypeScript, Tailwind, ESLint, App Router
2. Installer les dépendances
3. Configurer shadcn/ui

### Phase 2: Structure de base (30 min)
1. Créer la structure des dossiers
2. Mettre en place le Layout principal
3. Configurer le smooth scroll (Lenis)

### Phase 3: Sections statiques (45 min)
1. Implementer chaque section avec le contenu texte
2. Ajouter les animations Framer Motion de base
3. Tester sur desktop et mobile

### Phase 4: 3D & Animations avancées (60 min)
1. Implémenter le Globe 3D (DataGlobe.tsx)
2. Ajouter les animations de parallaxe complexes
3. Optimiser les performances

### Phase 5: Formulaire & Backend (30 min)
1. Créer le formulaire CTA avec React Hook Form + Zod
2. Implémenter l'API endpoint `/api/waitlist`
3. Intégrer Resend pour les notifications email

### Phase 6: Testing & Optimization (30 min)
1. Lighthouse performance audit
2. Cross-browser testing
3. Responsiveness testing
4. Accessibility audit

**Temps total estimé :** ~3-4 heures

---

## 📚 Références & Inspiration

- **Parallaxe :** [Framer Motion Parallax](https://www.framer.com/motion/parallax/)
- **3D Globe :** [React Three Fiber Examples](https://docs.pmnd.rs/react-three-fiber/examples)
- **Smooth Scroll :** [Lenis Documentation](https://github.com/studio-freight/lenis)
- **Animations :** [Framer Motion Scroll Animations](https://www.framer.com/motion/scroll/)

---

## ✅ Checklist d'Implémentation

- [ ] Initialiser le projet Next.js avec toutes les dépendances
- [ ] Configurer Tailwind et le design system
- [ ] Implémenter le smooth scroll (Lenis)
- [ ] Créer le Layout et la structure de base
- [ ] Section Hero avec Globe 3D
- [ ] Section Ghostwriter avec ondes sonores
- [ ] Section Vault avec mosaïque → donut chart
- [ ] Section Engine avec graphique de projection
- [ ] Section Assistant avec recherche RAG
- [ ] Section CTA avec formulaire
- [ ] API endpoint pour inscription waitlist
- [ ] Intégration email (Resend)
- [ ] Optimisation performance (Lighthouse > 90)
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Test cross-browser (Chrome, Safari, Firefox)
- [ ] Accessibilité audit (WCAG AA)
- [ ] Deploy sur Vercel
