export interface CircusIssue {
  issue: string;
  record: string;
  source: string;
  fix: string;
}

// Publish factual copy only after the campaign supplies a verifiable source.
export const circusIssues: CircusIssue[] = [
  { issue: "Property tax millage", record: "", source: "", fix: "" },
  { issue: "Fulton County jail crisis", record: "", source: "", fix: "" },
  { issue: "School budget", record: "", source: "", fix: "" },
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