// ═══════════════════════════════════════════════════════════════════════
//                                                                    ═
//  OTAKU.HUB — ملف الروابط والبيانات القابل للتعديل يدوياً             ═
//  ─────────────────────────────────────────────────────────────────    ═
//                                                                    ═
//  هذا هو الملف الوحيد الذي تحتاج إلى تعديله لإضافة روابط الفيديو       ═
//  الحقيقية. افتحه بأي محرر نصوص (Notepad أو أي محرر) واستبدل           ═
//  الروابط الوهمية بروابطك الحقيقية.                                  ═
//                                                                    ═
//  ═══════════════════════════════════════════════════════════════════   ═
//  كيفية الاستخدام:                                                    ═
//  ──────────────                                                      ═
//  1. لكل حلقة: استبدل "" برابط الفيديو الحقيقي                        ═
//     - رابط مباشر (.mp4 / .webm): يُشغّل في مشغل الفيديو المدمج       ═
//     - رابط تضمين (iframe embed): يُشغّل في إطار iframe              ═
//  2. لكل فيلم: نفس الطريقة                                             ═
//  3. يمكنك إضافة أكثر من سيرفر لكل حلقة/فيلم                           ═
//  4. اترك الرابط فارغاً "" إذا لم تريد إضافته بعد                     ═
//                                                                    ═
//  أمثلة:                                                              ═
//    { server: "server1", label: "سيرفر 1", url: "https://example.com/video.mp4" }  ═
//    { server: "server2", label: "سيرفر 2", url: "https://example.com/embed/123" }  ═
//                                                                    ═
//  ═══════════════════════════════════════════════════════════════════   ═

export interface VideoLink {
  server: string;
  label: string;
  url: string;
}

// ═══════════════════════════════════════════════════════════════════════
//  1) روابط الحلقات (EPISODES)                                          ═
//  ─────────────────────────────────                                    ═
//  لكل أنمي: مصفوفة تحتوي على روابط كل حلقة.                            ═
//  الرقم في المصفوفة = رقم الحلقة (ابتداءً من 1).                       ═
//  استبدل "" برابط الفيديو الحقيقي لكل حلقة.                            ═
//  يمكنك إضافة عدة سيرفرات لكل حلقة.                                    ═
//                                                                    ═
//  ملاحظة: إذا لم تجد حلقة معينة في القائمة، فالمشغل سيعرض             ═
//  رسالة "رابط الفيديو غير مضاف بعد" تلقائياً.                          ═
// ═══════════════════════════════════════════════════════════════════════

export const episodeLinks: Record<string, Record<number, VideoLink[]>> = {

  // ─── المحقق كونان (1130 حلقة) ───
  conan: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    3: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات بنفس النمط (4, 5, 6, ... حتى 1130)
    // يمكنك نسخ ولصق النمط وتغيير الرقم
  },

  // ─── ون بيس (1110 حلقات) ───
  onepiece: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── هجوم العمالقة (89 حلقة) ───
  aot: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── قاتل الشياطين (63 حلقة) ───
  demonslayer: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── جوجوتسو كايسن (47 حلقة) ───
  jjk: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── ناروتو شيبودن (500 حلقة) ───
  naruto: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── القناص (148 حلقة) ───
  hxh: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── بلو لوك (24 حلقة) ───
  bluelock: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── مذكرة الموت (37 حلقة) ───
  deathnote: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── رجل اللكمة الواحدة (24 حلقة) ───
  opm: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── أكاديميتي للأبطال (138 حلقة) ───
  mha: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── بيرسيرك (25 حلقة) ───
  berserk: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── غول طوكيو (48 حلقة) ───
  tokyo: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── كود غياس (50 حلقة) ───
  codegeass: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── الكيميائي الفولاذي (64 حلقة) ───
  fma: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── مونستر (74 حلقة) ───
  monster: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },

  // ─── ملحمة فاينلاند (48 حلقة) ───
  vinland: {
    1: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    2: [
      { server: "server1", label: "سيرفر 1", url: "" },
      { server: "server2", label: "سيرفر 2", url: "" },
    ],
    // ... أضف بقية الحلقات
  },
};


// ═══════════════════════════════════════════════════════════════════════
//  2) روابط الأفلام (MOVIES)                                            ═
//  ─────────────────────────                                            ═
//  كل فيلم تابع لأنمي معين. استبدل "" برابط الفيديو الحقيقي.            ═
//  مفتاح كل فيلم = معرّف الفيلم (movieId) المستخدم في ملف data.ts      ═
// ═══════════════════════════════════════════════════════════════════════

export const movieLinks: Record<string, VideoLink[]> = {

  // ─── أفلام المحقق كونان ───
  "conan-movie-1": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-2": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-3": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-4": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-5": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-6": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-7": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-8": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-9": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-10": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-11": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-12": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-13": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-14": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-15": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-16": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-17": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-18": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-19": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-20": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-21": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-22": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-23": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-24": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-25": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "conan-movie-26": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],

  // ─── أفلام ون بيس ───
  "onepiece-movie-1": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-2": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-3": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-4": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-5": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-6": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-7": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-8": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-9": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-10": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-11": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-12": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-13": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-14": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "onepiece-movie-15": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],

  // ─── أفلام هجوم العمالقة ───
  "aot-movie-1": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "aot-movie-2": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],

  // ─── أفلام قاتل الشياطين ───
  "demonslayer-movie-1": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "demonslayer-movie-2": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "demonslayer-movie-3": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],

  // ─── أفلام جوجوتسو كايسن ───
  "jjk-movie-1": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],

  // ─── أفلام ناروتو ───
  "naruto-movie-1": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "naruto-movie-2": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "naruto-movie-3": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],

  // ─── أفلام القناص ───
  "hxh-movie-1": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
  "hxh-movie-2": [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ],
};


// ═══════════════════════════════════════════════════════════════════════
//  دوال مساعدة (لا تحتاج لتعديلها)                                       ═
// ═══════════════════════════════════════════════════════════════════════

export function getEpisodeLinks(animeId: string, episode: number): VideoLink[] {
  const animeEpisodes = episodeLinks[animeId];
  if (animeEpisodes && animeEpisodes[episode]) {
    return animeEpisodes[episode];
  }
  // إرجاع placeholder فارغ إذا لم يتم العثور على روابط
  return [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ];
}

export function getMovieLinks(movieId: string): VideoLink[] {
  if (movieLinks[movieId]) {
    return movieLinks[movieId];
  }
  return [
    { server: "server1", label: "سيرفر 1", url: "" },
    { server: "server2", label: "سيرفر 2", url: "" },
  ];
}
