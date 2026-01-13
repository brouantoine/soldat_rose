// src/pages/Home.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { useState } from 'react';
import { RiSendPlaneFill, RiUserFill, RiMailFill, RiMessage2Fill } from 'react-icons/ri';

import useRemoteContent from '../hooks/useRemoteContent';
import { ageFrom } from '../utils/age';

const Home = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // ✅ Protection : si le hook renvoie null au début, on garde un objet vide
  const content = useRemoteContent() || {};

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const targetEmail =
        content?.contact?.formEmail ||
        content?.contact?.email ||
        'brouantoineassanvo@gmail.com';

      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok || result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  // ✅ Toujours sécuriser : si ce n’est pas un array, on met []
  const experiences = Array.isArray(content?.experiences) ? content.experiences : [];
  const services = Array.isArray(content?.services) ? content.services : [];
  const interests = Array.isArray(content?.interests) ? content.interests : [];

  const roleLabel = content?.profile?.role || "Chargée de communication d’entreprise";
  const nameLabel = content?.profile?.fullName || '—';
  const ageLabel = content?.profile?.birthdate ? `${ageFrom(content.profile.birthdate)} ans` : null;

  // ✅ Images depuis le JSON (si absent => évite d’afficher une image cassée)
  const coverSrc = content?.profile?.cover || '';
  const avatarSrc = content?.profile?.avatar || '';

  const heroTitle1 = content?.copy?.heroBubbleTitle?.[0] || "Communication d’entreprise";
  const heroTitle2 = content?.copy?.heroBubbleTitle?.[1] || "Community management";
  const heroSubtitle = content?.copy?.heroBubbleSubtitle || "Communication stratégique, digitale et image de marque.";

  return (
    <div className="portfolio-container">
      {/* HERO */}
      <section className="hero-section">
        {/* Couverture */}
        <div className="hero-cover">
          {coverSrc ? (
            <img
              src={coverSrc}
              alt=""
              className="hero-cover-image"
              loading="lazy"
            />
          ) : (
            <div className="hero-cover-image" />
          )}
        </div>

        <div className="hero-content">
          <motion.div
            className="profile-text-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="profile-container"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 110, damping: 14 }}
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={nameLabel}
                  className="profile-image"
                  loading="lazy"
                />
              ) : (
                <div className="profile-image" />
              )}

              <motion.div
                className="profile-decoration"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.22 }}
                transition={{ delay: 0.25, type: 'spring', stiffness: 160 }}
              />
            </motion.div>

            <motion.div
              className="profile-side-text"
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div className="text-bubble">
                <p className="bubble-text">
                  <span className="highlight">{heroTitle1}</span>,
                  <span className="highlight"> {heroTitle2}</span>
                </p>
                <p className="bubble-subtext">
                  {heroSubtitle}
                </p>
              </div>
              <div className="text-arrow" />
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-text"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1>
              {nameLabel}
              <motion.span
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {roleLabel}{ageLabel ? ` • ${ageLabel}` : ''}
              </motion.span>
            </h1>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <Link to="/cv" style={{ textDecoration: 'none' }}>
                <motion.button className="action-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  CV
                </motion.button>
              </Link>

              <Link to="/projets" style={{ textDecoration: 'none' }}>
                <motion.button className="action-button secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Projets
                </motion.button>
              </Link>

              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <motion.button className="action-button secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Contact
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PARCOURS — serré */}
      <motion.section
        id="cv"
        className="section cv-section tight"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -36px 0px' }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="section-title"
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Expériences
        </motion.h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp?.title || 'exp'}-${index}`}
              className="timeline-item"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -22px 0px' }}
              transition={{ delay: index * 0.12 + 0.2 }}
            >
              <h3>{exp?.title}</h3>
              <p className="timeline-date">{exp?.date}</p>
              <p className="timeline-description">{exp?.description}</p>
              <div className="timeline-dot" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CENTRES D’INTÉRÊT — après expériences (tirés du JSON) */}
      {interests.length > 0 && (
        <motion.section
          id="loisirs"
          className="section interests-section alt tight"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -36px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="section-title"
            initial={{ y: 14, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            Centres d’intérêt
          </motion.h2>

          <div className="interests-wrap">
            {interests.map((it, index) => {
              const label = typeof it === 'string' ? it : (it?.label || '—');
              const emoji = typeof it === 'string' ? '✨' : (it?.emoji || '✨');
              const note = typeof it === 'string' ? '' : (it?.note || '');

              return (
                <motion.div
                  key={`${label}-${index}`}
                  className="interest-chip"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: isMobile ? '0px' : '-44px' }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="interest-emoji" aria-hidden>{emoji}</span>
                  <span className="interest-label">{label}</span>
                  {note ? <span className="interest-note">• {note}</span> : null}
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}

      {/* SERVICES — alt + serré */}
      <motion.section
        id="services"
        className="section services-section alt tight"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -36px 0px' }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="section-title"
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Ce que je peux faire pour toi
        </motion.h2>

        <div className="services-grid">
          {services.map((s, index) => (
            <motion.article
              key={`${s?.title || 'service'}-${index}`}
              className="service-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? '0px' : '-44px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              <div className="service-top">
                <div className="service-icon" aria-hidden><span>{s?.emoji}</span></div>
                <h3>{s?.title}</h3>
                <p className="service-short">{s?.short}</p>
              </div>

              <ul className="service-points">
                {(Array.isArray(s?.points) ? s.points : []).map((p) => <li key={p}>{p}</li>)}
              </ul>

              <div className="service-cta">
                <a href="#contact" className="service-button">Me contacter</a>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* CONTACT — alt + serré */}
      <motion.section
        id="contact"
        className="section contact-section alt tight"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -34px 0px' }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="section-title"
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          Contact
        </motion.h2>

        <motion.div
          className="contact-container"
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden><label>Ne pas remplir: <input name="bot-field" /></label></p>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div className="form-alert success" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  Message envoyé avec succès !
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div className="form-alert error" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  Erreur lors de l'envoi.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="input-group">
              <label htmlFor="name" className="label-with-icon"><RiUserFill className="input-icon" /><span>Nom complet</span></label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" placeholder="Ton nom" />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="label-with-icon"><RiMailFill className="input-icon" /><span>Email</span></label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" placeholder="email@exemple.com" />
            </div>

            <div className="input-group">
              <label htmlFor="message" className="label-with-icon"><RiMessage2Fill className="input-icon" /><span>Message</span></label>
              <textarea
                id="message"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Explique ton besoin : communication d’entreprise, community management, contenus, lancement de marque..."
              />
            </div>

            <motion.button type="submit" className="submit-button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <RiSendPlaneFill className="button-icon" /> Envoyer le message
            </motion.button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;
