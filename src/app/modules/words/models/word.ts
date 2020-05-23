export type Word = Readonly<{
    id: string;
    date: Date;
    dateLearned?: Date;
    englishWord: string;
    russianWord: string;
    synonyms: string[];
    countOfSuccess: number;
}>;
