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
  index,
}: {
  question: Question;
  value: number | undefined;
  onChange: (value: number) => void;
  index: number;
}) {
  const options = useMemo(() => shuffle(buildOptions(question)), [question.id]);

  return (
    <div
      className="maturity-question-enter rounded-2xl border border-border bg-white p-5 sm:p-6 flex flex-col gap-4"
      style={{ animationDelay: `${index * 45}ms` }}
    >
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
              className={`group flex w-full items-start gap-3 text-left rounded-lg border px-4 py-3 text-sm sm:text-base leading-snug cursor-pointer transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99] ${
                isSelected
                  ? "bg-primary/10 border-primary text-dark"
                  : "bg-theme-light border-border text-text hover:border-primary/60"
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-[0.2em] grid size-[18px] shrink-0 place-items-center rounded-full border bg-white transition-colors duration-150 ${
                  isSelected
                    ? "border-primary"
                    : "border-border group-hover:border-primary/60"
                }`}
              >
                <span
                  className={`size-2 rounded-full bg-primary transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isSelected ? "scale-100 opacity-100" : "scale-50 opacity-0"
                  }`}
                />
              </span>
              <span>{opt.text}</span>
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
  const didMountRef = useRef(false);

  useEffect(() => {
    // Only scroll when the user moves between dimensions, never on the initial
    // mount — this component is embedded partway down an article.
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
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
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
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
        {currentDimension.questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            index={i}
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
          className="rounded-md px-5 py-3 font-medium text-text hover:text-dark disabled:opacity-0 disabled:pointer-events-none cursor-pointer transition-[color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!currentDimensionAnswered}
          className="rounded-md px-6 py-3 font-medium bg-crocoder-yellow text-contrast hover:opacity-90 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
        >
          {dimensionIndex < DIMENSIONS.length - 1 ? "Next" : "See my results"}
        </button>
      </div>
    </div>
  );
}
