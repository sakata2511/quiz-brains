type Props = {
  question: any;
  questionNumber: number;
  totalQuestions: number;
  onShowHints: () => void;
  onShowAnswer: () => void;
  onBackToTop: () => void;
};

export default function QuestionScreen({ question, questionNumber, totalQuestions, onShowHints, onShowAnswer, onBackToTop }: Props) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 to-black text-white p-4">
      <div className="text-lg mb-2">
        問題 {questionNumber} / {totalQuestions}
      </div>

      <img src={question.image} alt="question" className="w-40 h-40 mb-4" />
      <div className="text-xl mb-6">{question.question}</div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => new Audio("/sounds/correct.mp3").play()}
          className="bg-green-300 text-black py-2 px-4 rounded"
        >
          正解音
        </button>

        <button
          onClick={() => new Audio("/sounds/wrong.mp3").play()}
          className="bg-red-300 text-black py-2 px-4 rounded"
        >
          不正解音
        </button>

        <button
          onClick={onShowHints}
          className="bg-gray-300 text-black py-2 px-4 rounded"
        >
          ヒント
        </button>

        <button
          onClick={onShowAnswer}
          className="bg-gray-300 text-black py-2 px-4 rounded"
        >
          回答
        </button>
      
      </div>

      <button
        onClick={onBackToTop}
        className="mt-6 text-blue-300 underline"
      >
        ⬅ 選択画面へ戻る
      </button>
    </div>
  );
}
