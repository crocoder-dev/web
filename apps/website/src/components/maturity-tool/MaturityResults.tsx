import { useMemo } from "react";
import {
  DIMENSIONS,
  levelForScore,
  type Answers,
  type DimensionMeta,
  type Question,
} from "../../data/maturityAssessment";
import RadarChart from "./RadarChart";

const scoreTone = (score: number) => {
  if (score < 2.5) {
    return {
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
      bar: "bg-red-400",
    };
  }
  if (score < 3.5) {
    return {
      text: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      bar: "bg-amber-400",
    };
  }
  return {
    text: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    bar: "bg-emerald-500",
  };
};

interface DimensionResult {
  dimension: DimensionMeta;
  score: number;
  weakest: Question;
}

export default function MaturityResults({ answers }: { answers: Answers }) {
  const results: DimensionResult[] = useMemo(() => {
    return DIMENSIONS.map((dimension) => {
      const scores = dimension.questions.map((q) => answers[q.id] ?? 0);
      const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
      // Round the dimension average to a whole 1-5 level instead of showing a decimal.
      const score = levelForScore(mean).score;
      const weakest = dimension.questions.reduce((min, q) =>
        (answers[q.id] ?? 0) < (answers[min.id] ?? 0) ? q : min
      );
      return { dimension, score, weakest };
    });
  }, [answers]);

  const weakestDimensionResult = useMemo(() => {
    if (results.length === 0) return null;
    return results.reduce((min, r) => (r.score < min.score ? r : min));
  }, [results]);

  return (
    <div className="flex flex-col gap-10">
      {weakestDimensionResult && (
        <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
          <span className="uppercase text-xs font-bold tracking-wide text-primary">
            Your maturity profile
          </span>
          <h1 className="text-2xl sm:text-h2-sm md:text-h2 font-medium text-dark">
            Your biggest constraint sits in{" "}
            <span className="text-primary">{weakestDimensionResult.dimension.title}</span>
          </h1>
          <p className="text-text text-base">
            Scoring {weakestDimensionResult.score}/5 (
            {levelForScore(weakestDimensionResult.score).name}). Maturity isn't a single number.
            Review the full profile below to see where to focus next.
          </p>
        </div>
      )}

      <RadarChart
        points={results.map((r) => ({
          id: r.dimension.id,
          label: r.dimension.title,
          score: r.score,
        }))}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((r) => {
          const tone = scoreTone(r.score);
          const level = levelForScore(r.score);
          return (
            <div
              key={r.dimension.id}
              className={`rounded-2xl border p-5 flex flex-col gap-3 ${tone.border} ${tone.bg}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium text-dark text-lg">{r.dimension.title}</h3>
                <span className={`font-semibold text-sm whitespace-nowrap ${tone.text}`}>
                  {r.score}/5 · {level.name}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/70 overflow-hidden">
                <div
                  className={`h-full rounded-full ${tone.bar}`}
                  style={{ width: `${(r.score / 5) * 100}%` }}
                />
              </div>
              <p className="text-sm text-text">
                <span className="font-medium text-dark">Primary constraint: </span>
                {r.weakest.prompt}
              </p>
              <p className="text-sm text-text">
                <span className="font-medium text-dark">Recommended next step: </span>
                {r.weakest.intervention}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <a
          href="#book-a-call-section"
          className="rounded-md px-6 py-3 text-center font-medium bg-crocoder-yellow text-contrast hover:opacity-90 whitespace-nowrap"
        >
          Talk through these results
        </a>
        <a
          href="/technical-maturity-assessment"
          className="rounded-md px-6 py-3 text-center font-medium text-text hover:text-dark whitespace-nowrap"
        >
          Restart assessment
        </a>
      </div>
    </div>
  );
}
