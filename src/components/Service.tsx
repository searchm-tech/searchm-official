import { motion, AnimatePresence } from 'motion/react';
import { BarChart3, FileText, Target, Laptop, Smartphone, LineChart } from 'lucide-react';
import { useState } from 'react';

const services = [
  { 
    id: 1, icon: BarChart3, title: 'BRAND\nMARKETING', 
    description: '브랜드의 가치를 깊이 이해하고, 전략적인 메시지 도출을 통해 시장 내 독보적인 포지셔닝을 구축합니다. 데이터를 기반으로 한 세밀한 타겟팅으로 최적의 브랜드 경험을 설계합니다.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, icon: FileText, title: 'CONTENTS\nMARKETING', 
    description: '트렌드를 선도하는 크리에이티브 콘텐츠를 기획/제작하여, 잠재 고객의 이목을 사로잡고 소셜 미디어 플랫폼 전반에 걸쳐 강력한 바이럴을 유도합니다.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, icon: Target, title: 'PERFORMANCE\nMARKETING', 
    description: '명확한 KPI 달성을 목표로, 매체별 특성에 맞춘 퍼포먼스 전략을 수립합니다. 실시간 데이터 트래킹과 A/B 테스트로 광고 효율을 극대화시켜 높은 ROI를 보장합니다.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 4, icon: Laptop, title: 'DIGITAL\nMARKETING', 
    description: '웹, 앱, 소셜, 검색 등 모든 디지털 접점에서의 통합 마케팅을 전개합니다. 소비자 구매 여정을 분석하여 단계별 매끄러운 유입과 전환을 이끌어냅니다.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 5, icon: Smartphone, title: 'APP\nMARKETING', 
    description: '앱 설치수 증대(UAC)부터 활성 사용자(MAU) 유지까지, 모바일 생태계 최적화 마케팅 솔루션을 제공하여 성공적인 앱 비즈니스 성장을 지원합니다.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 6, icon: LineChart, title: 'MARKETING\nASP', 
    description: '마케팅 현황을 한눈에 파악할 수 있는 맞춤형 대시보드와 리포팅 솔루션을 제공하여, 빠르고 정확한 의사결정을 돕는 기술 기반 서비스를 제공합니다.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
];

export default function Service() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <>
      <section id="service" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-16">
        
        {/* Header */}
        <div className="space-y-3">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-primary tracking-tight"
          >
            Service
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-xl md:text-2xl pt-2 font-medium"
          >
            브랜드의 본질에 집중하여 가치를 높이는 최적의 마케팅 서비스를 제공합니다.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto mt-16 rounded-[2.5rem] overflow-hidden shadow-xl bg-white border border-gray-100 flex flex-col text-left">
          {/* Service Icons Banner (Top Box) */}
          <div className="bg-[#2D2D2D] py-10 px-6 relative">
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-4">
              {services.map((svc) => {
                const isActive = activeService.id === svc.id;
                return (
                  <div 
                    key={svc.id} 
                    onClick={() => setActiveService(svc)}
                    className="flex flex-col items-center gap-3 group cursor-pointer relative"
                  >
                    <div className={`w-16 h-16 rounded-full border flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 ${isActive ? 'bg-primary border-primary shadow-lg shadow-primary/30' : 'bg-white/5 border-gray-500/50 group-hover:bg-primary/80 group-hover:border-primary'}`}>
                      <svc.icon className={`w-7 h-7 ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`} strokeWidth={1.5} />
                    </div>
                    <h4 className={`text-xs font-bold tracking-widest whitespace-pre-line text-center transition-opacity duration-300 mt-2 ${isActive ? 'text-white opacity-100' : 'text-gray-400 group-hover:text-white group-hover:opacity-100 opacity-60'}`}>
                      {svc.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Service Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative"
            >
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                <img 
                  src={activeService.image} 
                  alt={activeService.title.replace('\n', ' ')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-white shadow-md flex items-center justify-center text-primary">
                    <activeService.icon strokeWidth={2} size={28} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 whitespace-pre-line tracking-tight leading-tight">
                    {activeService.title.replace('\n', ' ')}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed md:text-lg">
                  {activeService.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
</>
  );
}
