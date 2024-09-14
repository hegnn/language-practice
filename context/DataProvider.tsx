import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type WordCard = {
  word: string;
  meaning: string;
  sentence?: string;
  artikel: string;
};

const DataContext = createContext<{
  saveNewWord: (word: WordCard) => void;
  removeWord: (word: WordCard) => void;
  words: WordCard[];
}>({
  saveNewWord: () => null,
  removeWord: () => null,
  words: [],
});

export function useData() {
  const value = useContext(DataContext);

  return value;
}

export function DataProvider({ children }: PropsWithChildren) {
  const [words, setWords] = useState<WordCard[]>([
    {
      word: 'Test',
      meaning: 'test def',
      sentence:
        'kajsdh kahskdj haskj hakjsd hakjsdh kjahs kdjahds kjahs kjahs kdjashjk',
      artikel: 'der',
    },
    {
      word: 'Test2',
      meaning: 'test def2',
      sentence: 'maybe2',
      artikel: 'der2',
    },
  ]);

  const saveNewWord = (newWord: WordCard) => {
    setWords([...words, newWord]);
  };

  const removeWord = (newWord: WordCard) => {
    //TODO
  };

  return (
    <DataContext.Provider value={{ saveNewWord, removeWord, words }}>
      {children}
    </DataContext.Provider>
  );
}
