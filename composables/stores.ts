import { QuizItemSchema } from "~~/utils/types";

export const useQuizItems = () =>
  useState<QuizItemSchema[]>("quizItems", () => [
    {
      question: "What is 10 x 10?",
      type: "multiple choice",
      correctAnswer: "511638de-1ac6-40ba-ac5e-b5ed5ec1e679",
      options: new Map([
        ["511638de-1ac6-40ba-ac5e-b5ed5ec1e679", "100"],
        ["73adaf1b-aa76-49ec-87ad-8dc23371475c", "10"],
        ["6c63ad3f-1177-408e-a5a7-d71e796814ac =>", "11"],
      ]),
      items: 1,
    },
    {
      question: "What is 10 x 10?",
      type: "multiple choice",
      correctAnswer: "511638de-1ac6-40ba-ac5e-b5ed5ec1e679",
      options: new Map([
        ["511638de-1ac6-40ba-ac5e-b5ed5ec1e679", "100"],
        ["73adaf1b-aa76-49ec-87ad-8dc23371475c", "10"],
        ["6c63ad3f-1177-408e-a5a7-d71e796814ac =>", "11"],
      ]),
      items: 1,
    },
    {
      question: "What is 10 x 10?",
      type: "multiple choice",
      correctAnswer: "511638de-1ac6-40ba-ac5e-b5ed5ec1e679",
      options: new Map([
        ["511638de-1ac6-40ba-ac5e-b5ed5ec1e679", "100"],
        ["73adaf1b-aa76-49ec-87ad-8dc23371475c", "10"],
        ["6c63ad3f-1177-408e-a5a7-d71e796814ac =>", "11"],
      ]),
      items: 1,
    },
    {
      question: "What is 10 x 10?",
      type: "multiple choice",
      correctAnswer: "511638de-1ac6-40ba-ac5e-b5ed5ec1e679",
      options: new Map([
        ["511638de-1ac6-40ba-ac5e-b5ed5ec1e679", "100"],
        ["73adaf1b-aa76-49ec-87ad-8dc23371475c", "10"],
        ["6c63ad3f-1177-408e-a5a7-d71e796814ac =>", "11"],
      ]),
      items: 1,
    },
    {
      question: "What is 10 x 10?",
      type: "multiple choice",
      correctAnswer: "511638de-1ac6-40ba-ac5e-b5ed5ec1e679",
      options: new Map([
        ["511638de-1ac6-40ba-ac5e-b5ed5ec1e679", "100"],
        ["73adaf1b-aa76-49ec-87ad-8dc23371475c", "10"],
        ["6c63ad3f-1177-408e-a5a7-d71e796814ac =>", "11"],
      ]),
      items: 1,
    },
  ]);
