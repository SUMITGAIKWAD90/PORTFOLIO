import { motion } from 'framer-motion';
import '../App.css';

function About() {
  return (
    <section className="about" id="about">
      <motion.div
        className="container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Passionate Computer Science student at Savitribai Phule University with a strong interest in
              machine learning, artificial intelligence, and full-stack development.
            </p>
            <p>
              Currently maintaining an 8/10 SGPA and expected to graduate in May 2026.
              I'm actively involved in hackathons and serve as Co-Technical Head at ACES Community.
            </p>
            <div className="skills-preview">
              {['Python', 'React.js', 'TensorFlow', 'Django', 'AWS'].map((skill, i) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="visual-box">
              <motion.div
                className="code-snippet"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <code>
                  {'{'}<br />
                  &nbsp;&nbsp;"name": "Sumit Gaikwad",<br />
                  &nbsp;&nbsp;"role": "CS Student",<br />
                  &nbsp;&nbsp;"focus": ["ML", "AI", "Web"]<br />
                  {'}'}
                </code>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
