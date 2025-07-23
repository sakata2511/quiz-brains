import { useEffect } from "react";

type Props = {
  scores: Record<string, number>;
  onBackToTop: () => void;
  totalQuestions?: number; // 何問中か（デフォルト10問）
};

export default function MultiResultScreen({ scores, onBackToTop, totalQuestions = 10 }: Props) {
  useEffect(() => {
    const bgm = new Audio("/sounds/result-bgm.mp3");
    bgm.loop = true;
    bgm.volume = 0.4;
    bgm.play();

    return () => {
      bgm.pause();
      bgm.currentTime = 0;
    };
  }, []);

  const maxScore = Math.max(...Object.values(scores));
  const winners = Object.entries(scores)
    .filter(([_, score]) => score === maxScore)
    .map(([name]) => name);

  const comments: string[] = [
    "惨敗です。知識以前の問題かもしれません。他人に見せるのが恥ずかしいスコアです。今すぐ勉強を始めるか、穴を掘って埋まりましょう。",
    "ゴミのような得点。もっとマシな点数を取ろうな。",
    "知識が浅い。もう少し日本語を勉強しよう。",
    "恥ずかしいでね。",
    "半分も取れないとは…。",
    "凡夫。自惚れも甚だしい。",
    "少しは見込みがあるかと思ったんだけどな。",
    "中途半端な点数。ドンマイ。",
    "もしあなたが小学生だったら賢いと言われていたかもですね。",
    "ほぼ完ぺき。ほぼね。",
    "神レベルです。恐れ入りました。"
  ];

  // スコアに応じたコメントとIQを返す
  const getCommentAndIQ = (score: number) => {
    const ratio = Math.round((score / totalQuestions) * 10); // 0〜10
    const comment = comments[ratio];
    const iq = 70 + ratio * 3 + Math.floor(Math.random() * 3); // 70〜100くらい
    return { comment, iq };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white p-6">
      <h1 className="text-4xl mb-4">🏆 結果発表</h1>

      <div className="text-2xl mb-6">🎉 優勝: {winners.join(", ")} 🎉</div>

      <div className="space-y-4 mb-8">
        {Object.entries(scores).map(([name, score]) => {
          const { comment, iq } = getCommentAndIQ(score);
          return (
            <div
              key={name}
              className="bg-gray-800 rounded p-4 shadow w-full max-w-md"
            >
              <div className="text-xl">{name}: {score} 点</div>
              <div className="text-sm text-red-300 mt-1">💬 {comment}</div>
              <div className="text-sm text-yellow-300">IQ: {iq}</div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onBackToTop}
        className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-400 text-black"
      >
        ⬅ トップへ戻る
      </button>
    </div>
  );
}
