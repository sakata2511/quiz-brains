import { useEffect, useState, useRef } from "react";
import quizData from "../data/quizData";

type Props = {
  genre: string;
  level: string;
  onFinish: (
    score: number,
    total: number,
    history: { question: string; correct: boolean }[]
  ) => void;
};

export default function QuizScreen({ genre, level, onFinish }: Props) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [boom, setBoom] = useState(false);
  const [history, setHistory] = useState<{ question: string; correct: boolean }[]>([]);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const q = quizData[genre]?.[level] ?? [];
    const selected10 = q.length > 10 ? q.slice(0, 10) : q;
    setQuestions(selected10);
  }, [genre, level]);

  useEffect(() => {
    // BGM 再生
    bgmRef.current = new Audio("/sounds/quiz-bgm.mp3");
    bgmRef.current.loop = true;
    bgmRef.current.volume = 0.4;

    bgmRef.current.play().catch(() => {
      console.warn("BGMはユーザー操作後に開始されます");
    });

    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (!questions.length) return;

    if (timeLeft <= 0) {
      setBoom(true);
      new Audio("/sounds/wrong.mp3").play();
      setTimeout(() => nextQuestion(null), 1500);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, questions, current]);

  const currentQ = questions[current];

  const handleAnswer = (choice: string) => {
    const isCorrect = choice === currentQ.answer;
    setSelected(choice);

    if (isCorrect) {
      setScore((s) => s + 1);
      new Audio("/sounds/correct.mp3").play();
    } else {
      new Audio("/sounds/wrong.mp3").play();
    }

    setHistory([...history, { question: currentQ.question, correct: isCorrect }]);
    setTimeout(() => nextQuestion(choice), 1500);
  };

  const nextQuestion = (choice: string | null) => {
    setBoom(false);
    setSelected(null);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(10);
    } else {
      onFinish(score + (choice === currentQ.answer ? 1 : 0), questions.length, history);
    }
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-white bg-black">
        問題を読み込み中…
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white p-4 relative">
      {/* 爆発演出 */}
      {boom && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-10 text-6xl animate-ping text-red-600">
          💥 BOOM!
        </div>
      )}

      <div className="mb-4 text-lg font-bold">
        問題 {current + 1} / {questions.length}
      </div>

      <div className="text-2xl mb-4 text-center">{currentQ.question}</div>

      {/* タイマー */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">💣</span>
        <div className="w-48 h-4 bg-gray-700 rounded-full relative overflow-hidden">
          <div
            className={`absolute top-0 left-0 h-full ${
              timeLeft <= 3 ? "bg-red-500" : "bg-yellow-400"
            } transition-all`}
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          />
        </div>
        <span className="text-lg">{timeLeft}s</span>
      </div>

      {/* 選択肢 */}
      <div className="grid gap-4 w-full max-w-md">
        {currentQ.choices.map((c: string) => {
          const isCorrect = c === currentQ.answer;
          const isSelected = selected === c;

          let className = "py-3 px-4 rounded-full text-lg font-semibold shadow-md transition-transform duration-200";

          if (selected !== null) {
            if (isCorrect) {
              className += " bg-green-500 text-white scale-105";
            } else if (isSelected) {
              className += " bg-red-500 text-white scale-105";
            } else {
              className += " bg-gray-800";
            }
          } else {
            className += " bg-gray-800 hover:bg-gray-700";
          }

          return (
            <button
              key={c}
              onClick={() => handleAnswer(c)}
              disabled={selected !== null || boom}
              className={className}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
