// src/components/Hero.jsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10 px-4 bg-gradient-to-b from-orange-100 to-orange-50">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-5xl md:text-7xl font-extrabold text-orange-600 mb-4 tracking-tight"
          variants={itemVariants}
        >
          TÉP TÉP – <span className="text-slate-700">Trộn vị vui!</span> 🍤🥢
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Nơi bánh tráng trộn truyền thống gặp gỡ công nghệ. Mỗi phần ăn là một trải nghiệm giòn tan, đậm đà và siêu cuốn.
        </motion.p>
        <motion.div variants={itemVariants}>
          <motion.img
            src="/toteptep.png"
            alt="Bánh tráng trộn Tép Tép"
            className="w-80 md:w-[28rem] mx-auto rounded-2xl shadow-2xl shadow-orange-400/30"
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          />
        </motion.div>
        <motion.div className="mt-12" variants={itemVariants}>
          <motion.a
            href="https://m.me/banhtrangteptep"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white px-10 py-4 text-lg rounded-full hover:bg-orange-600 transition-colors duration-300 font-bold shadow-xl shadow-orange-500/40 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đặt món qua Messenger 📩
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;