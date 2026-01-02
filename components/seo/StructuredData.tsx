export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Wealth IA",
    description: "L'Intelligence Artificielle au service de l'excellence patrimoniale.",
    url: "https://www.wealthia.fr",
    logo: "https://www.wealthia.fr/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["French"],
    },
    sameAs: [
      "https://linkedin.com/company/wealth-ia",
    ],
  }

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Wealth IA",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      description: "Inscription gratuite sur liste d'attente",
    },
    description: "Plateforme SaaS révolutionnaire pour les professionnels de la gestion de patrimoine. Intelligence artificielle pour l'ingénierie patrimoniale, l'agrégation 360° des données et la simulation fiscale.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "127",
    },
    featureList: [
      "Transcription temps réel (STT)",
      "Agrégation de données bancaires et immobilières",
      "Simulateurs fiscaux (IR, IFI, IS)",
      "Assistant juridique IA",
      "Collaboration multi-experts",
      "Chiffrement AES-256",
    ],
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Wealth IA",
    url: "https://www.wealthia.fr",
    description: "L'Intelligence Artificielle au service de l'excellence patrimoniale",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.wealthia.fr/search?q={search_term_string}",
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        valueRequired: true,
        valueName: "search_term_string",
      },
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Comment fonctionne Wealth IA ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wealth IA utilise l'intelligence artificielle pour automatiser la saisie administrative, agréger les données financières de vos clients en temps réel, et simuler des scénarios patrimoniaux complexes en quelques secondes.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles professions peuvent utiliser Wealth IA ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La plateforme est conçue pour les Conseillers en Gestion de Patrimoine (CGP), Experts-Comptables, Avocats en droit patrimonial, et Banquiers privés.",
        },
      },
      {
        "@type": "Question",
        name: "Mes données sont-elles sécurisées ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolument. Vos données sont hébergées sur des serveurs certifiés HDS/SecNumCloud en France/UE, chiffrées en AES-256, et nos modèles d'IA sont isolés. Aucun entraînement sur les données clients n'est effectué.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles sont les fonctionnalités principales ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ghostwriter (transcription STT + OCR IA), The Vault (agrégation 360°), The Engine (simulations fiscales), et The Assistant (intelligence juridique RAG).",
        },
      },
      {
        "@type": "Question",
        name: "Comment rejoindre la liste d'attente ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Remplissez le formulaire de qualification en bas de page. Vous serez contacté dès qu'une place se libère pour l'accès Alpha.",
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
