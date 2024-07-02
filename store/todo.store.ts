import { create } from "zustand";

type TodoStore = {
  data: Task;
  setData: (task: Task) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  data: <Task>{},
  setData: (data: Task) => {
    set({ data });
  },
}));

type TodoDateStore = {
  date: Date | undefined;
  setDate: (date: Date) => void;
};

export const useTodoDateStore = create<TodoDateStore>((set) => ({
  date: new Date(),
  setDate: (date) => set({ date }),
}));
