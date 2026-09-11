# 17 Votes: The Record

Replace the current three-way "Where we agree. Where we don't." chart with one clean, hard-hitting comparison built on the 17 bills where Keith and the Republican caucus stood with District 51 and Rep. Esther Panitch voted no.

## What changes on the page

- Section heading becomes **"17 votes. She said no to every one."** Lead line: Keith supports each of these laws. Esther Panitch voted against all seventeen. The votes are on the record.
- The "Where all three agree" group is removed. No agreement rows, no score, no tally, no hedging.
- Three columns stay, relabeled and simplified: **Georgia Republicans** / **Keith Gettmann** (highlighted) / **Rep. Panitch**. Marks: filled navy check for yes, open muted-red X for no. Her column is a full run of red X marks — that column is the argument.
- Every row is one bill, in plain language a voter reads in one breath: the voter problem, the bill, the recorded vote and date, with "Panitch voted NO" in the visible row text.
- Clicking a row opens a short explanation (2-3 sentences) plus, where one exists, one link labeled with its source (e.g. Georgia General Assembly vote record). The generic "Read more" links are removed everywhere per Keith's note.
- Sourcing note at the bottom stays: positions come from House and Senate vote records.

## The 17 rows (in this order)

Affordability and taxes
1. HB 463 - income tax down from 5.19% to 4.99%, path to 3.99%
2. SB 33 - HOME Act, mandatory statewide homestead assessment cap from 2027, plus local relief option
3. HB 808 - personal property exemption raised from $7,500 to $20,000 (House 125-42)

Public safety and rule of law
4. HB 500 - arson of a law enforcement vehicle made a standalone felony (House 100-69)
5. HB 295 - lets property owners sue when a local government won't enforce camping, loitering, panhandling laws
6. SB 37 - sheriff candidates must be POST-certified peace officers
7. HB 1105 - Criminal Alien Track and Report Act
8. SB 185 - no state funds for inmate sex reassignment surgery, hormones, cosmetic procedures

Schools, parents, kids
9. SB 233 - Georgia Promise Scholarship, up to $6,500 per year
10. SB 351 - Protecting Georgia's Children on Social Media Act
11. SB 1 - Riley Gaines Act, girls' and women's school sports

Constitutional rights
12. SB 36 - Georgia Religious Freedom Restoration Act
13. HB 1018 - Firearms Industry Nondiscrimination Act
14. HR 780 - citizen-only voting constitutional amendment
15. HB 974 - public posting of scanned ballot images

Jobs and land
16. SB 195 - Freedom to Work Act / Social Work Licensure Compact
17. SB 420 - bars foreign adversary agents from buying farmland and land near military bases

Rows are grouped under four short subheads so 17 items don't read as a wall. Groups can be reordered or trimmed later without touching layout.

## Tone

Every row follows John's framing: the voter problem first, then the bill, then the vote. No adjectives about the incumbent beyond the recorded vote itself. Nothing about her motives.

## Mobile

Below 768px each row becomes a card with three labeled lines (Georgia Republicans / Keith Gettmann / Rep. Panitch) and the same tap-to-expand explanation. No sideways scrolling.

## Technical notes

- `src/data/positionComparison.ts`: drop the `agree`/`differ` grouping and the five agreement rows; new shape carries `id`, `issue`, `summary`, `voteRecord`, `group` (one of the four category keys), `sourceLabel`, `sourceHref?`, and the three positions.
- `src/components/PositionComparison.tsx`: remove the agree group render and the `Read more` link; render four category groups; keep the accessible expand button, aria-labelled marks, and the highlighted Keith column.
- No changes to issues cards, hero, donations, or navigation in this pass.

## One flag

Two rows need a decision before I can add a link: for HB 500 and HB 295 the strongest supporting material is news coverage, not a vote sheet. If you want those, send the specific articles you trust - I won't pick outlets for you or invent URLs. Everything else cites the General Assembly record.
