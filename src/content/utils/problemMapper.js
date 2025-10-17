import docsData from '../../data/documentation.json';

// Dynamically import all hint files.
// In a real build setup (like Vite), this would be handled correctly.
// For this single-file generation, we'll import them statically.
import week0Hints from '../../data/hints/week0.json';
import week1Hints from '../../data/hints/week1.json';
import week2Hints from '../../data/hints/week2.json';
import week3Hints from '../../data/hints/week3.json';
import week4Hints from '../../data/hints/week4.json';
import week5Hints from '../../data/hints/week5.json';
import week6Hints from '../../data/hints/week6.json';
import week7Hints from '../../data/hints/week7.json';
import week8Hints from '../../data/hints/week8.json';
import week9Hints from '../../data/hints/week9.json';


const allHints = [
  week0Hints,
  week1Hints,
  week2Hints,
  week3Hints,
  week4Hints,
  week5Hints,
  week6Hints,
  week7Hints,
  week8Hints,
  week9Hints
];

export function getProblemData(week, problemId) {
  const problemData = {
    hint: null,
    doc: null,
  };

  // Find hints
  const weekHintData = allHints.find(h => h.week === week);
  if (weekHintData) {
    // A special case for week 9 project page which might not have a specific problemId in URL
    const idToFind = (week === 9 && !weekHintData.problems.find(p => p.id === problemId)) ? 'project' : problemId;
    const hint = weekHintData.problems.find(p => p.id === idToFind);
    if (hint) {
      problemData.hint = hint;
    }
  }

  // Find documentation
  const weekKey = `week${week}`;
  const idToFindForDoc = (week === 9 && !docsData[weekKey][problemId]) ? 'project' : problemId;
  if (docsData[weekKey] && docsData[weekKey][idToFindForDoc]) {
    problemData.doc = docsData[weekKey][idToFindForDoc];
  }

  return problemData;
}