import { useEffect, useRef, useState } from "react";

type Props = {
  onStart: (genre: string, difficulty: string) => void;
  onBack: () => void;
};

export default function TopPage({ onStart, onBack }: Props) {
  const [genre, setGenre] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  const genres = [
    { label: "雑学", value: "trivia" },
    { label: "漫画・アニメ", value: "manga" },
    { label: "世界史", value: "worldhistory" },
  ];

  const difficulties = [
    { label: "初級", value: "beginner" },
    { label: "中級", value: "intermediate" },
    { label: "上級", value: "advanced" },
  ];

  useEffect(() => {
    const audio = new Audio("/sounds/top-bgm.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().catch(() => {
      console.warn("BGMはユーザー操作後に開始されます");
    });
    bgmRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleStart = () => {
    if (!genre || !difficulty) {
      alert("ジャンルと難易度を選んでください！");
      return;
    }

    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }

    onStart(genre, difficulty);
  };

  const handleBack = () => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
    }
    onBack();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-700 px-4 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent animate-pulse"
      style={{ pointerEvents: "none" }}
      />
      
      <h1 className="text-6xl font-extrabold drop-shadow-xl animate-bounce mb-6">
        🎮 QUIZ BRAINS
      </h1>

      <p className="mb-8 text-lg md:text-xl text-blue-100 animate-fadeIn">
        ジャンルと難易度を選択
      </p>

      <div className="mb-8 w-full max-w-xs">
        <h2 className="text-xl font-bold mb-2">ジャンル</h2>
        <div className="grid grid-cols-1 gap-4">
          {genres.map((g) => (
            <button
              key={g.value}
              onClick={() => setGenre(g.value)}
              className={`py-3 rounded-full shadow-md transform transition-all duration-200 ${
                genre === g.value
                  ? "bg-pink-500 scale-105"
                  : "bg-white text-gray-800 hover:bg-pink-200"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 w-full max-w-xs">
        <h2 className="text-xl font-bold mb-2">難易度</h2>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map((d) => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              className={`py-2 rounded-full shadow-md transform transition-all duration-200 ${
                difficulty === d.value
                  ? "bg-green-500 scale-105"
                  : "bg-white text-gray-800 hover:bg-green-200"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="bg-yellow-500 text-black px-8 py-3 mt-4 rounded-full shadow-xl hover:bg-yellow-400 transition-all duration-200 disabled:opacity-50"
        disabled={!genre || !difficulty}
      >
        🚀 クイズスタート ▶
      </button>

      <button
        onClick={handleBack}
        className="mt-6 text-blue-200 underline hover:text-white"
      >
        ⬅ メインメニューに戻る
      </button>
    </div>
  );
}
