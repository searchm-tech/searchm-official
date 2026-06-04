import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, Loader2, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    adType: '',
    budget: '',
    message: '',
    agreeTerms: false,
  });

  const getAdTypeLabel = (type: string) => {
    switch (type) {
      case 'search': return '검색 광고';
      case 'banner': return '배너 광고';
      case 'coupang': return '쿠팡 광고';
      case 'sns': return 'SNS 광고';
      case 'video': return '영상 광고';
      case 'app': return '앱 광고';
      case 'viral': return '바이럴 광고';
      case 'other': return '기타 광고';
      default: return '미선택';
    }
  };

  const getBudgetLabel = (budget: string) => {
    switch (budget) {
      case 'under5m': return '500만원 미만';
      case '5m-10m': return '500만원 ~ 1,000만원';
      case '10m-50m': return '1,000만원 ~ 5,000만원';
      case '50m-100m': return '5,000만원 ~ 1억원';
      case 'over100m': return '1억원 이상';
      default: return '미선택';
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError('EmailJS 설정이 필요합니다. 환경변수를 확인해주세요.');
      setIsSubmitting(false);
      return;
    }

    try {
      const formattedMessage = `공식 홈페이지를 통해 아래와 같이 소중한 광고문의가 접수되었습니다:

[문의 항목별 정리]
--------------------------------------------------
■ 의뢰인 정보
  - 성함/담당자: ${formData.name}
  - 회사명: ${formData.company}
  - 이메일: ${formData.email}
  - 연락처: ${formData.phone}
  - 홈페이지: ${formData.website || '없음'}

■ 광고의뢰 정보
  - 광고 유형: ${getAdTypeLabel(formData.adType)}
  - 희망 예산 (월 기준): ${getBudgetLabel(formData.budget)}

■ 상세 문의내용
${formData.message}
--------------------------------------------------`;

      const templateParams = {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        website: formData.website || '없음',
        adType: getAdTypeLabel(formData.adType),
        budget: getBudgetLabel(formData.budget),
        message: formattedMessage,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        setShowSuccessModal(true);
        // Reset form
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          website: '',
          adType: '',
          budget: '',
          message: '',
          agreeTerms: false,
        });
      } else {
        throw new Error('이메일 발송에 실패했습니다.');
      }
    } catch (err: any) {
      console.error('Submit error:', err);
      setSubmitError(err.message || '오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight"
          >
            CONTACT US
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl font-medium"
          >
            아래 내용을 자세히 작성해주시면 빠른 답변을 드릴 수 있도록 최선을 다하겠습니다.<br/>
            <span className="font-medium mt-2 block text-gray-300">
              <span className="text-primary">tel</span> 02-2051-5620 <span className="text-gray-600 mx-2">|</span> 
              <span className="text-primary">E-mail</span> g_mktps@searchm.co.kr
            </span>
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-bold text-gray-200">이름 <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="담당자 이름을 입력해주세요."
                className="w-full pb-3 border-b border-gray-600 bg-transparent text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500 text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-bold text-gray-200">회사명 <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="회사명을 입력해주세요."
                className="w-full pb-3 border-b border-gray-600 bg-transparent text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500 text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-gray-200">이메일 <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="답변 받을 이메일을 입력해주세요."
                className="w-full pb-3 border-b border-gray-600 bg-transparent text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500 text-sm"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-bold text-gray-200">연락처 <span className="text-red-500">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="연락처를 입력해주세요."
                className="w-full pb-3 border-b border-gray-600 bg-transparent text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500 text-sm"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="website" className="block text-sm font-bold text-gray-200">홈페이지</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="홈페이지 url을 입력해주세요."
                className="w-full pb-3 border-b border-gray-600 bg-transparent text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="adType" className="block text-sm font-bold text-gray-200">광고 유형</label>
              <div className="relative">
                <select
                  id="adType"
                  name="adType"
                  value={formData.adType}
                  onChange={handleChange}
                  className="w-full pb-3 border-b border-gray-600 bg-transparent text-white focus:outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer pr-8 [&>option]:bg-gray-900 [&>option]:text-white [&>option]:py-2"
                >
                  <option value="" disabled>선택</option>
                  <option value="search">검색 광고</option>
                  <option value="banner">배너 광고</option>
                  <option value="coupang">쿠팡 광고</option>
                  <option value="sns">SNS 광고</option>
                  <option value="video">영상 광고</option>
                  <option value="app">앱 광고</option>
                  <option value="viral">바이럴 광고</option>
                  <option value="other">기타 광고</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="budget" className="block text-sm font-bold text-gray-200">광고예산 (월기준)</label>
              <div className="relative">
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full pb-3 border-b border-gray-600 bg-transparent text-white focus:outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer pr-8 [&>option]:bg-gray-900 [&>option]:text-white [&>option]:py-2"
                >
                  <option value="" disabled>선택</option>
                  <option value="under5m">500만원 미만</option>
                  <option value="5m-10m">500만원 ~ 1,000만원</option>
                  <option value="10m-50m">1,000만원 ~ 5,000만원</option>
                  <option value="50m-100m">5,000만원 ~ 1억원</option>
                  <option value="over100m">1억원 이상</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="message" className="block text-sm font-bold text-gray-200 mb-4">문의내용</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="광고 목적 및 목표, 현재 문제점, 기타 문의사항 등 프로젝트 정보에 대해 상세하게 기재해 주시면 꼼꼼히 검토 후 1-3 영업일 내 답변드리고 있습니다."
                className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-gray-500 text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-8">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="peer appearance-none w-5 h-5 border-2 border-gray-600 rounded-sm checked:bg-primary checked:border-primary focus:outline-none transition-colors"
                  required
                />
                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-sm font-bold text-gray-300">개인정보 수집 및 이용을 위한 약관 동의</span>
            </label>
            <p className="text-xs text-gray-500">1:1문의를 위한 개인정보 수집·이용 안내를 확인하였으며, 내용에 동의합니다.</p>

            {submitError && (
              <p className="text-sm text-red-500 font-medium text-center mt-2 max-w-md bg-red-500/10 border border-red-500/20 px-4 py-2.5 rounded-xl">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 px-16 py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-full transition-colors w-full md:w-auto shadow-lg shadow-primary/20 disabled:bg-gray-700 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  전송 중...
                </>
              ) : (
                '문의하기'
              )}
            </button>
          </div>
        </motion.form>

      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-md bg-white border border-gray-100 p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center"
            >
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 transition-colors"
                aria-label="닫기"
              >
                <X size={20} />
              </button>

              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6">
                <CheckCircle2 size={36} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-none mb-3">
                문의하기 접수 완료
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-sm">
                소중한 광고 문의가 성공적으로 접수되었습니다.<br />
                담당자가 꼼꼼히 검토 후 1-3 영업일 내 답변드리겠습니다.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-4 bg-primary hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm shadow-md shadow-primary/10"
              >
                확인
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
