type Props = {
  onSelectMode: (mode: "solo" | "multi") => void;
};

export default function MainTopPage({ onSelectMode }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-purple-800 text-white p-4">
      {/* <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg animate-bounce">
        QUIZ BRAINS
      </h1> */}
      <h1 className="text-6xl font-extrabold drop-shadow-xl animate-bounce mb-6">QUIZ BRAINS</h1>

      <p className="text-xl mb-8 animate-pulse">
        自分が天才だと思う人は、やってみてください...
      </p>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => onSelectMode("solo")}
          className="bg-green-500 hover:bg-green-400 text-white text-2xl px-8 py-4 rounded-full shadow-md transition transform hover:scale-105"
        >
          👤 ひとりで挑戦
        </button>

        <button
          onClick={() => onSelectMode("multi")}
          className="bg-yellow-400 hover:bg-yellow-300 text-black text-2xl px-8 py-4 rounded-full shadow-md transition transform hover:scale-105"
        >
          👥 みんなでバトル
        </button>
      </div>
    </div>
  );
}
