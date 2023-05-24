// import { QuizItemSchema } from "~~/utils/types";
import { defineStore } from "pinia";
import { Quiz, QuizItem } from "~~/utils/types";

export const useQuizStore = defineStore<string, Quiz>("quizItems", {
  state() {
    return {
      instructions: "",
      deadline: "",
      items: [],
      published: false,
      materialId: "",
      name: "",
    };
  },
  actions: {
    addItem(item: QuizItem) {
      this.items.push(item);
    },
    updateItem(id: string, key: string, item: QuizItem) {},
    removeItem(id: string) {
      this.items = this.items.filter((item) => item.itemId == id);
    },
    updateinstructions(newInstruction: string) {
      this.instructions = newInstruction;
    },
  },
});
