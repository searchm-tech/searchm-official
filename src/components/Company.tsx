import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Briefcase, Cpu } from 'lucide-react';

const cards = [
  {
    title: 'Growth',
    icon: TrendingUp,
    features: [
      '연간 광고취급액 600억 돌파',
      '연평균 매출 성장률 15.2%',
      '꾸준한 성장세 기록'
    ]
  },
  {
    title: 'Man Power',
    icon: Users,
    features: [
      '네이버 등 주요 포털 출신 영입인력',
      '광고솔루션 전문 개발팀',
      'KPMG 출신의 재무 전문가'
    ]
  },
  {
    title: 'Portfolio',
    icon: Briefcase,
    features: [
      '17년 업력 디지털 광고 전문 역량',
      '포털&커머스 통합 공식대행사',
      '13,600여 고객사 광고계정'
    ]
  },
  {
    title: 'Tech Solution',
    icon: Cpu,
    features: [
      'AI 기반 광고최적화 솔루션',
      'SMPay 정식 서비스 런칭',
      'Scale-Up TIPS 선정'
    ]
  }
];

const base = import.meta.env.BASE_URL;

const officialAgencies = [
  { name: 'NAVER', logo: `${base}logos/naver.PNG` },
  { name: 'kakao', logo: `${base}logos/kakao.PNG` },
  { name: 'NATE', logo: `${base}logos/nate.PNG` },
  { name: 'RealClick', logo: `${base}logos/realclick.PNG` },
  { name: '11번가', logo: `${base}logos/11bungae.PNG` },
  { name: 'WIDER PLANET', logo: `${base}logos/wider planet.PNG` },
  { name: 'danawa', logo: `${base}logos/danawa.PNG` }
];

const partners = [
  { name: 'Google Partner', logo: `${base}logos/google partner.PNG` },
  { name: 'Facebook Marketing Partner', logo: `${base}logos/facebook.PNG` },
  { name: 'Criteo', logo: `${base}logos/criteo.PNG` },
  { name: 'ZIGZAG', logo: `${base}logos/zigzag.PNG` },
  { name: 'coupang', logo: `${base}logos/coupang.PNG` }
];

function CompanyLogo({ name, logoUrl, fallbackLogo }: { name: string; logoUrl?: string; fallbackLogo?: string; key?: any }) {
  const [imgError, setImgError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  const handleError = () => {
    if (fallbackLogo && !useFallback) {
      setUseFallback(true);
    } else {
      setImgError(true);
    }
  };

  return (
    <div className="w-24 h-24 md:w-32 md:h-32 p-4 rounded-xl bg-white flex items-center justify-center shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all group shrink-0">
      {!imgError && (logoUrl || fallbackLogo) ? (
        <img 
          src={useFallback ? fallbackLogo : logoUrl} 
          alt={name} 
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain transition-all duration-300" 
          onError={handleError} 
        />
      ) : (
        <span className="font-extrabold text-gray-700 text-sm md:text-base text-center leading-tight">
          {name}
        </span>
      )}
    </div>
  );
}

export default function Company() {
  return (
    <>
      <section id="company" className="py-24 bg-gray-50">
        <div className="max-w-[100rem] mx-auto px-4 lg:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-24 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight"
          >
            써치엠은 데이터 기반 <span className="text-primary">통합 디지털 마케팅 전문 기업</span>입니다.
          </motion.h2>
        </div>

        {/* Dynamic Features Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mb-20 text-left">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group flex flex-col bg-white rounded-[2.5rem] p-6 xl:p-8 2xl:p-10 shadow-sm hover:shadow-2xl border border-gray-100/80 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              {/* Icon Container */}
              <div className="mb-10 relative inline-block self-start">
                 {/* Decorative Glow */}
                 <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-50 group-hover:scale-125 transition-transform duration-700 ease-in-out"></div>
                 
                 {/* Icon Box */}
                 <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-primary relative z-10 border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:-rotate-3 group-hover:scale-110 transition-all duration-500">
                   <card.icon strokeWidth={2} size={36} />
                 </div>
              </div>
              
              <div className="mb-8 relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black text-gray-900 group-hover:text-primary transition-colors duration-300 tracking-tight mb-5">
                  {card.title}
                </h3>
                <div className="w-10 h-1 bg-gray-200 rounded-full group-hover:w-20 group-hover:bg-primary transition-all duration-500 ease-out"></div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 relative z-10 mt-auto">
                {card.features.map((feature, i) => (
                  <li 
                    key={i} 
                    className="text-[14px] xl:text-[15px] 2xl:text-[16px] font-bold text-gray-600 flex items-center gap-3 group-hover:text-gray-900 transition-colors whitespace-nowrap"
                  >
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-primary transition-colors shrink-0"></div>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>

    {/* Dedicated Section for Agencies & Partners */}
    <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          {/* Official Agencies */}
          <div className="text-center mb-16">
            <h4 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center justify-center gap-3 tracking-tight mb-8">
              <span className="w-2 h-8 md:h-10 bg-primary rounded-full"></span>
              공식대행사
            </h4>
            <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 md:gap-6 items-center justify-start md:justify-center min-w-max mx-auto px-6 max-w-6xl">
                {officialAgencies.map((agency) => (
                  <CompanyLogo key={agency.name} name={agency.name} logoUrl={agency.logo} />
                ))}
              </div>
            </div>
          </div>

          {/* Partners */}
          <div className="text-center">
            <h4 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center justify-center gap-3 tracking-tight mb-8">
              <span className="w-2 h-8 md:h-10 bg-primary rounded-full"></span>
              파트너사
            </h4>
            <div className="w-full overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex gap-4 md:gap-6 items-center justify-start md:justify-center min-w-max mx-auto px-6 max-w-5xl">
                {partners.map((partner) => (
                  <CompanyLogo key={partner.name} name={partner.name} logoUrl={partner.logo} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  </>);
}
