type Props = {
  question: any;
  players: string[];
  onNext: () => void;
  onBack: () => void;
  onAddPoint: (player: string) => void;
};

export default function AnswerScreen({ question, players, onNext, onBack, onAddPoint }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <h2 className="text-xl mb-4">正解: {question.answer}</h2>
      <p className="mb-4">{question.explanation}</p>

      <div className="flex flex-wrap gap-3 justify-center">
        {players.map((player) => (
          <button
            key={player}
            onClick={() => onAddPoint(player)}
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-full shadow"
          >
            ✅ {player} に加算
          </button>
        ))}

        <button
          onClick={onNext}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full shadow"
        >
          🚫 加算せずに次へ
        </button>

        <button
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-600 text-black px-4 py-2 rounded-full shadow"
        >
          ⬅ 戻る
        </button>
      </div>
    </div>
  );
}
