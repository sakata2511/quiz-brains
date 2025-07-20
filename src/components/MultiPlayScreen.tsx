import { useState } from "react";
import QuestionScreen from "./QuestionScreen";
import HintsScreen from "./HintsScreen";
import AnswerScreen from "./AnswerScreen";
import multiPlayerQuestions from "../data/multiPlayerQuestions";

type Props = {
  selectedSet: string;
  players: string[];
  onFinish: () => void;
  onBackToTop: () => void;
};

export default function MultiPlayScreen({ selectedSet, players, onFinish, onBackToTop }: Props) {
  const [current, setCurrent] = useState(0);
  const [screen, setScreen] = useState<"question" | "hints" | "answer">("question");

  const questions = multiPlayerQuestions[selectedSet] ?? [];
  const currentQ = questions[current];

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setScreen("question");
    } else {
      onFinish();
    }
  };

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
      />
    );
  }

  return null;
}
