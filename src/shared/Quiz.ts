import Question from './Question'
import Answer from './Answer'

export default interface Quiz {
    id: string;
    userId: string;
    dateTime: string;
    duration: number;
    name: string;
    questions: [Question];
    answers: [Answer]
}
