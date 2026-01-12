import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import CV from './CV';
import Projets from './Projets';
import Contact from './Contact';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
