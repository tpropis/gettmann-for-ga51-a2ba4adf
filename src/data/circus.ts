export interface CircusIssue {
  issue: string;
  record: string;
  source: string;
  fix: string;
}

// Publish factual copy only after the campaign supplies a verifiable source.
export const circusIssues: CircusIssue[] = [
  { issue: "Property taxes", record: "", source: "", fix: "Defend the assessment cap and help seniors stay in the homes they already paid for." },
  { issue: "Public safety", record: "", source: "", fix: "Fight to retain first responders with competitive pay and publish 911 response times by ZIP code." },
  { issue: "School budgets", record: "", source: "", fix: "Put every school budget on one page, in plain language, and publish the curriculum online." },
];

export const circusVoteMessage = "Vote Keith Gettmann — Tuesday, Nov 3";
export const circusVoterUrl = "https://mvp.sos.ga.gov/";

export function nextCircusCount(count: number): number {
  return Math.min(count + 1, circusIssues.length);
}

export function hasSourcedRecord(issue: CircusIssue): boolean {
  try {
    return Boolean(issue.record.trim()) && new URL(issue.source).protocol === "https:";
  } catch {
    return false;
  }
}