export default function MultiResultScreen({
  players, scores, onBack,
}: {
  players: string[];
  scores: number[];
  onBack: () => void;
}) {
  const maxScore = Math.max(...scores);
  const winners = players.filter((_, i) => scores[i] === maxScore);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">🏆 結果発表</h1>
      <p>優勝: {winners.join(", ")}（{maxScore} 点）</p>
      <button onClick={onBack} className="mt-4 bg-green-600 px-4 py-2 rounded">
        戻る
      </button>
    </div>
  );
}
