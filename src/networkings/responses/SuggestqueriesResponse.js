const regex = /google\.sbox\.p50\s*&&\s*google\.sbox\.p50\((\[.+\])\)/;

export const parseSuggestQueries = data => {
  const match = data.match(regex);
  if (!match) {
    return [];
  }

  const jsonData = JSON.parse(match[1]);
  const keywords = jsonData[1].map(item => item[0]);
  return keywords;
};
