export default function MultiSetSelect({ onSelectSet, onBack }: { onSelectSet: (n: number) => void; onBack: () => void }) {
  const sets = [1, 2, 3, 4, 5];
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">セットを選んでください</h1>
      {sets.map((n) => (
        <button key={n} onClick={() => onSelectSet(n)} className="m-1 px-4 py-2 bg-purple-600 rounded">
          初級 {n}-1
        </button>
      ))}
      <button onClick={onBack} className="text-blue-300 underline mt-4">戻る</button>
    </div>
  );
}
