import { motion } from 'motion/react';
import { MessageCircle, CreditCard } from 'lucide-react';

export default function FloatingBanners() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-6 z-50 flex flex-col gap-4">
      {/* SMPay Banner */}
      <motion.a
        href="https://smpay.co.kr/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center w-16 h-16 bg-[#2D2D2D] rounded-full shadow-lg shadow-black/20 text-white hover:bg-[#1f1f1f] transition-all group border border-gray-700"
      >
        <CreditCard className="w-6 h-6 mb-1 text-gray-300 group-hover:text-primary transition-colors" strokeWidth={1.5} />
        <span className="text-[11px] font-black tracking-tight text-gray-200 group-hover:text-white transition-colors">SMPay</span>
      </motion.a>
      
      {/* Ad Inquiry Banner */}
      <motion.button
        onClick={scrollToContact}
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center justify-center w-16 h-16 bg-primary rounded-full shadow-xl shadow-primary/30 text-white hover:bg-orange-600 transition-all font-bold"
      >
        <MessageCircle className="w-6 h-6 mb-1" strokeWidth={2} />
        <span className="text-[10px] tracking-tight">광고문의</span>
      </motion.button>
    </div>
  );
}
