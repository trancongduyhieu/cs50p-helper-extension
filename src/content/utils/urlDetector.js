
export function detectProblem() {
  const url = window.location.href;
  
  // Updated pattern for URLs like: .../python/psets/0/indoor/ (without the year)
  const psetPattern = /cs50\.harvard\.edu\/python\/psets\/(\d+)\/([a-zA-Z0-9_]+)\/?$/;
  
  // Updated pattern for URLs like: .../python/problems/0/indoor/ (without the year)
  const problemPattern = /cs50\.harvard\.edu\/python\/problems\/(\d+)\/([a-zA-Z0-9_]+)\/?$/;
  
  let match = url.match(psetPattern) || url.match(problemPattern);
  
  if (match && match[1] && match[2]) {
    const week = parseInt(match[1], 10);
    const problemId = match[2].toLowerCase().replace(/_/g, ''); // Normalize id
    return { week, problemId };
  }
  
  return null;
}
