import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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
  RiTiktokFill
} from 'react-icons/ri';
import useRemoteContent from '../hooks/useRemoteContent';


const Contact = () => {
  const content = useRemoteContent();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const socials = content.socials || {};
  const socialLinks = [
    socials.facebook && { icon: <RiFacebookCircleFill className="social-icon-inner" />, name: 'Facebook', url: socials.facebook, color: '#1877F2' },
    socials.instagram && { icon: <RiInstagramFill className="social-icon-inner" />, name: 'Instagram', url: socials.instagram, color: '#E4405F' },
    socials.tiktok && { icon: <RiTiktokFill className="social-icon-inner" />, name: 'TikTok', url: socials.tiktok, color: '#111111' },
    socials.whatsapp && { icon: <RiWhatsappFill className="social-icon-inner" />, name: 'WhatsApp', url: socials.whatsapp, color: '#25D366' },
    socials.email && { icon: <RiMailFill className="social-icon-inner" />, name: 'Email', url: socials.email, color: '#D44638' }
  ].filter(Boolean);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `https://formsubmit.co/ajax/${content?.contact?.formEmail || content?.contact?.email || 'brouantoineassanvo@gmail.com'}`;
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (response.ok || result.success) { setSubmitStatus('success'); setFormData({ name:'', email:'', message:'' }); }
      else setSubmitStatus('error');
    } catch { setSubmitStatus('error'); }
  };

  return (
    <motion.div className="contact-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="contact-header">
        <motion.h1 className="gradient-text" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
          Contact<span className="text-highlight">.</span>
        </motion.h1>
        <motion.p className="subtitle" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          Parlons de ta communication et de tes réseaux
        </motion.p>
      </div>

      <div className="contact-content">
        <div className="contact-form-container">
          <motion.form className="contact-form" onSubmit={handleSubmit} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <input type="hidden" name="form-name" value="contact" />
            <p hidden><label>Ne pas remplir: <input name="bot-field" /></label></p>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div className="form-alert success" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  Message envoyé avec succès !
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div className="form-alert error" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  Erreur lors de l'envoi
                </motion.div>
              )}
            </AnimatePresence>

            <div className="form-group">
              <label htmlFor="name"><RiUserFill className="input-icon" />Nom complet</label>
              <input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Ton nom" />
            </div>

            <div className="form-group">
              <label htmlFor="email"><RiMailFill className="input-icon" />Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="email@exemple.com" />
            </div>

            <div className="form-group">
              <label htmlFor="message"><RiMessage2Fill className="input-icon" />Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="Dis-moi ce que tu veux : community management, communication d’entreprise, lancement de marque, contenu, etc." />
            </div>

            <motion.button type="submit" className="submit-button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <RiSendPlaneFill className="button-icon" /> Envoyer le message
            </motion.button>
          </motion.form>
        </div>

        <div className="social-links-container">
          <h3>Mes réseaux sociaux</h3>
          <div className="social-links-grid">
            {socialLinks.map((s, i) => (
              <motion.a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link" style={{ backgroundColor: s.color }} whileHover={{ y: -5, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="social-icon-wrapper">{s.icon}</div><span>{s.name}</span>
              </motion.a>
            ))}
          </div>

          <div className="direct-contact">
            <p><RiGlobalLine className="contact-icon" /><strong>Téléphone:</strong> {content?.contact?.phone || '—'}</p>
            <p><RiMailFill className="contact-icon" /><strong>Email:</strong> {content?.contact?.email || '—'}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
