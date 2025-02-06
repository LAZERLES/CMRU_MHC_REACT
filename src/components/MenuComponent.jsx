import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  ClipboardCheck,
  Smile,
  Users,
  BarChart,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const MenuComponent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 space-y-8"
    >
      {/* Background Image with Overlay */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center hero-overlay opacity-50"
        style={{ backgroundImage: "url('/your-image-path.jpg')" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>

      <motion.h1
        variants={fadeInUp}
        className="text-5xl font-bold text-primary bg-clip-text p-2 text-transparent bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-lg relative"
      >
        วันนี้คุณรู้สึกอย่างไร?
      </motion.h1>

      <motion.p variants={fadeInUp} className="text-lg text-gray-300 relative">
        บรรยายความรู้สึกของคุณในวันนี้
      </motion.p>

      <motion.div variants={fadeInUp}>
        <Link
          to="/calendarview"
          className="btn btn-primary text-lg px-6 py-3 shadow-md hover:scale-105 transition-transform relative"
        >
          Start
        </Link>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full max-w-5xl relative"
        variants={staggerContainer}
      >
        {[
          { to: "/select-activity", label: "กิจกรรม", icon: <TrendingUp size={32} /> },
          { to: "/calendarview", label: "ปฏิทินความรู้สึก", icon: <Calendar size={32} /> },
          { to: "/select-assessment", label: "แบบประเมินสุขภาพจิต", icon: <ClipboardCheck size={32} /> },
          { to: "/relax", label: "โซนผ่อนคลาย", icon: <Smile size={32} /> },
          { to: "/community", label: "ชุมชน", icon: <Users size={32} /> },
          { to: "/Dashboard", label: "กระดานสถิติ", icon: <BarChart size={32} /> },
          { to: "/learning", label: "ความรู้เกี่ยวกับสุขภาพจิต", icon: <Lightbulb size={32} /> },
          { to: "/counseling", label: "ขอคําปรึกษา", icon: <HeartHandshake size={32} /> },
        ].map((item, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Link
              to={item.to}
              className="card glass shadow-lg hover:shadow-xl hover:scale-110 transition-transform  p-6 flex items-center justify-between border rounded-xl bg-opacity-60 backdrop-blur-md"
            >
              <span className="text-lg font-semibold text-white drop-shadow-md ">
                {item.label}
              </span>
              <span className="text-primary text-3xl">{item.icon}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MenuComponent;
