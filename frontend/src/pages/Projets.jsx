import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import '../styles/Projets.css';
import useRemoteContent from '../hooks/useRemoteContent';

import { RiBriefcaseLine, RiCalendar2Line, RiArrowRightUpLine } from 'react-icons/ri';

const Projets = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const content = useRemoteContent();

  // ✅ On affiche les expériences (pas les projects)
  const experiences = content.experiences || [];

  return (
    <motion.div
      className="xp-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="xp-header">
        <motion.h1
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Expériences
        </motion.h1>

        <motion.p
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="xp-subtitle"
        >
          Communication d’entreprise • Community management • Contenus
        </motion.p>
      </div>

      <div className="xp-timeline" aria-label="Timeline des expériences">
        {experiences.map((exp, index) => (
          <motion.article
            key={`${exp.title}-${index}`}
            className="xp-item"
            initial={{ y: 18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: isMobile ? '0px' : '0px 0px -60px 0px' }}
            transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="xp-left">
              <div className="xp-date">
                <RiCalendar2Line className="xp-ico" />
                <span>{exp.date}</span>
              </div>
              <div className="xp-line" aria-hidden="true" />
            </div>

            <div className="xp-card">
              <div className="xp-card-top">
                <div className="xp-title">
                  <RiBriefcaseLine className="xp-ico" />
                  <h3>{exp.title}</h3>
                </div>

                {/* Optionnel : si un jour tu ajoutes exp.link */}
                {exp.link && (
                  <a
                    className="xp-link"
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ouvrir le lien"
                    title="Ouvrir"
                  >
                    <RiArrowRightUpLine />
                  </a>
                )}
              </div>

              <p className="xp-desc">{exp.description}</p>

              {/* Optionnel : si un jour tu ajoutes exp.tags = ["Canva","CapCut"] */}
              {Array.isArray(exp.tags) && exp.tags.length > 0 && (
                <div className="xp-tags">
                  {exp.tags.map((t) => (
                    <span className="xp-tag" key={t}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default Projets;
