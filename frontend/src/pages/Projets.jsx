import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import '../styles/Projets.css';
import useRemoteContent from '../hooks/useRemoteContent';

const Projets = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const content = useRemoteContent();
  const projetsData = content.projects || [];

  return (
    <motion.div
      className="projets-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="projets-header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Projets & Réalisations
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="subtitle"
        >
          Communication d’entreprise • Community management • Contenus
        </motion.p>
      </div>

      <div className="projets-grid">
        <AnimatePresence>
          {projetsData.map((projet, index) => (
            <motion.div
              key={projet.id || index}
              className={`projet-card ${projet.status}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }
              }}
              whileHover={
                !isMobile
                  ? { y: -8, transition: { type: 'spring', stiffness: 400, damping: 10 } }
                  : {}
              }
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              exit={{ opacity: 0 }}
              layout
            >
              <motion.div
                className="projet-image-container"
                whileHover={!isMobile ? { scale: 1.03 } : {}}
                transition={{ duration: 0.4 }}
              >
                <img src={projet.image} alt={projet.title} loading="lazy" />

                {projet.status === "in-progress" && (
                  <motion.div
                    className="status-badge"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    En cours
                  </motion.div>
                )}

                <div className="technologies-badge">
                  {projet.technologies?.map((tech, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <div className="projet-content">
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {projet.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  {projet.description}
                </motion.p>

                <motion.div
                  className="projet-actions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.a
                    href={projet.link || "#"}
                    className="action-button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    target={projet.isExternal ? "_blank" : undefined}
                    rel={projet.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {projet.status === "in-progress" ? "Voir le projet" : "Voir le projet"}
                    {projet.isExternal && (
                      <span className="external-link-icon" aria-hidden="true">
                        {" "}↗
                      </span>
                    )}
                  </motion.a>

                  {projet.source && (
                    <motion.a
                      href={projet.source}
                      className="action-button secondary"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ressources
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Projets;
