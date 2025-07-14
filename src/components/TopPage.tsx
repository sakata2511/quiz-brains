import { useEffect, useRef, useState } from "react";

type Props = {
  onStart: (genre: string, difficulty: string) => void;
};

export default function TopPage({ onStart }: Props) {
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
    bgmRef.current = new Audio("/sounds/top-bgm.mp3");
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.4;

    // 再生開始
    bgmRef.current.play().catch(() => {
      console.warn("BGMはユーザー操作後に開始されます");
    });

    // クリーンアップ: TopPageがアンマウントされたら停止
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">QUIZ BRAINS</h1>
      <p className="mb-8 text-gray-700 text-center">ジャンルと難易度を選んで挑戦しよう！</p>

      <div className="mb-6 w-full max-w-xs">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">ジャンル</h2>
        <div className="grid grid-cols-1 gap-3">
          {genres.map((g) => (
            <button
              key={g.value}
              onClick={() => setGenre(g.value)}
              className={`py-3 rounded-full shadow-md transition ${
                genre === g.value
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-600 border border-blue-300"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8 w-full max-w-xs">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">難易度</h2>
        <div className="grid grid-cols-3 gap-3">
          {difficulties.map((d) => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              className={`py-2 rounded-full shadow-sm transition ${
                difficulty === d.value
                  ? "bg-green-500 text-white"
                  : "bg-white text-green-600 border border-green-300"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
      >
        クイズスタート ▶
      </button>
    </div>
  );
}
