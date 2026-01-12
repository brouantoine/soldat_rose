// Fallback local si le JSON distant n'est pas accessible
const siteConfig = {
  profile: {
    fullName: "Corine Raphaëlla Koua",
    role: "Chargée de communication d’entreprise",
    avatar: "/images/Corine.jpeg",
    cover: "/images/Koua.jpeg"
  },

  contact: {
    phone: "0708144967",
    email: "Corineraphaellak@gmail.com",
    formEmail: "Corineraphaellak@gmail.com"
  },

  copy: {
    heroBubbleTitle: ["Communication d’entreprise", "Community management"],
    heroBubbleSubtitle:
      "Créative, dynamique et organisée. Communication stratégique, digitale et image de marque."
  },

  experiences: [
    {
      title: "Community Manager — Elphelys",
      date: "Déc. 2025",
      description: "Lancement du projet, création de contenus et animation des réseaux sociaux."
    },
    {
      title: "Social Media Manager — Cabinet FPA",
      date: "Oct. – Déc. 2024",
      description: "Gestion des réseaux, création de contenus et suivi des performances."
    },
    {
      title: "Promotrice — Betclic (Mother Africa Festival)",
      date: "Déc. 2024",
      description: "Promotion de la marque et interaction avec le public."
    },
    {
      title: "3ᵉ Dauphine — Miss Projet Intercommunal",
      date: "Déc. 2024",
      description: "Participation au concours et représentation lors des activités officielles."
    },
    {
      title: "Entrepreneure & Créatrice de contenus",
      date: "Juil. 2024 – Aujourd’hui",
      description: "Gestion d’un projet personnel et création de contenus digitaux."
    },
    {
      title: "Stage Community Manager — Radio Grâce Espoir",
      date: "Jan. – Juil. 2024",
      description: "Création de contenus, animation des réseaux sociaux et appui à la communication."
    },
    {
      title: "Stage RH — Ministère de l’Économie, Plan et Développement",
      date: "2023",
      description: "Appui aux activités RH et gestion administrative (stage)."
    },
    {
      title: "Commerciale / Promotrice — Dinor (Carrefour Coco Mall)",
      date: "Déc. 2023",
      description: "Promotion en point de vente, conseil client et mise en avant des produits."
    },
    {
      title: "Employée — Cyber Café",
      date: "Août – Nov. 2023",
      description: "Accueil clients, impression/scans, services bureautiques et assistance numérique."
    }
  ],

  services: [
    {
      emoji: "📣",
      title: "Communication d’entreprise",
      short: "Structurer ta communication interne et externe.",
      points: ["Stratégie et plan de communication", "Messages institutionnels", "Supports de communication"]
    },
    {
      emoji: "📱",
      title: "Community management",
      short: "Animer et faire grandir ta communauté.",
      points: ["Calendrier éditorial", "Modération et réponses", "Animation & engagement"]
    },
    {
      emoji: "🎬",
      title: "Création de contenus",
      short: "Contenus adaptés à Facebook, Instagram, TikTok.",
      points: ["Visuels (Canva)", "Montage vidéo (CapCut)", "Storytelling & rédaction"]
    },
    {
      emoji: "📊",
      title: "Reporting & performance",
      short: "Suivre ce qui marche et ajuster.",
      points: ["Analyse des statistiques", "Optimisation des contenus", "Recommandations d’actions"]
    }
  ],

  socials: {
    facebook: "https://facebook.com/",
    instagram: "",
    tiktok: "",
    whatsapp: "https://wa.me/225708144967",
    email: "mailto:Corineraphaellak@gmail.com"
  },

  projects: [
    {
      id: 1,
      title: "Lancement digital — Elphelys",
      description: "Création de contenus et animation des réseaux sociaux pour le lancement du projet.",
      technologies: ["Canva", "CapCut", "Instagram", "Facebook"],
      image: "https://images.unsplash.com/photo-1520975958225-403bba5b3f9b?q=80&w=1470&auto=format",
      link: "#",
      isExternal: false,
      status: "completed"
    },
    {
      id: 2,
      title: "Social media — Cabinet FPA",
      description: "Gestion des réseaux, création de contenus et suivi des performances (Oct. – Déc. 2024).",
      technologies: ["Création de contenus", "Reporting", "Réseaux sociaux"],
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1470&auto=format",
      link: "#",
      isExternal: false,
      status: "completed"
    },
    {
      id: 3,
      title: "Projet personnel — Création de contenus",
      description: "Création de contenus digitaux et développement de la présence en ligne (Juil. 2024 – aujourd’hui).",
      technologies: ["Personal branding", "Storytelling", "Réseaux sociaux"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1470&auto=format",
      link: "#",
      isExternal: false,
      status: "in-progress"
    }
  ],

  cv: {
    url: "/docs/cv.pdf",
    fileName: "CV-Corine-Raphaella-Koua.pdf"
  }
};

export default siteConfig;
