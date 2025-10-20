import { motion } from 'framer-motion';
import '../App.css';

function Skills() {
  const skills = [
    'JavaScript',
    'React.js',
    'Node.js',
    'Python',
    'Django',
    'TensorFlow',
    'MongoDB',
    'Git',
    'AWS',
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>

        <div className="skills-grid">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              className="skill-card"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
