<template>
    <h2>Estadisticas</h2>
    <ul v-if="success">
        <li v-for="question in quiz.questions" :key="question.id">
            {{ question.question }}
            <div v-if="question.type_answer != 'free'">
                <span
                    style="display:block;color:#00dc82"
                    v-for="answer in filterAnswers(question.id)"
                    :key="answer.id"
                >{{ answer.answer }} ==> {{ statistics[answer.id] }}</span>
            </div>
            <div v-else>
                <span
                    style="display:block;color:#00dc82"
                    v-for="(answer, index) in getResponsesByQuestionId(question.id)"
                    :key="index"
                >{{ answer.response }}</span>
            </div>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

interface Question {
    id: string;
    question: string;
    required: boolean;
    type_answer: string;
}
interface Answer {
    id: string;
    answer: string;
    questionId: string;
    isCorrect: boolean;
}

interface Quiz {
    id: string;
    user_id: string;
    date_time: string;
    duration: number;
    name: string;
    questions: [Question];
    answers: [Answer]
}

export default defineComponent({
    setup() {
        const store = useStore();
        const route = useRoute();
        const statistics = ref<any>([]);
        const success = ref(false);
        const quiz: any = ref<Quiz | {}>({});
        const responses = ref([]);
        const filterAnswers = (question_id: string) => {
            return quiz.value.answers.filter(
                (el: any) => el.questionId == question_id
            );
        };
        const getResponsesByQuestionId = (question_id: string) => {
            return responses.value.filter(
                (el: any) => el.question_id == question_id
            ) as any;
        };
        onMounted(async () => {
            let data = await store.dispatch("fetchStatistics", {
                quiz_id: route.params.quiz_id,
            });
            statistics.value = data.data.responses;
            success.value = data.success;
            let results: any = data.data.responses;
            quiz.value = data.data.quiz;
            results = results.map((res: any) => res.answers).flat();
            responses.value = results;

            let n: any = {};
            quiz.value.questions.forEach((question: Question) => {
                if (question.type_answer == "single") {
                    filterAnswers(question.id).forEach((answer: any) => {
                        let cant = getResponsesByQuestionId(question.id).filter(
                            (response: any) => response.response == answer.id
                        ).length;
                        console.log(answer.answer, "=>", cant);
                        n[answer.id] = cant;
                    });
                }
                if (question.type_answer == "multiple") {
                    filterAnswers(question.id).forEach((answer: any) => {
                        let cant = getResponsesByQuestionId(question.id)
                            .map((el: any) => el.response)
                            .flat()
                            .filter((response: any) => response == answer.id).length;
                        console.log(answer.answer, "=>", cant);
                        n[answer.id] = cant;
                    });
                }
            });

            statistics.value = n;
        });

        return {
            statistics,
            success,
            quiz,
            filterAnswers,
            responses,
            getResponsesByQuestionId,
        };
    },
});
</script>
