import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Footer() {
  const [isFamilySiteOpen, setIsFamilySiteOpen] = useState(false);

  return (
    <footer className="bg-[#E7E9EC] py-12 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between text-xs text-gray-600 font-medium leading-relaxed">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <span className="font-bold text-gray-800 text-sm mr-2">주식회사 써치엠</span>
              <span>대표이사: 박규태</span>
              <span className="w-[1px] h-3 bg-gray-400 hidden sm:block"></span>
              <span>사업자 등록번호: 211-88-14382</span>
              <span className="w-[1px] h-3 bg-gray-400 hidden sm:block"></span>
              <span>통신판매업 신고번호: 제 2008-서울강남-1564호</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
              <span>서울특별시 강남구 역삼로 156, 2층, 4층 (역삼동 789-7)</span>
              <span className="w-[1px] h-3 bg-gray-400 hidden sm:block"></span>
              <span>대표번호 02-3446-7260</span>
              <span className="w-[1px] h-3 bg-gray-400 hidden sm:block"></span>
              <span>광고문의 02-539-7260</span>
            </div>
            <p className="pt-4 text-gray-500">
              COPYRIGHT (C) searchM. ALL RIGHTS RESERVED.
            </p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFamilySiteOpen(!isFamilySiteOpen)}
              className="flex items-center justify-between w-40 px-4 py-2 bg-white border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>Family Site</span>
              <ChevronDown size={16} className={`transition-transform ${isFamilySiteOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isFamilySiteOpen && (
              <div className="absolute bottom-full left-0 w-full mb-1 bg-white border border-gray-300 rounded shadow-lg overflow-hidden">
                <a 
                  href="https://smpay.co.kr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  SMPay
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </footer>
  );
}
