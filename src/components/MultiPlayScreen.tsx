import { useState } from "react";
import QuestionScreen from "./QuestionScreen";
import HintsScreen from "./HintsScreen";
import AnswerScreen from "./AnswerScreen";
import MultiResultScreen from "./MultiResultScreen";
import multiPlayerQuestions from "../data/multiPlayerQuestions";

type Props = {
  selectedSet: string;
  players: string[];
  onBackToTop: () => void;
};

export default function MultiPlayScreen({ selectedSet, players, onBackToTop }: Props) {
  const [current, setCurrent] = useState(0);
  const [screen, setScreen] = useState<"question" | "hints" | "answer" | "result">("question");
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(players.map(name => [name, 0]))
  );

  const questions = multiPlayerQuestions[selectedSet] ?? [];
  const currentQ = questions[current];

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setScreen("question");
    } else {
      setScreen("result");
    }
  };

  const addPoint = (player: string) => {
    setScores({ ...scores, [player]: scores[player] + 1 });
    nextQuestion();
  };

  if (screen === "result") {
    return (
      <MultiResultScreen
        scores={scores}
        onBackToTop={onBackToTop}
      />
    );
  }

  if (!currentQ) {
    return <div className="min-h-screen flex items-center justify-center text-white bg-black">読み込み中…</div>;
  }

  if (screen === "question") {
    return (
      <QuestionScreen
        question={currentQ}
        questionNumber={current + 1}
        totalQuestions={questions.length}
        onShowHints={() => setScreen("hints")}
        onShowAnswer={() => setScreen("answer")}
        onBackToTop={onBackToTop}
      />
    );
  }

  if (screen === "hints") {
    return (
      <HintsScreen
        hints={currentQ.hints}
        onBack={() => setScreen("question")}
      />
    );
  }

  if (screen === "answer") {
    return (
      <AnswerScreen
        question={currentQ}
        players={players}
        onNext={nextQuestion}
        onBack={() => setScreen("question")}
        onAddPoint={addPoint}
      />
    );
  }

  return null;
}
