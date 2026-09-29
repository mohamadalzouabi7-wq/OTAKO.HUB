import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { VideoSource } from '@/types';

interface VideoPlayerProps {
  title: string;
  subtitle: string;
  sources: VideoSource[];
}

export default function VideoPlayer({ title, subtitle, sources }: VideoPlayerProps) {
  const [activeServer, setActiveServer] = useState(0);
  const source = sources[activeServer];

  const isIframe = source?.url.includes('embed') || source?.url.includes('iframe');
  const hasUrl = source && source.url && source.url.trim() !== '';

  return (
    <div className="w-full">
      {/* Player frame */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-strong border border-[#b026ff]/20 shadow-2xl shadow-black/50">
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          {hasUrl ? (
            isIframe ? (
              <iframe
                src={source.url}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media; picture-in-picture"
                title={title}
              />
            ) : (
              <video
                src={source.url}
                controls
                className="w-full h-full"
                title={title}
              />
            )
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-4 animate-pulse-glow">
                <AlertCircle className="w-10 h-10 text-[#b026ff]" />
              </div>
              <p className="text-gray-300 font-bold text-lg mb-2">رابط الفيديو غير مضاف بعد</p>
              <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                هذا placeholder جاهز لاستقبال رابط الفيديو الحقيقي.
                <br />
                أضف الرابط في ملف <code className="text-[#00f0ff]">src/config.ts</code> —
                ابحث عن رقم الحلقة أو معرّف الفيلم واستبدل <code className="text-[#ff2d95]">""</code> برابطك.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Title bar */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        </div>
      </div>

      {/* Server switcher */}
      <div className="mt-5">
        <p className="text-xs text-gray-500 font-bold mb-3 tracking-wider">اختر السيرفر:</p>
        <div className="flex flex-wrap gap-3">
          {sources.map((s, i) => (
            <button
              key={s.server}
              onClick={() => setActiveServer(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                i === activeServer
                  ? 'bg-gradient-to-r from-[#b026ff] to-[#ff2d95] text-white shadow-lg shadow-[#b026ff]/30 scale-105'
                  : 'glass text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${i === activeServer ? 'bg-white' : 'bg-[#b026ff]'}`} />
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
