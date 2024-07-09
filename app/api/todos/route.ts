import prisma from "@/prisma/prisma";
import { createTodo, deleteTodo, updateTodo } from "./actions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const todos = await prisma.todo.findMany({});
    return NextResponse.json({ todos });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
   
    const { name, userId, dueDate, isDone } = data;

    const newTodo = await createTodo(name, userId, new Date(dueDate), isDone);
    return NextResponse.json(newTodo);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};


export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  try {
    await deleteTodo(id);
    return NextResponse.json({ message: `Todo ${id} deleted successfully` });
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (req: NextRequest) => {
  const data = await req.json();

  try {
    await updateTodo(data.id, data);
    return NextResponse.json({
      message: `Todo ${data.id} updated successfully`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update todo" },
      { status: 500 }
    );
  }
};
