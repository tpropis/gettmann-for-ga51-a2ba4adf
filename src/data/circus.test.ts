import { describe, expect, it } from "vitest";
import { circusIssues, circusVoteMessage, circusVoterUrl, hasSourcedRecord, nextCircusCount } from "./circus";

describe("circus reveal rules", () => {
  it("reveals one of the three issues per click and stops after the third", () => {
    expect([0, 1, 2, 3].map(nextCircusCount)).toEqual([1, 2, 3, 3]);
    expect(circusIssues.map(({ issue }) => issue)).toEqual([
      "Property tax millage", "Fulton County jail crisis", "School budget",
    ]);
  });
  it("keeps campaign-supplied record, source, and fix content blank", () => {
    expect(circusIssues.every(({ record, source, fix }) => record === "" && source === "" && fix === "")).toBe(true);
  });
  it("does not present a record without a valid secure source", () => {
    expect(hasSourcedRecord({ issue: "Test", record: "A claim", source: "", fix: "" })).toBe(false);
    expect(hasSourcedRecord({ issue: "Test", record: "A claim", source: "javascript:alert(1)", fix: "" })).toBe(false);
    expect(hasSourcedRecord({ issue: "Test", record: "A claim", source: "https://www.legis.ga.gov/", fix: "" })).toBe(true);
  });
  it("uses the official Georgia voter lookup", () => {
    expect(circusVoterUrl).toBe("https://mvp.sos.ga.gov/");
  });
});