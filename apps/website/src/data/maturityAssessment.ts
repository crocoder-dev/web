export type DimensionId =
  | "technology-strategy"
  | "architecture"
  | "delivery"
  | "quality-reliability"
  | "security-risk"
  | "developer-experience"
  | "people-organization"
  | "measurement-learning";

export interface Question {
  id: string;
  prompt: string;
  anchors: {
    1: string;
    3: string;
    5: string;
  };
  evidence: string;
  intervention: string;
}

export interface DimensionMeta {
  id: DimensionId;
  title: string;
  description: string;
  interventionTheme: string;
  questions: Question[];
}

export interface Level {
  score: 1 | 2 | 3 | 4 | 5;
  name: string;
  description: string;
}

export const LEVELS: Level[] = [
  {
    score: 1,
    name: "Reactive",
    description:
      "Success depends on individuals. Fires drive priorities. Processes are mostly implicit.",
  },
  {
    score: 2,
    name: "Repeatable",
    description:
      "Basic standards and repeatable practices exist, but adoption is uneven.",
  },
  {
    score: 3,
    name: "Managed",
    description:
      "Outcomes are measured, ownership is explicit, and risks are actively managed.",
  },
  {
    score: 4,
    name: "Scalable",
    description:
      "Platforms, architecture, governance, and organization support growth without proportional overhead.",
  },
  {
    score: 5,
    name: "Adaptive",
    description:
      "The organization continuously improves based on evidence and can change technology and structure quickly.",
  },
];

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: "technology-strategy",
    title: "Technology Strategy",
    description:
      "Whether technology choices, priorities, and investments are explicitly connected to business goals and can adapt as evidence changes.",
    interventionTheme:
      "Connect technology decisions to business outcomes and make investment assumptions explicit.",
    questions: [
      {
        id: "ts-1",
        prompt:
          "How clearly are technology priorities derived from business goals and constraints?",
        anchors: {
          1: "Priorities are driven mainly by incidents, requests, or individual preferences.",
          3: "Major priorities can be traced to documented business objectives.",
          5: "Priorities are continuously adjusted as business objectives and constraints change.",
        },
        evidence:
          "Business strategy, technology roadmap, quarterly priorities, investment proposals.",
        intervention:
          "Map business objectives to required technical capabilities and engineering initiatives.",
      },
      {
        id: "ts-2",
        prompt:
          "How consistently are technology investments prioritized based on impact, cost, and risk?",
        anchors: {
          1: "Investment is driven primarily by urgency or stakeholder influence.",
          3: "Major investments use a consistent view of cost, risk, and expected impact.",
          5: "Portfolio decisions use measurable outcomes and explicit trade-offs across investments.",
        },
        evidence: "Business cases, prioritization criteria, budgets, roadmap decisions.",
        intervention:
          "Introduce a lightweight investment framework covering value, risk, cost, urgency, and reversibility.",
      },
      {
        id: "ts-3",
        prompt:
          "How clearly does the organization distinguish strategic capabilities from commodity capabilities?",
        anchors: {
          1: "Most technology is treated as something the organization should build or control itself.",
          3: "Build, buy, and partner choices are conscious for significant capabilities.",
          5: "Differentiating capabilities are regularly reassessed and commodity investment is deliberately minimized.",
        },
        evidence: "Vendor decisions, build-vs-buy analysis, platform strategy, architecture reviews.",
        intervention:
          "Classify capabilities as differentiating, enabling, or commodity and align investment accordingly.",
      },
      {
        id: "ts-4",
        prompt:
          "How regularly are major technology decisions reviewed against their original assumptions?",
        anchors: {
          1: "Decisions persist unless they create visible problems.",
          3: "Important decisions are occasionally reviewed against expected outcomes.",
          5: "Assumptions are explicit and decisions are routinely revisited when evidence changes.",
        },
        evidence: "ADRs, investment reviews, post-implementation reviews, KPI reports.",
        intervention:
          "Record assumptions and expected outcomes with major decisions and define lightweight review triggers.",
      },
      {
        id: "ts-5",
        prompt: "How effectively can technology strategy change when conditions change?",
        anchors: {
          1: "Strategy changes mainly through crisis or leadership intervention.",
          3: "Formal planning cycles allow priorities to change periodically.",
          5: "New information can rapidly redirect priorities without destabilizing the organization.",
        },
        evidence: "Reprioritization history, strategy reviews, stopped initiatives, budget changes.",
        intervention:
          "Shorten strategy feedback loops and create explicit mechanisms to stop or redirect initiatives.",
      },
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    description:
      "Whether system boundaries, ownership, and technical design enable teams to change systems safely without excessive coordination.",
    interventionTheme:
      "Reduce the coordination required per change rather than pursuing architectural sophistication for its own sake.",
    questions: [
      {
        id: "arch-1",
        prompt:
          "How clearly are system boundaries, responsibilities, dependencies, and ownership defined?",
        anchors: {
          1: "Ownership is unclear and knowledge lives primarily with individuals.",
          3: "Major systems have documented ownership and understood boundaries.",
          5: "Boundaries and ownership are visible, current, and deliberately adjusted as the organization changes.",
        },
        evidence: "Architecture diagrams, service catalogs, ownership maps, team responsibilities.",
        intervention:
          "Establish explicit system and domain ownership with a lightweight service or capability catalog.",
      },
      {
        id: "arch-2",
        prompt: "How independently can teams change their systems?",
        anchors: {
          1: "Small changes frequently require coordination across several teams.",
          3: "Most routine changes stay within a team's area of ownership.",
          5: "Teams change and deploy independently while consuming well-defined contracts from others.",
        },
        evidence: "PR dependencies, release coordination, dependency maps, interviews.",
        intervention:
          "Identify the highest-cost cross-team dependencies and redesign ownership, interfaces, or data boundaries.",
      },
      {
        id: "arch-3",
        prompt: "How consistently are architectural decisions documented and revisited?",
        anchors: {
          1: "Architectural decisions are mostly implicit or person-dependent.",
          3: "Significant decisions are documented with rationale and trade-offs.",
          5: "Assumptions, consequences, and review conditions are explicit and revisited when evidence changes.",
        },
        evidence: "ADRs, architecture review records, technical proposals.",
        intervention:
          "Adopt lightweight ADRs focused on context, trade-offs, assumptions, and review triggers.",
      },
      {
        id: "arch-4",
        prompt: "How well does architecture support current non-functional requirements?",
        anchors: {
          1: "Scalability, reliability, security, and maintainability are addressed after problems occur.",
          3: "Important non-functional requirements are understood and deliberately designed for.",
          5: "Architectural characteristics are measured and investment changes as requirements evolve.",
        },
        evidence: "SLOs, performance data, capacity models, security assessments, incidents.",
        intervention:
          "Define the critical architectural characteristics for each system and make them measurable.",
      },
      {
        id: "arch-5",
        prompt:
          "How effectively are architectural constraints identified before they limit growth or delivery?",
        anchors: {
          1: "Constraints become visible through outages, slow delivery, or crises.",
          3: "Known architectural risks are tracked and periodically addressed.",
          5: "Leading indicators expose constraints and teams reduce them before they become bottlenecks.",
        },
        evidence: "Tech debt registers, incident trends, capacity data, delivery bottlenecks.",
        intervention: "Introduce architectural fitness indicators and a recurring constraint review.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    description:
      "Whether changes can move from development to production predictably, safely, and with low coordination overhead.",
    interventionTheme:
      "Optimize flow — especially waiting and coordination — instead of individual developer output.",
    questions: [
      {
        id: "del-1",
        prompt: "How reliably can teams move a change from development to production?",
        anchors: {
          1: "Releases are irregular, risky, or highly manual.",
          3: "Most teams have a predictable delivery process.",
          5: "Small changes reach production safely and routinely with minimal ceremony.",
        },
        evidence: "Deployment history, release process, lead times.",
        intervention:
          "Map the path from commit to production and remove the largest manual queues and approvals.",
      },
      {
        id: "del-2",
        prompt: "How automated are build, test, deployment, rollback, and release processes?",
        anchors: {
          1: "Most steps require manual intervention.",
          3: "Common workflows are substantially automated.",
          5: "Delivery is highly automated with self-service recovery, rollback, and progressive delivery where appropriate.",
        },
        evidence: "CI/CD pipelines, release scripts, deployment documentation.",
        intervention: "Automate the highest-frequency and highest-risk manual delivery steps first.",
      },
      {
        id: "del-3",
        prompt: "How independently can teams release changes?",
        anchors: {
          1: "Releases depend on centralized teams, release trains, or broad coordination.",
          3: "Most teams deploy independently within established controls.",
          5: "Independent deployment is the default and dependencies rarely dictate release timing.",
        },
        evidence: "Release calendars, approval processes, team interviews.",
        intervention:
          "Remove shared release dependencies and move operational capabilities closer to owning teams.",
      },
      {
        id: "del-4",
        prompt: "How well does the organization understand delivery performance?",
        anchors: {
          1: "Delivery performance is discussed mainly through anecdotes.",
          3: "Lead time, deployment frequency, failures, and recovery are measured.",
          5: "Metrics are segmented, interpreted, and used to identify systemic constraints.",
        },
        evidence: "DORA-style metrics, workflow analytics, dashboards.",
        intervention:
          "Establish a small set of flow and reliability metrics and review them as a system, not as targets.",
      },
      {
        id: "del-5",
        prompt: "How systematically are delivery bottlenecks identified and removed?",
        anchors: {
          1: "Teams work around bottlenecks.",
          3: "Major bottlenecks are identified and improvement initiatives occasionally address them.",
          5: "Constraint identification and removal is part of normal engineering management.",
        },
        evidence: "Lead-time breakdowns, retrospectives, queue lengths, improvement initiatives.",
        intervention:
          "Introduce recurring value-stream and constraint analysis with ownership of the largest systemic bottleneck.",
      },
    ],
  },
  {
    id: "quality-reliability",
    title: "Quality & Reliability",
    description:
      "Whether the organization can prevent unacceptable failures, detect problems quickly, recover predictably, and learn from production evidence.",
    interventionTheme: "Move from detecting defects to managing and reducing failure risk.",
    questions: [
      {
        id: "qr-1",
        prompt: "How consistently is quality built into development?",
        anchors: {
          1: "Quality is primarily verified after development or after release.",
          3: "Teams have explicit quality practices throughout development.",
          5: "Quality controls are risk-based and continuously adjusted using production evidence.",
        },
        evidence: "Definition of done, QA process, test strategy, defect history.",
        intervention:
          "Define quality expectations earlier in delivery and shift repetitive verification into automation.",
      },
      {
        id: "qr-2",
        prompt: "How effectively do automated tests provide confidence?",
        anchors: {
          1: "Coverage is limited, fragile, or unrelated to important risks.",
          3: "Critical behavior has reliable automated protection.",
          5: "Test investment is deliberately optimized around failure modes and feedback speed.",
        },
        evidence: "Test suite, flaky-test data, escaped defects, build duration.",
        intervention:
          "Shift testing strategy from coverage targets toward risk coverage and feedback quality.",
      },
      {
        id: "qr-3",
        prompt: "How clearly are reliability expectations defined?",
        anchors: {
          1: "Reliability expectations are implicit until customers complain.",
          3: "Important services have measurable reliability objectives.",
          5: "SLOs explicitly guide engineering and product trade-offs.",
        },
        evidence: "SLOs, SLAs, availability metrics, error budgets.",
        intervention:
          "Define user-centered SLIs and SLOs for the most business-critical services.",
      },
      {
        id: "qr-4",
        prompt: "How effectively can teams recover from production failures?",
        anchors: {
          1: "Failures require manual investigation and specialist intervention.",
          3: "Monitoring, runbooks, and ownership enable predictable recovery.",
          5: "Detection, diagnosis, mitigation, and recovery are highly automated where valuable.",
        },
        evidence: "Incident records, MTTR, observability, runbooks.",
        intervention:
          "Improve observability around user impact and automate the most common recovery paths.",
      },
      {
        id: "qr-5",
        prompt: "How systematically does the organization learn from incidents?",
        anchors: {
          1: "Incidents are fixed locally and attention shifts to the next problem.",
          3: "Significant incidents receive structured, blameless reviews.",
          5: "Incident patterns drive architectural, organizational, and investment decisions.",
        },
        evidence: "Postmortems, recurring incident analysis, action completion.",
        intervention:
          "Aggregate incident learnings and identify systemic patterns instead of treating incidents independently.",
      },
    ],
  },
  {
    id: "security-risk",
    title: "Security & Risk",
    description:
      "Whether security is integrated into engineering and whether risk is understood in business context rather than as a list of vulnerabilities.",
    interventionTheme: "Replace compliance-oriented activity with risk-oriented engineering controls.",
    questions: [
      {
        id: "sr-1",
        prompt: "How early and consistently is security incorporated into engineering decisions?",
        anchors: {
          1: "Security review occurs late or mainly after incidents.",
          3: "Security requirements are integrated into major development workflows.",
          5: "Security decisions are embedded in architecture and engineering with low-friction automated guardrails.",
        },
        evidence: "SDLC policies, threat models, security reviews, pipeline controls.",
        intervention:
          "Introduce security requirements and threat modeling at design time for high-risk changes.",
      },
      {
        id: "sr-2",
        prompt: "How clearly does the organization understand its technical risks?",
        anchors: {
          1: "Risks are represented mainly as vulnerability lists.",
          3: "Critical assets, threats, and risks are identified and prioritized.",
          5: "Risk is continuously evaluated in terms of likelihood, exposure, and business consequence.",
        },
        evidence: "Risk register, threat models, asset inventory, audits.",
        intervention:
          "Build a technical risk model connecting assets, threats, vulnerabilities, and business impact.",
      },
      {
        id: "sr-3",
        prompt: "How automated are security controls?",
        anchors: {
          1: "Controls rely heavily on reviews and manual checks.",
          3: "Common controls are integrated into CI/CD and infrastructure workflows.",
          5: "Secure defaults and policy-as-code make the safe path the easiest path.",
        },
        evidence: "CI security checks, IAM policies, infrastructure as code, secrets management.",
        intervention: "Automate repeatable controls and introduce secure platform defaults.",
      },
      {
        id: "sr-4",
        prompt:
          "How effectively are vulnerabilities prioritized and resolved according to actual risk?",
        anchors: {
          1: "Teams respond primarily according to scanner severity or external pressure.",
          3: "Vulnerabilities are triaged based on severity and context.",
          5: "Prioritization includes exploitability, exposure, assets, compensating controls, and impact.",
        },
        evidence: "Vulnerability backlog, remediation data, risk exceptions.",
        intervention:
          "Move from severity-based prioritization toward contextual risk-based remediation.",
      },
      {
        id: "sr-5",
        prompt: "How regularly are security assumptions, controls, and threat models revisited?",
        anchors: {
          1: "Controls remain unchanged until an audit or incident forces change.",
          3: "Periodic reviews assess significant systems and controls.",
          5: "Architecture, threats, and business exposure continuously feed back into security controls.",
        },
        evidence: "Control reviews, penetration tests, threat-model revisions.",
        intervention:
          "Define triggers that require security assumptions and threat models to be reassessed.",
      },
    ],
  },
  {
    id: "developer-experience",
    title: "Developer Experience",
    description:
      "Whether engineers can become productive quickly and execute common workflows without recurring internal friction.",
    interventionTheme: "Identify and remove the organization's repeated engineering taxes.",
    questions: [
      {
        id: "dx-1",
        prompt: "How quickly can an engineer become productive when joining a team or system?",
        anchors: {
          1: "Setup requires significant tribal knowledge and manual assistance.",
          3: "Standard onboarding enables predictable productivity.",
          5: "Environments and documentation are largely self-service and onboarding friction is measured.",
        },
        evidence: "Onboarding docs, setup steps, onboarding surveys, time-to-first-change.",
        intervention:
          "Measure time-to-first-meaningful-change and eliminate the most frequent onboarding blockers.",
      },
      {
        id: "dx-2",
        prompt: "How easy are routine development activities such as build, test, run, debug, and deploy?",
        anchors: {
          1: "Workflows differ widely and often fail.",
          3: "Common workflows are standardized and documented.",
          5: "Golden paths make common workflows fast and self-service while allowing justified exceptions.",
        },
        evidence: "Build tooling, CI times, development environments, developer interviews.",
        intervention: "Define paved roads for high-frequency engineering workflows.",
      },
      {
        id: "dx-3",
        prompt: "How much engineering time is lost to internal friction?",
        anchors: {
          1: "Friction is accepted as part of engineering work and rarely measured.",
          3: "Major sources of friction are known and periodically addressed.",
          5: "Developer friction is continuously measured and prioritized as an organizational cost.",
        },
        evidence: "Surveys, CI wait time, support tickets, environment failures.",
        intervention:
          "Create a developer-friction backlog based on observed time lost, not anecdotes alone.",
      },
      {
        id: "dx-4",
        prompt: "How effectively do shared platforms and tools provide reusable capabilities?",
        anchors: {
          1: "Platform teams operate mainly as ticket queues or infrastructure gatekeepers.",
          3: "Shared capabilities provide reusable services and documented interfaces.",
          5: "Platform capabilities operate as internal products with self-service workflows and measured adoption and value.",
        },
        evidence: "Platform usage, tickets, APIs, developer feedback.",
        intervention:
          "Treat platform capabilities as products with users, ownership, adoption metrics, and service expectations.",
      },
      {
        id: "dx-5",
        prompt: "How systematically is developer experience measured and improved?",
        anchors: {
          1: "Improvements depend on individual initiative.",
          3: "Developer feedback periodically informs tooling investment.",
          5: "Quantitative and qualitative evidence continuously drives developer-experience investment.",
        },
        evidence: "Developer surveys, workflow analytics, platform roadmaps.",
        intervention:
          "Establish a recurring DX review combining sentiment, workflow metrics, and business impact.",
      },
    ],
  },
  {
    id: "people-organization",
    title: "People & Organization",
    description:
      "Whether ownership, decision rights, knowledge distribution, and team boundaries enable autonomous execution without creating fragile dependencies.",
    interventionTheme: "Optimize for clear ownership and low coordination cost.",
    questions: [
      {
        id: "po-1",
        prompt: "How clearly are technical ownership and decision-making responsibilities defined?",
        anchors: {
          1: "Ownership is ambiguous and decisions frequently escalate.",
          3: "Teams have explicit ownership and clear decision boundaries.",
          5: "Decision authority is deliberately distributed and changes as organizational needs evolve.",
        },
        evidence: "Team charters, ownership maps, escalation history.",
        intervention:
          "Define ownership and decision rights for systems, capabilities, and cross-cutting concerns.",
      },
      {
        id: "po-2",
        prompt:
          "How effectively can teams make routine technical and product decisions without unnecessary escalation?",
        anchors: {
          1: "Decisions frequently require management, architecture, or other-team approval.",
          3: "Teams make most decisions within established boundaries.",
          5: "Teams have high autonomy paired with clear outcomes and guardrails.",
        },
        evidence: "Approval workflows, interviews, decision lead time.",
        intervention:
          "Replace routine approvals with principles, automated guardrails, and explicit escalation criteria.",
      },
      {
        id: "po-3",
        prompt: "How resilient is the organization to the absence or departure of key individuals?",
        anchors: {
          1: "Important systems depend on one or two individuals.",
          3: "Knowledge is reasonably distributed within teams.",
          5: "Critical capabilities remain operable despite significant personnel change.",
        },
        evidence: "Bus-factor analysis, on-call history, ownership distribution.",
        intervention:
          "Identify critical-person dependencies and systematically distribute knowledge and operational ownership.",
      },
      {
        id: "po-4",
        prompt:
          "How well do team structures and responsibilities align with domains, systems, and business capabilities?",
        anchors: {
          1: "Teams share responsibility for many systems and frequently hand work between groups.",
          3: "Most teams own coherent systems or domains.",
          5: "Team topology deliberately minimizes cognitive load and coordination overhead.",
        },
        evidence: "Org chart, system ownership, dependency maps, handoff analysis.",
        intervention:
          "Redesign ownership around durable capabilities or domains rather than project phases or technical layers.",
      },
      {
        id: "po-5",
        prompt:
          "How effectively can the organization change responsibilities, team structures, or skills when needs change?",
        anchors: {
          1: "Structural problems persist because changing responsibilities is difficult.",
          3: "The organization periodically reorganizes when significant problems appear.",
          5: "Team boundaries and responsibilities evolve incrementally as constraints change.",
        },
        evidence: "Organizational changes, capability gaps, dependency history.",
        intervention:
          "Review organizational boundaries using cognitive load, dependency, and flow data rather than hierarchy alone.",
      },
    ],
  },
  {
    id: "measurement-learning",
    title: "Measurement & Learning",
    description:
      "Whether engineering success is defined by outcomes, decisions are evidence-informed, and the organization can change its mind when assumptions prove wrong.",
    interventionTheme: "Strengthen the organization's ability to change its mind based on evidence.",
    questions: [
      {
        id: "ml-1",
        prompt: "How clearly does the organization define what successful engineering outcomes look like?",
        anchors: {
          1: "Success is represented mainly by output: projects completed, tickets closed, or features shipped.",
          3: "Major initiatives have measurable technical or business outcomes.",
          5: "Engineering success is consistently connected to customer, operational, or economic outcomes.",
        },
        evidence: "OKRs, initiative goals, metrics, roadmaps.",
        intervention:
          "Replace output-oriented goals with measurable outcome hypotheses where possible.",
      },
      {
        id: "ml-2",
        prompt: "How consistently are technical decisions supported by meaningful evidence?",
        anchors: {
          1: "Decisions rely primarily on opinions, hierarchy, or anecdotes.",
          3: "Important decisions incorporate relevant operational or delivery data.",
          5: "Evidence gathering and experimentation are routine parts of decision-making.",
        },
        evidence: "Dashboards, experiments, proposals, decision records.",
        intervention:
          "Require major decisions to state available evidence, uncertainty, and what would invalidate the decision.",
      },
      {
        id: "ml-3",
        prompt: "How well can engineering investments be connected to customer or business outcomes?",
        anchors: {
          1: "Engineering cost and business results are largely disconnected.",
          3: "Major programs define expected business or customer benefits.",
          5: "Investments are evaluated against realized outcomes and opportunity cost.",
        },
        evidence: "Business cases, product metrics, cost data, initiative reviews.",
        intervention: "Introduce outcome reviews for material engineering investments.",
      },
      {
        id: "ml-4",
        prompt: "How frequently are assumptions behind technical initiatives tested?",
        anchors: {
          1: "Assumptions remain implicit and are rarely revisited.",
          3: "Important initiatives identify assumptions and review them periodically.",
          5: "High-impact assumptions are deliberately tested early and cheaply.",
        },
        evidence: "Experiments, prototypes, ADRs, discovery work.",
        intervention:
          "Require major initiatives to identify their highest-risk assumptions and define how they will be tested.",
      },
      {
        id: "ml-5",
        prompt: "How effectively does evidence cause the organization to stop, change, or increase investments?",
        anchors: {
          1: "Initiatives generally continue once started.",
          3: "Significant underperformance can trigger changes or cancellation.",
          5: "Stopping, redirecting, or increasing investment based on evidence is normal behavior.",
        },
        evidence: "Stopped initiatives, reprioritization history, investment reviews.",
        intervention: "Introduce explicit continue, change, or stop decisions into initiative reviews.",
      },
    ],
  },
];

export const TOTAL_QUESTIONS = DIMENSIONS.reduce(
  (sum, d) => sum + d.questions.length,
  0
);

export const levelForScore = (score: number): Level => {
  const rounded = Math.min(5, Math.max(1, Math.round(score))) as Level["score"];
  return LEVELS.find((l) => l.score === rounded)!;
};

/** All 40 questions flattened in a fixed order — the order the answer code relies on. */
export const ALL_QUESTIONS: Question[] = DIMENSIONS.flatMap((d) => d.questions);

export type Answers = Record<string, number>;

/**
 * Answers are only ever 1, 3, or 5, so the whole assessment fits in a single
 * digit-per-question string (fixed question order) — terse enough for a URL
 * query param, e.g. ?a=1335511335...
 */
export const encodeAnswers = (answers: Answers): string =>
  ALL_QUESTIONS.map((q) => answers[q.id] ?? "").join("");

export const decodeAnswers = (code: string | null | undefined): Answers | null => {
  if (!code || code.length !== ALL_QUESTIONS.length) return null;
  const answers: Answers = {};
  for (let i = 0; i < ALL_QUESTIONS.length; i++) {
    const value = Number(code[i]);
    if (value !== 1 && value !== 3 && value !== 5) return null;
    answers[ALL_QUESTIONS[i].id] = value;
  }
  return answers;
};
