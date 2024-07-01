import prisma from "@/prisma/prisma";

export const createTodo = async (
  name: string,
  userId: string,
  dueDate: Date,
  isDone: boolean = false
) => {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        name,
        userId,
        dueDate,
        isDone,
      },
    });
    return newTodo;
  } catch (error: any) {
    throw new Error(`Failed to create todo: ${error.message}`);
  }
};

export const getTodoById = async (id: string) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    return todo;
  } catch (error: any) {
    throw new Error(`Failed to get todo: ${error.message}`);
  }
};

export const getTodosByUserId = async (userId: string) => {
  try {
    const todos = await prisma.todo.findMany({
      where: { userId },
    });
    return todos;
  } catch (error: any) {
    throw new Error(`Failed to get todos: ${error.message}`);
  }
};

export const updateTodo = async (
  id: string,
  data: { name?: string; dueDate?: Date; isDone?: boolean }
) => {
  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data,
    });
    return updatedTodo;
  } catch (error: any) {
    throw new Error(`Failed to update todo: ${error.message}`);
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await prisma.todo.delete({
      where: { id },
    });

    return { message: "Todo deleted successfully" };
  } catch (error: any) {
    throw new Error(`Failed to delete todo: ${error.message}`);
  }
};
