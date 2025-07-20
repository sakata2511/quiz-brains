type Props = {
  scores: Record<string, number>;
  onBackToTop: () => void;
};

export default function MultiResultScreen({ scores, onBackToTop }: Props) {
  const maxScore = Math.max(...Object.values(scores));
  const winners = Object.entries(scores)
    .filter(([_, score]) => score === maxScore)
    .map(([name]) => name);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold mb-4">🏆 結果発表</h1>

      <div className="text-2xl mb-6 animate-bounce">
        🎉 優勝: {winners.join(", ")} 🎉
      </div>

      <div className="space-y-2 mb-8">
        {Object.entries(scores).map(([name, score]) => (
          <div key={name} className="text-lg">
            {name}: {score} 点
          </div>
        ))}
      </div>

      <button
        onClick={onBackToTop}
        className="px-6 py-3 bg-yellow-500 text-black rounded-full shadow hover:bg-yellow-600 transition"
      >
        ⬅ トップへ戻る
      </button>
    </div>
  );
}
