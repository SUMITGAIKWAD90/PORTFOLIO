import { motion } from 'framer-motion';
import '../App.css';

function Contact() {
  const socials = [
    { name: 'GitHub', icon: '⚡', url: 'https://github.com/SUMITGAIKWAD90' },
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/sumitgaikwad09/' },
    { name: 'Email', icon: '✉️', url: 'mailto:sumit@example.com' },
    { name: 'Phone', icon: '📱', url: 'tel:+1234567890' },
  ];

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Let's Connect</h2>
          <p className="contact-subtitle">
            Open to opportunities, collaborations, and conversations
          </p>

          <div className="socials-grid">
            {socials.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <footer className="footer">
        <p>© 2025 Sumit Gaikwad. Built with React & Framer Motion</p>
      </footer>
    </section>
  );
}

export default Contact;
