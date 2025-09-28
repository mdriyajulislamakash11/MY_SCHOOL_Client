import React from "react";
import { motion } from "framer-motion";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaGithub, 
  FaBookOpen, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt 
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-12 mt-10 rounded-t-2xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Brand */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center md:justify-start gap-2 text-2xl font-bold">
            <FaBookOpen className="text-yellow-300 animate-bounce" />
            Study Buddy
          </div>
          <p className="mt-3 text-sm text-gray-200 leading-relaxed">
            Your ultimate learning partner 🌟 <br />
            Learn, share, and grow together with Study Buddy. 
            Empowering education through collaboration.
          </p>
        </motion.div>

        {/* About Us */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3">About Us</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-yellow-300 transition">Who We Are</a></li>
            <li><a href="/mission" className="hover:text-yellow-300 transition">Our Mission</a></li>
            <li><a href="/team" className="hover:text-yellow-300 transition">Meet the Team</a></li>
            <li><a href="/careers" className="hover:text-yellow-300 transition">Careers</a></li>
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/courses" className="hover:text-yellow-300 transition">Courses</a></li>
            <li><a href="/blogs" className="hover:text-yellow-300 transition">Blog & Articles</a></li>
            <li><a href="/faq" className="hover:text-yellow-300 transition">FAQ</a></li>
            <li><a href="/support" className="hover:text-yellow-300 transition">Help Center</a></li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-yellow-300" /> support@studybuddy.com
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhoneAlt className="text-yellow-300" /> +880 1234 567 890
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt className="text-yellow-300" /> Dhaka, Bangladesh
            </li>
          </ul>
          <div className="flex justify-center md:justify-start gap-4 mt-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-400 transition transform hover:scale-125" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-sky-400 transition transform hover:scale-125" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-400 transition transform hover:scale-125" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-gray-300 transition transform hover:scale-125" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
     <div className="mt-10 border-t border-gray-500 pt-4 text-center text-sm text-gray-200">
  © {new Date().getFullYear()} <span className="font-semibold text-yellow-300">Study Buddy</span>.  
  All Rights Reserved. | Crafted with ❤️ to inspire learners everywhere 🌍
</div>

    </footer>
  );
};

export default Footer;
