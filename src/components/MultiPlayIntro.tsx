import React, { useState } from "react";

type Props = {
  onNext: (names: string[]) => void;
  onBack: () => void;
};

export default function MultiPlayIntro({ onNext, onBack }: Props) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [names, setNames] = useState<string[]>(["", ""]);

  const handleNumChange = (n: number) => {
    setNumPlayers(n);
    setNames(Array(n).fill(""));
  };

  const handleNameChange = (index: number, value: string) => {
    const updated = [...names];
    updated[index] = value;
    setNames(updated);
  };

  const handleNext = () => {
    const finalNames = names.map((n, i) => n.trim() || String.fromCharCode(65 + i));
    onNext(finalNames);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 px-4 text-white relative">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent animate-pulse"
        style={{ pointerEvents: "none" }}
      />

      <h1 className="text-4xl font-bold mb-8">🎮 みんなでモード </h1>

      <p className="mb-4 text-center text-blue-100 text-lg">
        誰が一番正解できるか！バトル！
      </p>

      <p className="mb-6 text-center text-sm text-blue-200">
        ※名前を入れなければ自動的に A, B, C… になります
      </p>

      <div className="mb-4">
        <label className="font-semibold text-blue-100">
          プレイヤー人数:
        </label>
        <select
          value={numPlayers}
          onChange={(e) => handleNumChange(parseInt(e.target.value))}
          className="ml-2 p-1 rounded shadow text-black"
        >
          {[2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}人
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 mb-6 w-full max-w-xs">
        {Array.from({ length: numPlayers }).map((_, i) => (
          <input
            key={i}
            type="text"
            placeholder={`プレイヤー ${i + 1} の名前`}
            value={names[i] || ""}
            onChange={(e) => handleNameChange(i, e.target.value)}
            className="w-full p-2 rounded shadow text-black"
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        className="bg-blue-300 text-blue-900 px-6 py-2 rounded-full shadow hover:bg-blue-200 transition"
      >
        次へ →
      </button>

      <button
        onClick={onBack}
        className="mt-4 text-blue-200 underline hover:text-white"
      >
        ⬅ メインメニューに戻る
      </button>
    </div>
  );
}
