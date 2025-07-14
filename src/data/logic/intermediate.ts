export const logicIntermediate = [
  { question: "もし雨が降れば地面が濡れる。地面が濡れている。だから雨が降った。これは正しい推論か？", choices: ["正しい", "正しくない", "わからない", "場合による"], answer: "正しくない" },
  { question: "次のうち、論理的に無矛盾なのは？", choices: ["Aかつ非A", "Aまたは非A", "Aならば非A", "非AならばA"], answer: "Aまたは非A" },
  { question: "次の数列の次の数は？2,4,8,16,?", choices: ["20", "24", "30", "32"], answer: "32" },
  { question: "もし全ての猫が動物であり、ミケは猫である。ではミケは？", choices: ["動物", "植物", "鉱物", "不明"], answer: "動物" },
  { question: "次のうち論理的誤謬は？", choices: ["藁人形論法", "三段論法", "演繹法", "帰納法"], answer: "藁人形論法" },
  { question: "二重否定は肯定か否定か？", choices: ["肯定", "否定", "無関係", "不明"], answer: "肯定" },
  { question: "もしAならばB、かつBならばC。ならば？", choices: ["AならばC", "CならばA", "BならばA", "AならばBだけ"], answer: "AならばC" },
  { question: "論理記号∧は何を意味する？", choices: ["または", "かつ", "ならば", "否定"], answer: "かつ" },
  { question: "論理記号¬は何を意味する？", choices: ["否定", "肯定", "または", "かつ"], answer: "否定" },
  { question: "次のうち循環論法はどれ？", choices: ["結論が前提に含まれる", "前提が複数ある", "前提が無い", "結論が無い"], answer: "結論が前提に含まれる" },
  // 以下、論理中級レベルの問題を50問まで追加
  { question: "命題『AかつB』の真理値はどの場合に真か？", choices: ["AとBの両方が真", "Aだけが真", "Bだけが真", "どちらも偽"], answer: "AとBの両方が真" },
  { question: "論理的に同値な命題は？", choices: ["AならばBと¬AまたはB", "AならばBとAかつB", "AならばBとAまたはB", "AならばBとBならばA"], answer: "AならばBと¬AまたはB" },
  { question: "ド・モルガンの法則に該当するのは？", choices: ["¬(A∧B)=¬A∨¬B", "¬(A∨B)=¬A∧¬B", "両方", "どちらでもない"], answer: "両方" },
  { question: "真理値表において全ての組み合わせで真になる命題は？", choices: ["トートロジー", "矛盾", "随意", "無意味"], answer: "トートロジー" },
  { question: "ゲーデルの不完全性定理が示したのは？", choices: ["すべての命題は証明できないものもある", "全て証明可能", "論理は完全", "数学は無意味"], answer: "すべての命題は証明できないものもある" },
  { question: "論理積は英語で？", choices: ["AND", "OR", "NOT", "IF"], answer: "AND" },
  { question: "論理和は英語で？", choices: ["OR", "AND", "NOT", "IF"], answer: "OR" },
  { question: "二値論理におけるn変数の真理値表の行数は？", choices: ["2^n", "n", "n^2", "n!"], answer: "2^n" },
  { question: "矛盾命題とは？", choices: ["常に偽", "常に真", "不定", "場合による"], answer: "常に偽" },
  // …続けて中級レベルの論理問題を50問まで追加
];