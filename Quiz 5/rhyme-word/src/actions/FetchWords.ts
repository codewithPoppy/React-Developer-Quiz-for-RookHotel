import axios from "axios";

export type IWord = {
  word: string;
  score: number;
  numSyllables: number;
};

export const fetchWords = async (word: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_DATAMUSE_API_ENDPOINT}/words?rel_rhy=${word}`
  );
  const words: IWord[] = res.data;
  return words;
};
