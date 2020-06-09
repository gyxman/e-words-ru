import {ExerciseTypeEnum} from '../enums/exercise-type.enum';

export type ExerciseAnswer = Readonly<{
    type: ExerciseTypeEnum;
    answer: string;
}>;
