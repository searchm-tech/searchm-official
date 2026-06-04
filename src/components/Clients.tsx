import { motion } from 'motion/react';

const clientsList = [
  '광동생활건강', 'VENUS', '아이센스', '3M', 
  '유니레버', 'NH농협카드', 'AMORE PACIFIC', 'Sulwhasoo', 'CJ wellcare',
  '안국약품', 'Kellogg\'s', 'UNHCR', '크린토피아',
  '디자인밀', 'ROYAL CANIN', '유플래너',
  '최상산부인과', 'NewTree Mall', '명당가'
];

export default function Clients() {
  return (
    <section id="clients" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20 space-y-3">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-primary tracking-tight"
        >
          Clients
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 text-xl md:text-2xl pt-2 max-w-2xl mx-auto leading-relaxed"
        >
          18년, 다양한 업종의 광고집행 경험 바탕의 운영 노하우로<br/>
          <strong className="text-gray-900">90여개의 대형 광고주와 13,600개 사 광고 관리</strong>
        </motion.p>
      </div>

      {/* Full Width Marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full relative"
      >
        <div className="relative w-full flex flex-col gap-12 opacity-80 py-4">
          
          {/* Row 1 - Marquee left to right */}
          <div className="flex space-x-8 w-max">
            <motion.div 
              className="flex space-x-16 px-8 items-center"
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            >
              {[...clientsList.slice(0, 8), ...clientsList.slice(0, 8), ...clientsList.slice(0, 8)].map((client, idx) => (
                <div 
                  key={`row1-${idx}`} 
                  className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:text-primary transition-all duration-300 shrink-0 cursor-default"
                >
                  <span className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight text-center px-4">
                    {client}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2 - Marquee right to left */}
          <div className="flex space-x-8 w-max">
            <motion.div 
              className="flex space-x-16 px-8 items-center"
              animate={{ x: [-1000, 0] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {[...clientsList.slice(8), ...clientsList.slice(8), ...clientsList.slice(8)].map((client, idx) => (
                <div 
                  key={`row2-${idx}`} 
                  className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:text-primary transition-all duration-300 shrink-0 cursor-default"
                >
                  <span className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight text-center px-4">
                    {client}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Subtle Gradient Fades for edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white to-transparent z-10"></div>
        </div>
      </motion.div>
    </section>
  );
}
