import { useEffect, useMemo, useRef, useState } from "react";
import {
  DIMENSIONS,
  TOTAL_QUESTIONS,
  encodeAnswers,
  type Answers,
  type Question,
} from "../../data/maturityAssessment";

interface AnswerOption {
  value: 1 | 3 | 5;
  text: string;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const buildOptions = (q: Question): AnswerOption[] => [
  { value: 1, text: q.anchors[1] },
  { value: 3, text: q.anchors[3] },
  { value: 5, text: q.anchors[5] },
];

function QuestionCard({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: number | undefined;
  onChange: (value: number) => void;
}) {
  const options = useMemo(() => shuffle(buildOptions(question)), [question.id]);

  return (
    <div className="rounded-2xl border border-border bg-white p-5 sm:p-6 flex flex-col gap-4">
      <p className="text-dark font-medium text-base sm:text-lg leading-snug">
        {question.prompt}
      </p>

      <div role="radiogroup" aria-label={question.prompt} className="flex flex-col gap-2">
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`text-left rounded-lg border px-4 py-3 text-sm sm:text-base leading-snug transition-colors cursor-pointer ${
                isSelected
                  ? "bg-primary/10 border-primary text-dark"
                  : "bg-theme-light border-border text-text hover:border-primary/60"
              }`}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-light">
        <span className="font-medium">Evidence we'd look for:</span> {question.evidence}
      </p>
    </div>
  );
}

export default function MaturityAssessment() {
  const [answers, setAnswers] = useState<Answers>({});
  const [dimensionIndex, setDimensionIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [dimensionIndex]);

  const currentDimension = DIMENSIONS[dimensionIndex];

  const answeredCount = Object.keys(answers).length;
  const overallProgress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  const currentDimensionAnswered = currentDimension.questions.every(
    (q) => answers[q.id] !== undefined
  );

  const handleSelect = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (dimensionIndex < DIMENSIONS.length - 1) {
      setDimensionIndex((i) => i + 1);
      return;
    }
    const code = encodeAnswers(answers);
    window.location.href = `/technical-maturity-assessment/results?a=${code}`;
  };

  const handleBack = () => {
    if (dimensionIndex > 0) {
      setDimensionIndex((i) => i - 1);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-6 scroll-mt-24">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-light">
          <span>
            Dimension {dimensionIndex + 1} of {DIMENSIONS.length}
          </span>
          <span>
            {answeredCount}/{TOTAL_QUESTIONS} answered
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-theme-light overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl sm:text-h3 font-medium text-dark">
          {currentDimension.title}
        </h2>
        <p className="text-text text-sm sm:text-base">{currentDimension.description}</p>
      </div>

      <div className="flex flex-col gap-4">
        {currentDimension.questions.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={answers[q.id]}
            onChange={(v) => handleSelect(q.id, v)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleBack}
          disabled={dimensionIndex === 0}
          className="rounded-md px-5 py-3 font-medium text-text hover:text-dark disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!currentDimensionAnswered}
          className="rounded-md px-6 py-3 font-medium bg-crocoder-yellow text-contrast hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
        >
          {dimensionIndex < DIMENSIONS.length - 1 ? "Next" : "See my results"}
        </button>
      </div>
    </div>
  );
}
