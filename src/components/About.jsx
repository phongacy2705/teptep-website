// src/components/About.jsx
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/about-image.jpg" // <-- Bạn nhớ nhé, tí nữa chúng ta sẽ thay ảnh này
            alt="Về Tép Tép" 
            className="rounded-2xl shadow-xl w-full" 
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-orange-500 font-bold text-lg">CÂU CHUYỆN TÉP TÉP</h3>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-6">Làm từ công nghệ,<br/>Trộn với đam mê.</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Tép Tép không chỉ là một quán bánh tráng trộn. Chúng tôi là những người trẻ yêu ẩm thực và công nghệ, mong muốn mang đến một làn gió mới cho món ăn vặt quen thuộc. 
          </p>
          <p className="text-slate-600 leading-relaxed">
            Mỗi hộp bánh tráng được chuẩn bị theo quy trình sạch sẽ, nguyên liệu tuyển chọn kỹ càng và đóng gói tiện lợi, đảm bảo bạn có trải nghiệm "trộn vị vui" tuyệt vời nhất.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;