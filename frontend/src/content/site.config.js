// Fallback local si le JSON distant n'est pas accessible
const siteConfig = {
  profile: {
    // ⚠️ Remplace fullName / avatar / cover si besoin
    fullName: "Corine Raphaëlla Koua",
    role: "Chargée de communication d’entreprise",

    avatar: "/images/Soldat.png",
    cover: "/images/couverture.jpg"
  },

  contact: {
    phone: "0708144967", 
    email: "Corineraphaellak@gmail.com", 
    formEmail: "Corineraphaellak@gmail.com" 
  },

  copy: {
    heroBubbleTitle: [
      "Communication d’entreprise",
      "Community management"
    ],
    heroBubbleSubtitle:
      "Créative, dynamique et organisée. Communication stratégique, digitale et image de marque."
  },

  experiences: [
    {
      title: "Employée — Cyber (Brouservice)",
      date: "2023",
      description:
        "Accueil et assistance clients, services bureautiques, impression/scans, accompagnement sur les démarches en ligne."
    },
    {
      title: "Promotrice — Dinor (Magasins Carrefour)",
      date: "Date à préciser",
      description:
        "Promotion produit en point de vente, animation commerciale, conseil client et mise en avant des offres."
    },
    {
      title: "Promotrice — Betclic (Mother Africa)",
      date: "Date à préciser",
      description:
        "Animation terrain, présentation de l’offre, orientation des clients et soutien à la visibilité de la marque."
    },
    {
      title: "Community Manager — Web Radio Grâce Espoir",
      date: "Date à préciser",
      description:
        "Gestion des réseaux sociaux, création de contenus, planification des publications, interaction et fidélisation de la communauté."
    },
    {
      title: "Community Manager — Elphelys (lancement de marque)",
      date: "Date à préciser",
      description:
        "Accompagnement du lancement : contenus, image de marque, calendrier éditorial et animation de communauté."
    },
    {
      title: "Community Manager — Cabinet FPA",
      date: "Date à préciser",
      description:
        "Communication digitale, gestion des messages, publications et soutien à la notoriété en ligne."
    }
  ],

  services: [
    {
      emoji: "📣",
      title: "Communication d’entreprise",
      short: "Structurer ta communication interne et externe.",
      points: [
        "Stratégie et plan de communication",
        "Messages institutionnels",
        "Supports de communication"
      ]
    },
    {
      emoji: "📱",
      title: "Community management",
      short: "Animer et faire grandir ta communauté.",
      points: [
        "Calendrier éditorial",
        "Modération et réponses",
        "Animation & engagement"
      ]
    },
    {
      emoji: "🎬",
      title: "Création de contenus",
      short: "Contenus adaptés à Facebook, Instagram, TikTok.",
      points: [
        "Visuels (Canva)",
        "Montage vidéo (CapCut)",
        "Storytelling & rédaction"
      ]
    },
    {
      emoji: "📊",
      title: "Reporting & performance",
      short: "Suivre ce qui marche et ajuster.",
      points: [
        "Analyse des statistiques",
        "Optimisation des contenus",
        "Recommandations d’actions"
      ]
    }
  ],

  socials: {
    facebook: "Corine Raphaëlla Koua",
    instagram: "",
    tiktok: "",
    whatsapp: "+225 70 81 44 96 7",
    email: "Corineraphaellak@gmail.com"
  },

  projects: [
    {
      id: 1,
      title: "Lancement digital — Elphelys",
      description:
        "Mise en place du contenu et de l’animation pour soutenir le lancement de la marque.",
      technologies: ["Canva", "CapCut", "Instagram", "TikTok", "Facebook"],
      image:
        "https://images.unsplash.com/photo-1520975958225-403bba5b3f9b?q=80&w=1470&auto=format",
      link: "#",
      isExternal: false,
      status: "completed"
    },
    {
      id: 2,
      title: "Animation communauté — Web Radio Grâce Espoir",
      description:
        "Création de contenus, planification, interaction et suivi des performances sur les réseaux.",
      technologies: ["Facebook", "Instagram", "Canva", "Planning"],
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1470&auto=format",
      link: "#",
      isExternal: false,
      status: "completed"
    },
    {
      id: 3,
      title: "Projet personnel — Présence & image",
      description:
        "Développement de l’image personnelle, participation à des activités (ex: Miss intercommunal) et communication autour des projets.",
      technologies: ["Personal branding", "Storytelling", "Réseaux sociaux"],
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1470&auto=format",
      link: "#",
      isExternal: false,
      status: "in-progress"
    }
  ],

  cv: {
    url: "/docs/cv.pdf",
    fileName: "CV-Communication.pdf"
  }
};

export default siteConfig;
