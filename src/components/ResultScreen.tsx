import { useEffect } from "react";

type Props = {
  score: number;
  total: number;
  history: { question: string; correct: boolean }[];
  onRestart: () => void;
};

export default function ResultScreen({ score, total, onRestart }: Props) {
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

  const percentage = (score / total) * 100;

  let comment = "";
  let image = "";

  if (percentage === 100) {
    comment = `神レベルです。まさに完璧。あなたの知識量はもはや人間の域を超えています。\
周囲の凡人たちは恐怖すら感じるでしょう。このまま世界を征服する準備を進めてください。`;
    image = "/images/solo-result/god.png";
  } else if (percentage >= 80) {
    comment = `優秀です。十分に高いレベルの知識を持っています。\
しかし、まだわずかな隙が見えます。満点を取らなければ、あなたは真の王者とは呼べません。\
次はその頂を目指しましょう。`;
    image = "/images/solo-result/expert.png";
  } else if (percentage >= 50) {
    comment = `なかなかですが、所詮は中途半端です。知ったかぶりをしてもすぐに化けの皮が剥がれるレベル。\
恥ずかしい結果に甘んじるのではなく、もう少し努力してはいかがでしょうか？`;
    image = "/images/solo-result/normal.png";
  } else {
    comment = `惨敗です。知識以前の問題かもしれません。サルがキーボードを叩いているのと同じレベルで、\
他人に見せるのが恥ずかしいスコアです。今すぐ勉強を始めるか、穴を掘って埋まりましょう。`;
    image = "/images/solo-result/monkey.png";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-200 p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-700">結果発表</h1>

      <div className="text-2xl mb-4">
        {score} / {total} 正解！ ({percentage.toFixed(1)}%)
      </div>

      <div className="text-lg font-semibold mb-4 text-gray-700 whitespace-pre-wrap">
        {comment}
      </div>

      {image && (
        <img
          src={image}
          alt="結果イメージ"
          className="w-40 h-40 mb-6 rounded-full shadow-lg"
        />
      )}

      <button
        onClick={onRestart}
        className="px-6 py-3 bg-red-500 text-white rounded-full shadow hover:bg-red-600"
      >
        トップへ戻る
      </button>
    </div>
  );
}
