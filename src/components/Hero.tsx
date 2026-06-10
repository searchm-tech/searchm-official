import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center bg-[#f8f8fa] overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          {/* TODO: CloudFront로 교체 예정 → https://img-prod.smpay.co.kr/searchm/hero-background.mp4 */}
          <source src={`${import.meta.env.BASE_URL}logos/hero-background.mp4`} type="video/mp4" />
        </video>
      </div>
      
      {/* Fallback/Overlay content if we wanted text directly over it, though the image shows "AI 영상" as a space filler or concept. 
          Assuming the Spline animation acts as the interactive background, we can leave the center relatively clean, or add a subtle title. */}
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs font-medium tracking-widest uppercase">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
      </div>

      <div className="absolute bottom-6 right-8 z-10 text-white/90 text-lg md:text-xl font-bold tracking-wide">
        *본 영상은 써치엠이 AI로 직접 제작한 영상입니다.
      </div>
    </section>
  );
}
