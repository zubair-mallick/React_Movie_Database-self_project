import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const words = ['About', 'Me'];
  const navigate = useNavigate();

  return (
    <div className="container min-h-screen bg-[#1f1e24] mx-auto p-4 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">
        <AnimatePresence>
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.5 }}
              exit={{ opacity: 0, y: 30 }}
            >
              {word}{' '}
            </motion.span>
          ))}
        </AnimatePresence>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-lg mb-4">
            <AnimatePresence>
              {[
                "Hi", "there!", "I'm", 
                <span className="text-red-400 font-bold" key="Zubair">Zubair Mallik</span>,
                , 
                "I", "am", "an", "impassioned", "developer,", "deeply", "enamored", "with", "web", "development.", "This", "website", "is", "a", "testament", "to", "my", "focus", "on", "functionality,", "unlike", "many", "of", "my", "other", "flashy", "animated", "websites.", "It", "showcases", "my", "proficiency", "in", "designing", "captivating", "websites", "while", "prioritizing", "rich", "functionality", "and", "optimized", "code."].
map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </AnimatePresence>
          </p>
          <p className="text-lg mb-4">
            <AnimatePresence>
              {[
                "I've", "worked", "on", "multiple", "projects,", 
                "leveraging", "my", "skills", "in", 
                <span className="text-blue-500 font-bold" key="React">React.js,</span>, 
                <span className="text-blue-500 font-bold" key="Redux">Redux,</span>, 
                "and", "other", "modern", "web", "technologies."
              ].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 2 }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </AnimatePresence>
          </p>
          <p className="text-lg mb-4">
            <AnimatePresence>
              {[
                "For", "this", "website,", "I", "utilized", 
                <span className="text-blue-500 font-bold" key="React">React.js</span>, 
                "to", "create", "a", "dynamic", "and", "interactive", 
                "user", "experience.", "I", "incorporated", "various", "features", 
                "such", "as", "infinite", "scrolling,", "lazy", "loading,", 
                "and", "custom", "UI", "design", "to", "enhance", "usability."
              ].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </AnimatePresence>
          </p>
          <p className="text-lg mb-4">
            <AnimatePresence>
              {[
                "I", "also", "integrated", 
                <span className="text-blue-500 font-bold" key="React">React Router</span>, 
                "for", "seamless", "navigation", "and", "utilized", "the", 
                <span className="text-blue-500 font-bold" key="Movie">Movie Database API</span>, 
                "to", "fetch", "data.", "Additionally,", "I", "optimized", "API", 
                "requests", "with", "throttling", "and", "efficient", "management", 
                "techniques", "for", "better", "performance."
              ].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </AnimatePresence>
          </p>
          <p className="text-lg mb-4">
            <AnimatePresence>
              {[
                "Feel", "free", "to", "explore", "my", "website"
              ].map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1  }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  {word}{' '}
                </motion.span>
              ))}
            </AnimatePresence>
          </p>
        </div>
        <div className="flex justify-center items-center">
          <motion.img
            src="me.png"
            alt="Profile"
            className="w-full md:w-2/3 rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-4 right-4"
        onClick={() => navigate(-1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 11 }}
      >
        Go Back
      </button>
    </div>
  );
};

export default About;
