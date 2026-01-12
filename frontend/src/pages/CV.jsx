import '../styles/Home.css';
import useRemoteContent from '../hooks/useRemoteContent';

export default function CV() {
  const content = useRemoteContent();
  const url = content?.cv?.url || '/docs/cv.pdf';
  const name = content?.cv?.fileName || 'CV.pdf';

  return (
    <div className="portfolio-container" style={{ padding: '1rem 0 2rem' }}>
      <h1 className="section-title" style={{ marginTop: '1rem' }}>Mon CV</h1>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,.08)', overflow: 'hidden' }}>
        <iframe title="CV" src={url} style={{ border: 0, width: '100%', height: '80vh' }} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <a className="service-button" href={url} download={name}>Télécharger le CV</a>
      </div>
    </div>
  );
}
