type Props = {
  question: any;
  players: string[];
  onNext: () => void;
  onBack: () => void;
};

export default function AnswerScreen({ question, players, onNext, onBack }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-900 to-black text-white p-4">
      <h2 className="text-2xl mb-4">回答</h2>

      <div className="bg-gray-800 p-4 rounded mb-4">
        <div><span className="text-yellow-300">正解:</span> {question.answer}</div>
        <div className="mt-2"><span className="text-blue-300">解説:</span> {question.explanation}</div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {players.map((p) => (
          <button
            key={p}
            onClick={onNext}
            className="bg-green-400 text-black py-2 px-4 rounded"
          >
            ✅ {p} に加算
          </button>
        ))}
        <button
          onClick={onNext}
          className="bg-yellow-400 text-black py-2 px-4 rounded"
        >
          🚫 加算せず次へ
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
