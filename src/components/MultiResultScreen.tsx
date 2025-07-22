import { useEffect} from "react";

type Props = {
  scores: Record<string, number>;
  onBackToTop: () => void;
};

export default function MultiResultScreen({ scores, onBackToTop }: Props) {
  useEffect(() => {
    const bgm = new Audio("/sounds/result-bgm.mp3");
    bgm.loop = true;
    bgm.volume = 0.4;
    bgm.play();

    return () => {
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, []);

  const maxScore = Math.max(...Object.values(scores));
  const winners = Object.entries(scores)
    .filter(([_, score]) => score === maxScore)
    .map(([name]) => name);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white p-6">
      <h1 className="text-4xl mb-4">🏆 結果発表</h1>

      <div className="text-2xl mb-6">🎉 優勝: {winners.join(", ")} 🎉</div>

      <div className="space-y-2 mb-8">
        {Object.entries(scores).map(([name, score]) => (
          <div key={name}>{name}: {score} 点</div>
        ))}
      </div>

      <button onClick={onBackToTop} className="bg-yellow-500 px-4 py-2 rounded">⬅ トップへ戻る</button>
    </div>
  );
}
