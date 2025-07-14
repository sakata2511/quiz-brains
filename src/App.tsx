import { useState } from "react";
import TopPage from "./components/TopPage";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";

export default function App() {
  const [page, setPage] = useState<"top" | "quiz" | "result">("top");
  const [genre, setGenre] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<{ question: string; correct: boolean }[]>([]);

  const handleRestart = () => {
    setGenre("");
    setDifficulty("");
    setScore(0);
    setTotal(0);
    setHistory([]);
    setPage("top");
  };

  return (
    <>
      {page === "top" && (
        <TopPage
          onStart={(g, d) => {
            setGenre(g);
            setDifficulty(d);
            setPage("quiz");
          }}
        />
      )}

      {page === "quiz" && (
        <QuizScreen
          genre={genre}
          level={difficulty}
          onFinish={(finalScore, totalQuestions, answerHistory) => {
            setScore(finalScore);
            setTotal(totalQuestions);
            setHistory(answerHistory);
            setPage("result");
          }}
        />
      )}

      {page === "result" && (
        <ResultScreen
          score={score}
          total={total}
          history={history}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}
