import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Calendar, User, Layers } from 'lucide-react';
import { useState, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;

const KNOWN_LOGO_FILES = [
  '11bungae.PNG',
  '3M.png',
  '3M_1.png',
  '3M_2.png',
  '3M_3.png',
  '3M_4.png',
  'coupang.PNG',
  'criteo.PNG',
  'danawa.PNG',
  'facebook.PNG',
  'google partner.PNG',
  'kakao.PNG',
  'mobon.PNG',
  'nate.PNG',
  'naver.PNG',
  'neoclick.PNG',
  'realclick.PNG',
  'wider planet.PNG',
  'zigzag.PNG',
  'unilever.png',
  'unilever_1.png',
  'unilever_2.png',
  'unilever_3.png',
  'unilever_4.png',
  'CJ wellcare.png',
  'CJ wellcare_1.png',
  'CJ wellcare_2.png',
  'CJ wellcare_3.png',
  'CJ wellcare_4.png',
  'gwangdong.png',
  'gwangdong_1.png',
  'gwangdong_2.png',
  'gwangdong_3.png',
  'gwangdong_4.png',
  'NH-nonghyup.jpg',
  'NH-nonghyup_1.jpg',
  'NH-nonghyup_2.jpg',
  'NH-nonghyup_3.jpg',
  'NH-nonghyup_4.jpg',
  'designmill.png',
  'designmill_1.png',
  'designmill_2.png',
  'designmill_3.png',
  'designmill_4.png',
  'VENUS.png',
  'VENUS_1.png',
  'VENUS_2.png',
  'VENUS_3.png',
  'VENUS_4.png',
  'sulwhasoo.png',
  'sulwhasoo_1.png',
  'sulwhasoo_2.png',
  'sulwhasoo_3.png',
  'sulwhasoo_4.png',
  'isens.png',
  'isens_1.jpg',
  'isens_2.jpg',
  'isens_3.jpg',
  'isens_4.jpg',
  'anguk.png',
  'anguk_1.jpg',
  'anguk_2.jpg',
  'anguk_3.jpg',
  'anguk_4.jpg'
];

function getExactLogoPath(client: string, index?: number): string | null {
  const normClient = client.trim().toLowerCase();
  
  // Try exact match with index if provided
  for (const filename of KNOWN_LOGO_FILES) {
    const lastDot = filename.lastIndexOf('.');
    const base = lastDot !== -1 ? filename.slice(0, lastDot) : filename;
    const baseNorm = base.toLowerCase();
    
    if (index !== undefined) {
      if (baseNorm === `${normClient}_${index}`) {
        return `${BASE}logos/${filename}`;
      }
    } else {
      if (baseNorm === normClient) {
        return `${BASE}logos/${filename}`;
      }
    }
  }
  
  // Try matching against other normalizations
  for (const filename of KNOWN_LOGO_FILES) {
    const lastDot = filename.lastIndexOf('.');
    const base = lastDot !== -1 ? filename.slice(0, lastDot) : filename;
    const baseNorm = base.replace(/[\s\-_]+/g, '').toLowerCase();
    const cleanClient = normClient.replace(/[\s\-_]+/g, '');
    
    if (index !== undefined) {
      if (baseNorm === `${cleanClient}_${index}` || baseNorm === `${cleanClient}${index}`) {
        return `${BASE}logos/${filename}`;
      }
    } else {
      if (baseNorm === cleanClient || baseNorm === `${cleanClient}_1` || baseNorm === `${cleanClient}1`) {
        return `${BASE}logos/${filename}`;
      }
    }
  }

  return null;
}

interface PortfolioImgProps {
  client: string;
  imageKey?: string;
  defaultUrl: string;
  alt?: string;
  className?: string;
}

function PortfolioImg({ client, imageKey, defaultUrl, alt = '', className = '' }: PortfolioImgProps) {
  const [src, setSrc] = useState<string>('');
  const key = imageKey ?? client;

  useEffect(() => {
    const exact = getExactLogoPath(key);
    if (exact) {
      setSrc(`${exact}?v=10`);
    } else {
      setSrc(`${BASE}logos/${key.trim()}.png?v=10`);
    }
  }, [key, defaultUrl]);

  const handleError = () => {
    if (src !== defaultUrl) {
      setSrc(defaultUrl);
    }
  };

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt || client}
      referrerPolicy="no-referrer"
      className={className}
      onError={handleError}
    />
  );
}

interface PortfolioThumbProps {
  client: string;
  imageKey?: string;
  index: number;
  defaultUrl: string;
  className?: string;
}

function PortfolioThumb({ client, imageKey, index, defaultUrl, className = '' }: PortfolioThumbProps) {
  const [src, setSrc] = useState<string>('');
  const key = imageKey ?? client;

  useEffect(() => {
    const exact = getExactLogoPath(key, index);
    if (exact) {
      setSrc(`${exact}?v=10`);
    } else {
      setSrc(`${BASE}logos/${key.trim()}_${index}.png?v=10`);
    }
  }, [key, index, defaultUrl]);

  const handleError = () => {
    if (src !== defaultUrl) {
      setSrc(defaultUrl);
    }
  };

  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      referrerPolicy="no-referrer"
      className={className}
      onError={handleError}
    />
  );
}

const portfolioItems = [
  {
    id: 1,
    client: '3M',
    imageKey: '3M',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2025~2026',
      title: '3M 퍼포먼스 캠페인',
      desc: '인지부터 투자자 확보까지 확보하는 퍼포먼스 캠페인',
      tags: ['#브랜드론칭', '#퍼포먼스마케팅']
    }
  },
  {
    id: 2,
    client: 'NH농협카드',
    imageKey: 'NH-nonghyup',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2024~2025',
      title: 'NH농협카드 브랜드 마케팅',
      desc: '금융 서비스 및 카드 혜택 중심의 브랜드 캠페인',
      tags: ['#퍼포먼스', '#세일즈']
    }
  },
  {
    id: 3,
    client: 'Sulwhasoo',
    imageKey: 'sulwhasoo',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2025',
      title: 'Sulwhasoo 글로벌 캠페인',
      desc: '겨울방학 신규 회원 확보 캠페인',
      tags: ['#뷰티', '#퍼포먼스']
    }
  },
  {
    id: 4,
    client: 'CJ wellcare',
    imageKey: 'CJ wellcare',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2024',
      title: 'CJ wellcare 프로모션 캠페인',
      desc: '시즌별 프로모션 캠페인',
      tags: ['#헬스케어', '#퍼포먼스']
    }
  },
  {
    id: 5,
    client: '안국약품',
    imageKey: 'anguk',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2025',
      title: '안국약품 디지털 캠페인',
      desc: '의약 건강 증진 및 대표 제품 퍼포먼스 캠페인',
      tags: ['#제약', '#퍼포먼스']
    }
  },
  {
    id: 6,
    client: '광동생활건강',
    imageKey: 'gwangdong',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2025',
      title: '광동생활건강 건강 프로모션',
      desc: '온라인 쇼핑 채널 활성화 및 성과 극대화 캠페인',
      tags: ['#건강식품', '#퍼포먼스']
    }
  },
  {
    id: 7,
    client: '유니레버',
    imageKey: 'unilever',
    category: 'Brand Marketing',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2025',
      title: '유니레버 브랜드 캠페인',
      desc: '글로벌 브랜드 정체성 강화 및 채널 통합 브랜드 마케팅',
      tags: ['#FMCG', '#브랜딩']
    }
  },
  {
    id: 8,
    client: 'VENUS',
    imageKey: 'VENUS',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2025~2026',
      title: 'VENUS 브랜드 캠페인',
      desc: '언더웨어 트렌드 선도 및 디지털 커먼스 프로모션',
      tags: ['#이너웨어', '#퍼포먼스']
    }
  },
  {
    id: 9,
    client: '아이센스',
    imageKey: 'isens',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2024~2025',
      title: '아이센스 퍼포먼스 마케팅',
      desc: '바이오 센서 제품 및 헬스케어 상담 연계 최적화 캠페인',
      tags: ['#바이오테크', '#퍼포먼스']
    }
  },
  {
    id: 10,
    client: '디자인밀',
    imageKey: 'designmill',
    category: 'Performance Marketing',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    hasMultipleImages: true,
    details: {
      period: '2024',
      title: '디자인밀 정기 구독 캠페인',
      desc: '개인 맞춤형 건강 식단 및 구독 활성화 캠페인',
      tags: ['#푸드구독', '#퍼포먼스']
    }
  }
];

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<(typeof portfolioItems)[0] | null>(null);

  // Close modal when clicking outside or pressing escape could be added,
  // but we keep it simple with an overlay click handler.

  return (
    <section id="portfolio" className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <div className="mb-16 space-y-3">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-primary tracking-tight"
          >
            PORTFOLIO
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-xl md:text-2xl pt-2 font-medium"
          >
            데이터와 크리에이티브로 증명한 성공 사례를 확인해보세요.
          </motion.p>
        </div>

        {/* Staggered Grid */}
        <div className="hidden lg:grid grid-cols-5 gap-6 pt-6 pb-24 items-start">
          {Array.from({length: 5}).map((_, colIdx) => {
            const isStaggered = colIdx === 1 || colIdx === 3;
            const colItems = portfolioItems.filter((_, i) => i % 5 === colIdx);
            return (
              <div key={colIdx} className={`flex flex-col gap-6 ${isStaggered ? 'pt-16' : ''}`}>
                {colItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (colIdx * 0.1) + (idx * 0.1) }}
                    onClick={() => setSelectedItem(item)}
                    className="group relative rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-full aspect-[4/5] bg-white overflow-hidden relative border-b border-gray-100">
                       <PortfolioImg client={item.client} imageKey={item.imageKey} defaultUrl={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-x-0 bottom-0 top-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold text-xl tracking-tight drop-shadow-md">
                            자세히 보기 &gt;
                          </span>
                       </div>
                    </div>
                    <div className="p-6 w-full text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.client}</h3>
                      <p className="text-sm text-gray-500 font-medium">{item.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="hidden md:grid lg:hidden grid-cols-3 gap-6 pt-6 pb-24 items-start">
          {Array.from({length: 3}).map((_, colIdx) => {
            const isStaggered = colIdx === 1;
            const colItems = portfolioItems.filter((_, i) => i % 3 === colIdx);
            return (
              <div key={colIdx} className={`flex flex-col gap-6 ${isStaggered ? 'pt-12' : ''}`}>
                {colItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (colIdx * 0.1) + (idx * 0.1) }}
                    onClick={() => setSelectedItem(item)}
                    className="group relative rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-full aspect-[4/5] bg-white overflow-hidden relative border-b border-gray-100">
                       <PortfolioImg client={item.client} imageKey={item.imageKey} defaultUrl={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-x-0 bottom-0 top-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold text-xl tracking-tight drop-shadow-md">
                            자세히 보기 &gt;
                          </span>
                       </div>
                    </div>
                    <div className="p-6 w-full text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.client}</h3>
                      <p className="text-sm text-gray-500 font-medium">{item.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>
        
        <div className="grid md:hidden grid-cols-2 gap-4 pt-6 pb-24 items-start">
          {Array.from({length: 2}).map((_, colIdx) => {
            const isStaggered = colIdx === 1;
            const colItems = portfolioItems.filter((_, i) => i % 2 === colIdx);
            return (
              <div key={colIdx} className={`flex flex-col gap-4 ${isStaggered ? 'pt-8' : ''}`}>
                {colItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (colIdx * 0.1) + (idx * 0.1) }}
                    onClick={() => setSelectedItem(item)}
                    className="group relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-full aspect-[4/5] bg-white overflow-hidden relative border-b border-gray-100">
                       <PortfolioImg client={item.client} imageKey={item.imageKey} defaultUrl={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute inset-x-0 bottom-0 top-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-bold text-lg tracking-tight drop-shadow-md">
                            자세히 보기 &gt;
                          </span>
                       </div>
                    </div>
                    <div className="p-4 w-full text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.client}</h3>
                      <p className="text-xs text-gray-500 font-medium">{item.category}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ModalContent item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>

    </section>
  );
}

function ModalContent({ item, onClose }: { item: any, onClose: () => void }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(item.hasMultipleImages ? 1 : 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors shadow-sm"
        >
          <X size={20} className="stroke-[3]" />
        </button>

        {/* Left Images Area */}
        <div className="w-full md:w-3/5 bg-gray-50 p-8 flex flex-col justify-center gap-4 overflow-y-auto hidden-scrollbar">
           <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100">
              {selectedImageIndex === 0 ? (
                 <PortfolioImg client={item.client} imageKey={item.imageKey} defaultUrl={item.image} className="w-full h-full object-cover" />
              ) : (
                 <PortfolioThumb client={item.client} imageKey={item.imageKey} index={selectedImageIndex} defaultUrl={item.image} className="w-full h-full object-cover" />
              )}
           </div>
           {/* Thumbnail row */}
           {item.hasMultipleImages && (
             <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImageIndex(i)}
                    className={`aspect-square rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm transition-all cursor-pointer ${
                      selectedImageIndex === i ? 'ring-2 ring-primary opacity-100' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                     <PortfolioThumb client={item.client} imageKey={item.imageKey} index={i} defaultUrl={item.image} className="w-full h-full object-cover filter grayscale hover:grayscale-0" />
                  </div>
                ))}
             </div>
           )}
        </div>

        {/* Right Content Area */}
        <div className="w-full md:w-2/5 p-8 md:p-12 bg-white flex flex-col justify-center overflow-y-auto">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
            {item.category}
          </span>
          
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 leading-tight">
            {item.details.title}
          </h3>
          
          <div className="space-y-6 mb-8 border-t border-b border-gray-100 py-6">
            <div className="flex items-center gap-4 text-gray-700">
              <Calendar size={20} className="text-gray-400" />
              <div>
                <span className="text-xs font-bold text-gray-400 block uppercase">Period</span>
                <span className="font-medium">{item.details.period}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-gray-700">
              <User size={20} className="text-gray-400" />
              <div>
                <span className="text-xs font-bold text-gray-400 block uppercase">Client</span>
                <span className="font-medium">{item.client}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-700">
              <Layers size={20} className="text-gray-400" />
              <div>
                <span className="text-xs font-bold text-gray-400 block uppercase">Description</span>
                <span className="font-medium">{item.details.desc}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {item.details.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-full text-xs font-bold border border-gray-100">
                {tag}
              </span>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 border-2 border-gray-100 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            뒤로가기
          </button>
        </div>

      </motion.div>
    </div>
  );
}
