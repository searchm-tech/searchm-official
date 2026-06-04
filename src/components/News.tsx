import { motion } from 'motion/react';

const newsItems = [
  {
    type: 'NEWS',
    title: "써치엠, 네이버 스마트스토어 광고비 지원 AI 솔루션 'SMPay' 출시 기념 프로모션 진행",
    description: "AI 솔루션 도입을 기념하여 스마트스토어 광고주 맞춤형 광고비 특별 지원 혜택 제공",
    date: '2026.05.27',
    url: 'https://www.hankyung.com/article/202605245967i',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
  },
  {
    type: 'BLOG',
    title: "클릭은 많은데 구매가 안 되는 이유? 광고 성과가 나오지 않는 원인 5가지",
    description: "[출처] 클릭은 많은데 구매가 안 되는 이유? 광고 성과가 나오지 않는 원인 5가지 | 작성자 써치엠",
    date: '2026.05.27',
    url: 'https://blog.naver.com/searchm_1/224298107408',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
  },
  {
    type: 'YOUTUBE',
    title: 'SMPay 출시: "매출은 올리고 부담은 낮추세요"',
    description: "네이버 스마트스토어 광고주를 위한 매출 극대화 및 광고비 통합 지원 솔루션 SMPay 핵심 소개 영상",
    date: '2026.05.21',
    url: 'https://www.youtube.com/watch?v=iURYqsb6_EU',
    image: 'https://img.youtube.com/vi/iURYqsb6_EU/mqdefault.jpg',
  },
  {
    type: 'NEWS',
    title: "케이그라운드벤처스, 'AI기반 애드 핀테크 개발' 써치엠에 투자",
    description: "벤처캐피탈 케이그라운드벤처스가 AI 기반 광고 핀테크 서비스 SMPay를 개발한 써치엠에 투자",
    date: '2024.10.11',
    url: 'https://v.daum.net/v/20241011133249053',
    image: 'https://images.unsplash.com/photo-1554774853-6a56f62c6451?auto=format&fit=crop&q=80&w=600',
  },
  {
    type: 'NEWS',
    title: '2023 대한민국 디지털 광고대상 2개 부문 수상',
    description: "퍼포먼스 마케팅 검색 부문 우수 성과 공식 인증 및 마케팅 효과 검증",
    date: '2023.12.20',
    url: 'https://www.itbiznews.com/news/articleView.html?idxno=121466',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=600',
  },
].sort((a, b) => b.date.localeCompare(a.date));

export default function News() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-left mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight"
          >
            써치엠의 다양한 소식을 확인해보세요.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-sm mt-2"
          >
            기사 및 블로그, 유튜브에 보도진행 및 게재된 써치엠의 최근 미디어 소식을 한눈에 만나보실 수 있습니다.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {newsItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col group h-full bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm z-10 ${
                  item.type === 'YOUTUBE' ? 'bg-red-500 text-white' :
                  item.type === 'BLOG' ? 'bg-emerald-500 text-white' :
                  'bg-blue-600 text-white'
                }`}>
                  {item.type}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="text-gray-900 font-bold leading-snug line-clamp-3 text-sm group-hover:text-primary transition-colors mb-4 flex-grow tracking-tight">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <span className="text-gray-400 text-[11px] font-medium">
                    {item.date}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
