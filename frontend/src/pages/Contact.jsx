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
  // JSON sources (uniquement)
  // =========================
  const socials = content?.socials || {};
  const socialStats = content?.socialStats || {}; // ex: { tiktok:"35k+ abonnés", facebook:"8k abonnés", instagram:"5k abonnés" }
  const socialNames = content?.socialNames || {}; // ex: { tiktok:"Soldat rose", instagram:"Soldat rose", facebook:"Corine Raphaëlla Koua" }

  const phoneRaw = content?.contact?.phone || '';
  const emailRaw = content?.contact?.email || '';

  const cleanStr = (v) => (typeof v === 'string' ? v.trim() : '');
  const safeTel = (v) => cleanStr(v).replace(/\s+/g, '');

  const normalizeEmailUrl = (v) => {
    const s = cleanStr(v);
    if (!s) return '';
    if (s.startsWith('mailto:')) return s;
    if (s.includes('@')) return `mailto:${s}`;
    return s;
  };

  // WhatsApp: si le JSON donne déjà un lien, on l’utilise.
  // Sinon on tente avec le phone (JSON contact.phone).
  const buildWhatsAppFromPhone = (phone) => {
    const p = safeTel(phone);
    if (!p) return '';
    // CI: si "07..." => on ajoute 225
    const digits = p.replace(/[^\d+]/g, '');
    const normalized = digits.startsWith('0') ? `225${digits.slice(1)}` : digits.replace(/^\+/, '');
    return normalized ? `https://wa.me/${normalized}` : '';
  };

  const getUrl = (key) => {
    // socials[key] peut être:
    // - une string (url)
    // - un objet { url, followers, label } (optionnel)
    const v = socials?.[key];
    if (typeof v === 'string') return cleanStr(v);
    if (v && typeof v === 'object') return cleanStr(v.url);
    return '';
  };

  const getFollowers = (key) => {
    // priorité: socials[key].followers si objet, sinon socialStats[key]
    const v = socials?.[key];
    if (v && typeof v === 'object' && cleanStr(v.followers)) return cleanStr(v.followers);
    return cleanStr(socialStats?.[key]);
  };

  const getLabel = (key) => {
    // priorité: socials[key].label si objet, sinon socialNames[key]
    const v = socials?.[key];
    if (v && typeof v === 'object' && cleanStr(v.label)) return cleanStr(v.label);
    return cleanStr(socialNames?.[key]);
  };

  const resolved = {
    facebook: getUrl('facebook'),
    instagram: getUrl('instagram'),
    tiktok: getUrl('tiktok'),
    whatsapp: getUrl('whatsapp') || buildWhatsAppFromPhone(phoneRaw),
    email: normalizeEmailUrl(getUrl('email') || emailRaw),
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

  const phone = cleanStr(phoneRaw) || '—';
  const email = cleanStr(emailRaw) || '—';

  const socialCards = useMemo(() => {
    const base = [
      {
        key: 'tiktok',
        name: 'TikTok',
        url: resolved.tiktok,
        title: getLabel('tiktok') || 'Soldat rose',
        handle: handleFromUrl('tiktok', resolved.tiktok),
        followers: getFollowers('tiktok') || '',
        icon: <RiTiktokFill />,
        variant: 'tiktok',
      },
      {
        key: 'instagram',
        name: 'Instagram',
        url: resolved.instagram,
        title: getLabel('instagram') || 'Soldat rose',
        handle: handleFromUrl('instagram', resolved.instagram),
        followers: getFollowers('instagram') || '',
        icon: <RiInstagramFill />,
        variant: 'instagram',
      },
      {
        key: 'facebook',
        name: 'Facebook',
        url: resolved.facebook,
        title: getLabel('facebook') || 'Corine Raphaëlla Koua',
        handle: '',
        followers: getFollowers('facebook') || '',
        icon: <RiFacebookCircleFill />,
        variant: 'facebook',
      },
      {
        key: 'whatsapp',
        name: 'WhatsApp',
        url: resolved.whatsapp,
        title: getLabel('whatsapp') || 'WhatsApp',
        handle: phone !== '—' ? phone : '',
        followers: getFollowers('whatsapp') || '',
        icon: <RiWhatsappFill />,
        variant: 'whatsapp',
      },
      {
        key: 'email',
        name: 'Email',
        url: resolved.email,
        title: getLabel('email') || 'Email',
        handle: email !== '—' ? email : '',
        followers: getFollowers('email') || '',
        icon: <RiMailFill />,
        variant: 'email',
      },
    ];

    // IMPORTANT: on n’enlève pas les cartes si url vide -> on affiche "Lien manquant"
    return base.map((s) => ({ ...s, disabled: !cleanStr(s.url) }));
  }, [resolved.facebook, resolved.instagram, resolved.tiktok, resolved.whatsapp, resolved.email, phone, email]);

  // =========================
  // Form
  // =========================
  const handleChange = (e) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `https://formsubmit.co/ajax/${content?.contact?.formEmail || content?.contact?.email || 'brouantoineassanvo@gmail.com'}`;
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
          <motion.h1 className="c-title" initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
            Contact<span className="dot">.</span>
          </motion.h1>

          <motion.p className="c-subtitle" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 }}>
            Parlons de ta communication, tes réseaux et ton image.
          </motion.p>
        </div>

        <div className="c-grid">
          {/* LEFT */}
          <motion.aside className="c-side" initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}>
            <div className="c-panel">
              <div className="panel-head">
                <h3>Réseaux</h3>
                <p>Liens directs + abonnés</p>
              </div>

              <div className="social-grid">
                {socialCards.map((s, i) => {
                  const CardTag = s.disabled ? motion.div : motion.a;
                  const cardProps = s.disabled
                    ? {
                        role: 'link',
                        'aria-disabled': true,
                        tabIndex: 0,
                      }
                    : {
                        href: s.url,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      };

                  return (
                    <CardTag
                      key={s.key}
                      className={`social-card ${s.variant} ${s.disabled ? 'disabled' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.22 + i * 0.06 }}
                      whileHover={!s.disabled ? { y: -3 } : {}}
                      whileTap={!s.disabled ? { scale: 0.98 } : {}}
                      {...cardProps}
                    >
                      <div className="social-top">
                        <div className="social-ico" aria-hidden="true">{s.icon}</div>

                        <div className="social-meta">
                          <div className="social-name">
                            {s.name} {!s.disabled && <RiArrowRightUpLine className="ext" aria-hidden="true" />}
                          </div>

                          <div className="social-handle">
                            <strong>{s.title}</strong>
                            {s.handle ? ` • ${s.handle}` : ''}
                          </div>
                        </div>
                      </div>

                      <div className="social-foot">
                        {s.followers ? (
                          <span className="badge">{s.followers}</span>
                        ) : (
                          <span className="badge ghost">{s.disabled ? 'Lien manquant dans le JSON' : '—'}</span>
                        )}
                      </div>
                    </CardTag>
                  );
                })}
              </div>

              <div className="direct-box">
                <div className="direct-item">
                  <RiGlobalLine className="direct-ico" />
                  <div>
                    <div className="direct-label">Téléphone</div>
                    <a className="direct-value" href={phone !== '—' ? `tel:${safeTel(phone)}` : '#'} onClick={(e) => phone === '—' && e.preventDefault()}>
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

          {/* RIGHT */}
          <motion.div className="c-formWrap" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <form className="c-form" onSubmit={handleSubmit}>
              <div className="form-head">
                <h3>Envoyer un message</h3>
                <p>Dis-moi exactement ce que tu veux, je te réponds vite.</p>
              </div>

              <input type="hidden" name="form-name" value="contact" />
              <p hidden><label>Ne pas remplir: <input name="bot-field" /></label></p>

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
                <label htmlFor="name"><RiUserFill /> Nom complet</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ton nom"
                  autoComplete="name"
                />
              </div>

              <div className="field">
                <label htmlFor="email"><RiMailFill /> Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@exemple.com"
                  autoComplete="email"
                />
              </div>

              <div className="field">
                <label htmlFor="message"><RiMessage2Fill /> Message</label>
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
