// import { QuizItemSchema } from "~~/utils/types";
import { acceptHMRUpdate, defineStore } from "pinia";
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
      toasts: [],
    };
  },
  actions: {
    addToast(item) {
      this.toasts.push(item);
    },
  },
});

export const modalStore = defineStore<
  string,
  {
    opened: boolean;
    type: "folder" | "material";
  }
>("modal", {
  state: () => ({
    opened: false,
    type: "folder",
  }),
  actions: {
    close() {
      this.opened = false;
    },
    open() {
      this.opened = true;
    },
    setType(type: typeof this.type) {
      this.type = type;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(modalStore, import.meta.hot))
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot))
  import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot))
}