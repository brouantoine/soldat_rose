// src/pages/Contact.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import '../styles/Contact.css';
import {
  RiFacebookCircleFill,
  RiWhatsappFill,
  RiMailFill,
  RiGlobalLine,
  RiSendPlaneFill,
  RiUserFill,
  RiMessage2Fill,
  RiInstagramFill,
  RiTiktokFill,
  RiArrowRightUpLine
} from 'react-icons/ri';
import useRemoteContent from '../hooks/useRemoteContent';

const Contact = () => {
  const content = useRemoteContent();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  // =========================
  // Socials (remote + fallback)
  // IMPORTANT: ne jamais écraser le fallback avec une valeur vide ("")
  // =========================
  const socials = content?.socials || {};

  const fallbackSocials = {
    facebook: 'https://www.facebook.com/share/17RTDmKhDW/',
    tiktok: 'https://www.tiktok.com/@soldat__rose?_r=1&_t=ZM-931VcsWFXW0',
    instagram: 'https://www.instagram.com/soldat_rose?igsh=eWFxaGh2am9wdG9o',
    whatsapp: 'https://wa.me/2250708144967',
    email: 'mailto:Corineraphaellak@gmail.com',
  };

  const cleanUrl = (v) => (typeof v === 'string' ? v.trim() : '');

  const normalizeEmail = (v) => {
    const s = cleanUrl(v);
    if (!s) return '';
    if (s.startsWith('mailto:')) return s;
    if (s.includes('@')) return `mailto:${s}`;
    return s;
  };

  const pick = (key) => {
    const remote = cleanUrl(socials?.[key]);
    const fallback = cleanUrl(fallbackSocials?.[key]);
    return remote || fallback;
  };

  const mergedSocials = {
    facebook: pick('facebook'),
    instagram: pick('instagram'),
    tiktok: pick('tiktok'),
    whatsapp: pick('whatsapp'),
    email: normalizeEmail(pick('email')),
  };

  const phone = content?.contact?.phone || '—';
  const email = content?.contact?.email || '—';

  // Stats (tu peux aussi les mettre dans le JSON content.socialStats)
  const defaultStats = {
    tiktok: '35k+ abonnés',
    facebook: '8k abonnés',
    instagram: '5k abonnés',
    whatsapp: 'Réponse rapide',
    email: 'Contact direct',
  };
  const socialStats = { ...defaultStats, ...(content?.socialStats || {}) };

  // Noms affichés (tu peux aussi les mettre dans le JSON content.socialNames)
  const socialNames = {
    facebook: 'Corine Raphaëlla Koua',
    tiktok: 'Soldat rose',
    instagram: 'Soldat rose',
    ...(content?.socialNames || {}),
  };

  const handleFromUrl = (platform, url) => {
    if (!url) return '';
    try {
      const u = new URL(url);
      const p = u.pathname || '';

      if (platform === 'tiktok') {
        const m = p.match(/\/@([^/]+)/);
        return m?.[1] ? `@${m[1]}` : '';
      }
      if (platform === 'instagram') {
        const clean = p.replace(/\//g, '');
        return clean ? `@${clean}` : '';
      }
      return '';
    } catch {
      return '';
    }
  };

  const socialCards = useMemo(
    () =>
      [
        {
          key: 'tiktok',
          name: 'TikTok',
          url: mergedSocials.tiktok,
          title: socialNames.tiktok,
          handle: handleFromUrl('tiktok', mergedSocials.tiktok),
          followers: socialStats.tiktok,
          icon: <RiTiktokFill />,
          variant: 'tiktok',
        },
        {
          key: 'instagram',
          name: 'Instagram',
          url: mergedSocials.instagram,
          title: socialNames.instagram,
          handle: handleFromUrl('instagram', mergedSocials.instagram),
          followers: socialStats.instagram,
          icon: <RiInstagramFill />,
          variant: 'instagram',
        },
        {
          key: 'facebook',
          name: 'Facebook',
          url: mergedSocials.facebook,
          title: socialNames.facebook,
          handle: '',
          followers: socialStats.facebook,
          icon: <RiFacebookCircleFill />,
          variant: 'facebook',
        },
        {
          key: 'whatsapp',
          name: 'WhatsApp',
          url: mergedSocials.whatsapp,
          title: 'WhatsApp',
          handle: phone !== '—' ? phone : '',
          followers: socialStats.whatsapp,
          icon: <RiWhatsappFill />,
          variant: 'whatsapp',
        },
        {
          key: 'email',
          name: 'Email',
          url: mergedSocials.email || (email !== '—' ? `mailto:${email}` : ''),
          title: 'Email',
          handle: email !== '—' ? email : '',
          followers: socialStats.email,
          icon: <RiMailFill />,
          variant: 'email',
        },
      ].filter((s) => typeof s.url === 'string' && s.url.trim().length > 0),
    [mergedSocials, phone, email, socialStats, socialNames]
  );

  // =========================
  // Form
  // =========================
  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `https://formsubmit.co/ajax/${
        content?.contact?.formEmail || content?.contact?.email || 'brouantoineassanvo@gmail.com'
      }`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok || result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else setSubmitStatus('error');
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <motion.div className="contact-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
      <div className="c-container">
        <div className="c-header">
          <motion.h1
            className="c-title"
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
          >
            Contact<span className="dot">.</span>
          </motion.h1>

          <motion.p className="c-subtitle" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }}>
            Parlons de ta communication, tes réseaux et ton image.
          </motion.p>
        </div>

        <div className="c-grid">
          {/* LEFT: SOCIALS */}
          <motion.aside className="c-side" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}>
            <div className="c-panel">
              <div className="panel-head">
                <h3>Réseaux</h3>
                <p>Liens directs + abonnés</p>
              </div>

              <div className="social-grid">
                {socialCards.map((s, i) => (
                  <motion.a
                    key={s.key}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-card ${s.variant}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.06 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="social-top">
                      <div className="social-ico" aria-hidden="true">
                        {s.icon}
                      </div>

                      <div className="social-meta">
                        <div className="social-name">
                          {s.name} <RiArrowRightUpLine className="ext" aria-hidden="true" />
                        </div>

                        <div className="social-handle">
                          <strong>{s.title}</strong>
                          {s.handle ? ` • ${s.handle}` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="social-foot">
                      <span className="badge">{s.followers}</span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="direct-box">
                <div className="direct-item">
                  <RiGlobalLine className="direct-ico" />
                  <div>
                    <div className="direct-label">Téléphone</div>
                    <a className="direct-value" href={phone !== '—' ? `tel:${phone}` : '#'} onClick={(e) => phone === '—' && e.preventDefault()}>
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="direct-item">
                  <RiMailFill className="direct-ico" />
                  <div>
                    <div className="direct-label">Email</div>
                    <a className="direct-value" href={email !== '—' ? `mailto:${email}` : '#'} onClick={(e) => email === '—' && e.preventDefault()}>
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* RIGHT: FORM */}
          <motion.div className="c-formWrap" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <form className="c-form" onSubmit={handleSubmit}>
              <div className="form-head">
                <h3>Envoyer un message</h3>
                <p>Dis-moi exactement ce que tu veux, je te réponds vite.</p>
              </div>

              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Ne pas remplir: <input name="bot-field" />
                </label>
              </p>

              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div className="alert success" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Message envoyé.
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.div className="alert error" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Erreur d’envoi. Réessaie.
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="field">
                <label htmlFor="name">
                  <RiUserFill /> Nom complet
                </label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Ton nom" autoComplete="name" />
              </div>

              <div className="field">
                <label htmlFor="email">
                  <RiMailFill /> Email
                </label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="email@exemple.com" autoComplete="email" />
              </div>

              <div className="field">
                <label htmlFor="message">
                  <RiMessage2Fill /> Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Communication d’entreprise, contenus, animation, lancement de marque…"
                />
              </div>

              <motion.button type="submit" className="btn btn-primary btn-full" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <RiSendPlaneFill /> Envoyer
              </motion.button>

              <p className="fine">En envoyant, tu acceptes d’être recontacté par email.</p>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
