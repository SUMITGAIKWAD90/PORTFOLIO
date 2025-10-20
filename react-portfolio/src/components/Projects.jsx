import { motion } from 'framer-motion';
import '../App.css';

function Projects() {
  const projects = [
    {
      title: 'Car Accident Detection',
      date: 'April 2024',
      description: 'ML system to detect car accidents using CCTV footage with real-time alerts',
      tags: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
      color: '#ef4444',
    },
    {
      title: 'Health Monitoring App',
      date: 'March 2024',
      description: 'Comprehensive health monitoring system with real-time vital tracking',
      tags: ['React.js', 'Node.js', 'MongoDB', 'Firebase'],
      color: '#10b981',
    },
    {
      title: 'Air Pollution Monitor',
      date: 'February 2024',
      description: 'Real-time air quality monitoring with predictive analytics',
      tags: ['Python', 'Django', 'Scikit-learn', 'Arduino'],
      color: '#f59e0b',
    },
  ];

  return (
    <section className="projects" id="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-header">
                <div className="project-icon" style={{ backgroundColor: project.color }}>
                  <span className="icon-dot"></span>
                </div>
                <span className="project-date">{project.date}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <motion.button className="project-link" whileHover={{ x: 5 }}>
                View Details →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
