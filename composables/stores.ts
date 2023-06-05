// import { QuizItemSchema } from "~~/utils/types";
import { defineStore } from "pinia";
import { Quiz, QuizItem, ToastData } from "~~/utils/types";

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

export const useToastStore = defineStore<
  string,
  { toasts: ToastData[] },
  {},
  {
    addToast: (item: ToastData) => void;
  }
>("toasts", {
  state() {
    return {
      toasts: [
        {
          success: true,
          message: "You successfadfuasdg;asdlg asd",
          type: "error",
        },
        {
          success: true,
          message: "You successfadfuasdg;asdlg asd",
          type: "error",
        },
        {
          success: true,
          message: "You successfadfuasdg;asdlg asd",
          type: "error",
        },

        {
          success: true,
          message:
            "You successfadfuasdg;asdlg asdfasdfasdg asga sdg asdg asdg asd gasd g asdg asdg asdg asd gasd g asd gasd gasd g asdg asd gs dg asdg a sdg asd ga sd",
          type: "error",
        },
      ],
    };
  },
  actions: {
    addToast(item) {
      this.toasts.push(item);
    },
  },
});
