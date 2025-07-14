// 📂 src/data/quizData.ts

import triviaBeginner from "./trivia/beginner";
import triviaIntermediate from "./trivia/intermediate";
import triviaAdvanced from "./trivia/advanced";

import mangaBeginner from "./manga/beginner";
import mangaIntermediate from "./manga/intermediate";
import mangaAdvanced from "./manga/advanced";

import worldhistoryBeginner from "./worldhistory/beginner";
import worldhistoryIntermediate from "./worldhistory/intermediate";
import worldhistoryAdvanced from "./worldhistory/advanced";

type Question = {
  question: string;
  choices: string[];
  answer: string;
};

// 配列をシャッフルする関数
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 問題の選択肢をシャッフルして返す
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
  manga: {
    beginner: prepareQuestions(mangaBeginner),
    intermediate: prepareQuestions(mangaIntermediate),
    advanced: prepareQuestions(mangaAdvanced),
  },
  worldhistory: {
    beginner: prepareQuestions(worldhistoryBeginner),
    intermediate: prepareQuestions(worldhistoryIntermediate),
    advanced: prepareQuestions(worldhistoryAdvanced),
  },
};

export default quizData;
