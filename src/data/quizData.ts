// 📂 src/data/quizData.ts

import { triviaBeginner } from "./trivia/beginner";
import { triviaIntermediate } from "./trivia/intermediate";
import { triviaAdvanced } from "./trivia/advanced";

import { logicBeginner } from "./logic/beginner";
import { logicIntermediate } from "./logic/intermediate";
import { logicAdvanced } from "./logic/advanced";

import { literatureBeginner } from "./literature/beginner";
import { literatureIntermediate } from "./literature/intermediate";
import { literatureAdvanced } from "./literature/advanced";

type Question = {
  question: string;
  choices: string[];
  answer: string;
};

// 配列シャッフル関数
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 問題の選択肢をシャッフル
function prepareQuestions(raw: Question[]): Question[] {
  return raw.map(q => ({
    ...q,
    choices: shuffleArray(q.choices),
  }));
}

// エクスポートするデータ
const quizData: {
  [genre: string]: {
    [level: string]: Question[];
  };
} = {
  trivia: {
    beginner: prepareQuestions(triviaBeginner),
    intermediate: prepareQuestions(triviaIntermediate),
    advanced: prepareQuestions(triviaAdvanced),
  },
  logic: {
    beginner: prepareQuestions(logicBeginner),
    intermediate: prepareQuestions(logicIntermediate),
    advanced: prepareQuestions(logicAdvanced),
  },
  literature: {
    beginner: prepareQuestions(literatureBeginner),
    intermediate: prepareQuestions(literatureIntermediate),
    advanced: prepareQuestions(literatureAdvanced),
  },
};

export default quizData;
