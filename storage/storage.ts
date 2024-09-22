import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const wordTypes = {
  VERB: 'VERB',
  WORD: 'WORD',
  QUESTION: 'QUESTION',
};

export type WORD_TYPE = keyof typeof wordTypes;

export type WordCard = {
  id: number;
  word: string;
  meaning: string;
  sentence?: string;
  artikel: string;
  type: WORD_TYPE;
};

interface WordState {
  words: WordCard[];
  addWord: (word: WordCard) => void;
  getRandomWords: (number: number) => WordCard[];
}

export const useWordStore = create<WordState>()(
  persist(
    (set, get) => ({
      words: [],
      addWord: (word) =>
        set((state) => ({
          words: [...state.words, { ...word, id: state.words.length + 1 }],
        })),
      getRandomWords: (number) =>
        get()
          .words.sort(() => Math.random() - 0.5)
          .slice(0, number),
    }),
    {
      name: 'word-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
