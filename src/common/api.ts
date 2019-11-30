import axios from "axios";

const URL = "https://4upb1jruoc.execute-api.us-east-1.amazonaws.com/prod/words";

export const wordsStartingWith = (
  prefix: string,
  wordLength: number
): Promise<string[]> => {
  return axios
    .post(URL, {
      queryType: "startsWith",
      query: {
        startsWith: prefix,
        minLength: wordLength,
        maxLength: wordLength
      }
    })
    .then(response => response.data.body.result.items);
};

export const wordPrefixes = (
  wordLength: number,
  prefixLength: number
): Promise<Record<string, number>> => {
  return axios
    .post(URL, {
      queryType: "matchSubstring",
      query: {
        minLength: wordLength,
        maxLength: wordLength,
        start: 0,
        end: prefixLength
      }
    })
    .then(response => response.data.body.result.items);
};
