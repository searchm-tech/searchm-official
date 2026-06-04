import { motion } from 'motion/react';

export default function Slogan() {
  return (
    <section className="relative py-32 overflow-hidden bg-gray-900 flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/50 to-gray-900/90" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
            "Be Innovative"
          </h2>
          <p className="text-xl md:text-3xl font-bold mb-6 text-gray-100 leading-snug">
            광고성과를 보장하고 광고비를 지원하는 혁신적 파트너, searchM입니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 text-base md:text-lg text-gray-300 font-medium leading-relaxed max-w-3xl mx-auto"
        >
          <p>
            Be Innovative는 모든 광고주에게 혁신적인 광고 경험을 선사하겠다는 비전을 담고 있습니다.
          </p>
          <p>
            광고주의 고민을 가장 잘 알기에,
            <br className="hidden md:block" />
            써치엠의 솔루션으로 성과는 키우고, 광고비 지원으로 성장의 문턱은 낮춰드리겠습니다.
          </p>
          <p>
            당신의 비즈니스가 확신을 가지고 성장할 수 있도록, 
            <br className="hidden md:block" />
            결과로 답하는 든든한 파트너가 되겠습니다.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
