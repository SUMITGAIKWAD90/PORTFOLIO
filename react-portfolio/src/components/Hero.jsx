import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../App.css';

function Hero() {
  const [text, setText] = useState('');
  const fullText = 'Sumit Gaikwad';
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section style={{ opacity, scale }} className="hero">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            {text}
            <span className="cursor">|</span>
          </h1>
          <p className="hero-subtitle">Computer Science Student</p>
          <p className="hero-description">
            Building innovative solutions with Machine Learning & Full-Stack Development
          </p>

          <div className="hero-stats">
            {[
              { number: '8.0', label: 'SGPA' },
              { number: '15+', label: 'Projects' },
              { number: '5+', label: 'Hackathons' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat"
                whileHover={{ scale: 1.05 }}
              >
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="hero-cta">
            <motion.a
              href="#contact"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.a>
            <motion.a
              href="#projects"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Work
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="floating-shapes">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="shape"
            animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default Hero;
