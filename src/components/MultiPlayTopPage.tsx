type Props = {
  onSelectSet: (set: string) => void;
  onBack: () => void;
};

export default function MultiPlayTopPage({ onSelectSet, onBack }: Props) {
  const sets = [
    { label: "初級 1", value: "beginner-1" },
    { label: "中級 1", value: "intermediate-1" },
    { label: "上級 1", value: "advanced-1" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">🎮 みんなでモード </h1>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        {sets.map((set) => (
          <button
            key={set.value}
            onClick={() => onSelectSet(set.value)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded shadow text-lg"
          >
            {set.label}
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="mt-6 text-sm text-blue-200 underline hover:text-white"
      >
        ⬅ メインメニューに戻る
      </button>
    </div>
  );
}
