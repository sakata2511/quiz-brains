import { useState } from "react";
import MainTopPage from "./components/MainTopPage";
import TopPage from "./components/TopPage";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";
import MultiPlayIntro from "./components/MultiPlayIntro";
import MultiPlayTopPage from "./components/MultiPlayTopPage";
import MultiPlayScreen from "./components/MultiPlayScreen";

export default function App() {
  const [page, setPage] = useState<
    "main" | "soloTop" | "soloQuiz" | "soloResult" | "multiIntro" | "multiTop" | "multiPlay"
  >("main");

  const [genre, setGenre] = useState("");
  const [level, setLevel] = useState("");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<{ question: string; correct: boolean }[]>([]);
  const [selectedSet, setSelectedSet] = useState("");
  const [players, setPlayers] = useState<string[]>([]);

  const reset = () => {
    setGenre("");
    setLevel("");
    setScore(0);
    setTotal(0);
    setHistory([]);
    setSelectedSet("");
    setPlayers([]);
  };

  return (
    <>
      {page === "main" && (
        <MainTopPage
          onSelectMode={(mode) => {
            reset();
            if (mode === "solo") {
              setPage("soloTop");
            } else if (mode === "multi") {
              setPage("multiIntro");
            }
          }}
        />
      )}

      {page === "soloTop" && (
        <TopPage
          onStart={(g, l) => {
            setGenre(g);
            setLevel(l);
            setPage("soloQuiz");
          }}
          onBack={() => setPage("main")}
        />
      )}

      {page === "soloQuiz" && (
        <QuizScreen
          genre={genre}
          level={level}
          onFinish={(s, t, h) => {
            setScore(s);
            setTotal(t);
            setHistory(h);
            setPage("soloResult");
          }}
        />
      )}

      {page === "soloResult" && (
        <ResultScreen
          score={score}
          total={total}
          history={history}
          onRestart={() => setPage("main")}
        />
      )}

      {page === "multiIntro" && (
        <MultiPlayIntro
          onNext={(names) => {
            setPlayers(names);
            setPage("multiTop");
          }}
          onBack={() => setPage("main")}
        />
      )}

      {page === "multiTop" && (
        <MultiPlayTopPage
          onSelectSet={(set) => {
            setSelectedSet(set);
            setPage("multiPlay");
          }}
          onBack={() => setPage("multiIntro")}
        />
      )}

      {page === "multiPlay" && (
        <MultiPlayScreen
          selectedSet={selectedSet}
          players={players}
          onBackToTop={() => setPage("main")} // ← 追加
        />
      )}
    </>
  );
}
