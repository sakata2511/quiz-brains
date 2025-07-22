import { useState } from "react";

type Props = {
  hints: string[];
  onBack: () => void;
};

export default function HintsScreen({ hints, onBack }: Props) {
  const [hintIndex, setHintIndex] = useState(0);
  

  const nextHint = () => {
    if (hintIndex < hints.length - 1) {
      setHintIndex(hintIndex + 1);
      new Audio("/sounds/page.mp3").play();
    } else {
      setHintIndex(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-800 to-black text-white p-4">
      <h2 className="text-2xl mb-4">ヒント</h2>
      <div className="text-lg bg-gray-800 p-4 rounded mb-4">{hints[hintIndex]}</div>

      <div className="flex gap-4">
        <button
          onClick={nextHint}
          className="bg-yellow-500 text-black py-2 px-4 rounded"
        >
          次のヒント
        </button>

        <button
          onClick={onBack}
          className="bg-gray-300 text-black py-2 px-4 rounded"
        >
          戻る
        </button>
      </div>
    </div>
  );
}
