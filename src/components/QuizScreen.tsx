import { useEffect, useState } from "react";
import quizData from "../data/quizData";
import { timeLimits } from "../data/timeLimits";

type Props = {
  genre: string;
  level: string;
  onFinish: (
    score: number,
    total: number,
    history: { question: string; correct: boolean }[]
  ) => void;
};

type Question = {
  question: string;
  choices: string[];
  answer: string;
};

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRandomQuestions(array: Question[], count: number) {
  return shuffle(array).slice(0, count);
}

const playSound = (path: string) => {
  const audio = new Audio(path);
  audio.play();
};

export default function QuizScreen({ genre, level, onFinish }: Props) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [timeLeft, setTimeLeft] = useState(10);
  const [initialTime, setInitialTime] = useState(10);
  const [boom, setBoom] = useState(false);
  const [history, setHistory] = useState<{ question: string; correct: boolean }[]>([]);

  useEffect(() => {
    const bgm = new Audio("/sounds/quiz-bgm.mp3");
    bgm.loop = true;
    bgm.volume = 0.4;
    bgm.play();

    return () => {
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    const limit =
      timeLimits[genre]?.[level] !== undefined
        ? timeLimits[genre][level]
        : 10;
    setInitialTime(limit);
    setTimeLeft(limit);

    const pool = quizData[genre]?.[level] || [];
    const selectedQuestions =
      pool.length <= 10 ? pool : getRandomQuestions(pool, 10);
    setQuestions(selectedQuestions);
  }, [genre, level]);

  const question = questions[current];

  useEffect(() => {
    if (!question) return;

    if (timeLeft === 0) {
      setBoom(true);
      playSound("/sounds/wrong.mp3");
      setTimeout(() => {
        handleNext("");
      }, 1500);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, question]);

  const handleAnswer = (choice: string) => {
    const isCorrect = choice === question.answer;

    setSelected(choice);

    if (isCorrect) {
      setScore((s) => s + 1);
      playSound("/sounds/correct.mp3");
    } else {
      playSound("/sounds/wrong.mp3");
    }

    setHistory((h) => [
      ...h,
      { question: question.question, correct: isCorrect },
    ]);

    setTimeout(() => {
      handleNext(choice);
    }, 500);
  };

  const handleNext = (choice: string) => {
    setBoom(false);
    if (current < questions.length - 1) {
      setCurrent((i) => i + 1);
      setSelected("");
      setTimeLeft(initialTime);
    } else {
      const isCorrect = choice === question.answer;
      const finalHistory = [
        ...history,
        { question: question.question, correct: isCorrect },
      ];
      onFinish(
        score + (isCorrect ? 1 : 0),
        questions.length,
        finalHistory
      );
    }
  };

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-xl text-gray-600">
        問題を読み込み中…
      </div>
    );
  }

  const fuseWidth = `${(timeLeft / initialTime) * 100}%`;
  const fuseColor = timeLeft <= 3 ? "bg-red-500" : "bg-yellow-400";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-4 relative">
      {boom && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
          <span className="text-6xl animate-ping text-red-600">💥 BOOM!</span>
        </div>
      )}

      <div className="text-lg text-gray-700 mb-2">
        {current + 1} / {questions.length}
      </div>

      <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
        {question.question}
      </h2>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-4xl">💣</span>
        <div className="relative w-40 h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full ${fuseColor} transition-all duration-1000`}
            style={{ width: fuseWidth }}
          ></div>
          <span
            className="absolute right-0 -top-2 text-xl animate-pulse"
            style={{ right: `${100 - (timeLeft / initialTime) * 100}%` }}
          >
            🔥
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
        {question.choices.map((choice: string) => (
          <button
            key={choice}
            onClick={() => handleAnswer(choice)}
            disabled={!!selected || boom}
            className={`py-2 px-4 rounded shadow text-lg transition 
              ${
                selected === ""
                  ? "bg-white text-gray-800 hover:bg-blue-100"
                  : choice === question.answer
                  ? "bg-green-400 text-white"
                  : choice === selected
                  ? "bg-red-400 text-white"
                  : "bg-white text-gray-400"
              }`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}
