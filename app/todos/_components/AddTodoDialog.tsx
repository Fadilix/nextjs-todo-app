"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TododDatePicker } from "./TodoDatePicker"
import { useState } from "react"
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { DialogClose } from "@radix-ui/react-dialog";

// type dialogProps = {
//   handleNameChange: React.ChangeEventHandler<HTMLInputElement>,
//   task: task
//   date: Date,
//   setDate: SelectSingleEventHandler
// }


export function DialogDemo() {
  const [name, setName] = useState("");
  // const [date, setDate] = useState<Date>(new Date());
  console.log(name);
  const handleNameChange : any = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(name);
  }

  const { data: session } = useSession();

  const handleTodoSave = () => {
    try {
      if (!name || !localStorage.getItem("date")) {
        toast.error("Please fill all the fields");
        return;
      } else {
        const date = JSON.parse(localStorage.getItem("date")!);
        console.log(date);
        console.log(name);

        fetch("/api/todos", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            dueDate: date,
            isDone: false,
            userId: session?.user?.id
          }),
        })
        // return;
      }
    } catch (error) {
      toast.error("Something happened");
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a todo</DialogTitle>
        </DialogHeader> 
        <div className="grid gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" className="">
              Due date
            </Label>
            <TododDatePicker
            // date={date} setDate={setDate}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleTodoSave}>Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
