"use client";

import { useUser } from "@clerk/nextjs";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { askQuestion } from "@/actions/askQuestion";

export type Message = {
  id?: string;
  role: "human" | "ai" | "placeholder";
  message: string;
  createdAt: Date;
};

function Chat({ id }: { id: string }) {
  const { user } = useUser();

  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [messages, setMessages] = useState<Message[]>([]);

  const [snapshot, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user?.id, "files", id, "chat"),
        orderBy("createdAt", "asc")
      )
  );

  useEffect(() => {
    if (!snapshot) return;
    console.log("updated snapshot", snapshot.docs);

    // get second last message to check if the AI is thinking
    // const lastMessage = messages.pop()
    const lastMessage = messages.pop()

    if(lastMessage?.role === "ai" && lastMessage.message === "Thinking..."){
      // return as this is a dummy placeholder message
      return
    }

    const newMessages = snapshot.docs.map(doc => {
      const {role, message, createdAt} = doc.data()

      return{
        id: doc.id,
        role,
        message, 
        createdAt: createdAt.toDate(),
      }

    })
    setMessages(newMessages)

    // Ignore messages dependency warning here... we dont want an infinite loop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapshot]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const q = input;
    setInput("");

    // Optimistic UI Update
    setMessages((prev) => [
      ...prev,
      {
        role: "human",
        message: q,
        createdAt: new Date(),
      },
      {
        role: "ai",
        message: "Thinking...",
        createdAt: new Date(),
      },
    ]);

    startTransition(async () => {
      const { success, message } = await askQuestion(id, q);

      if (!success) {
        // toast...

        setMessages((prev) =>
          prev.slice(0, prev.length - 1).concat([
            {
              role: "ai",
              message: `Whoops... ${message}`,
              createdAt: new Date(),
            },
          ])
        );
      }
    });
  };

  return (
    <div className="flex flex-col h-full overflow-scroll">
      {/* Chat Contents */}

      <div className="flex-1 w-full">{/* chat messages... */}
      
      {messages.map(message => (
        <div key={message.id}>
          <p>{message.message}</p>
        </div>
      ))}
      
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 space-x-2 p-5 bg-indigo-600/75"
      >
        <Input
          placeholder="Ask a Question... "
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" disabled={!input || isPending}>
          {isPending ? (
            <Loader2Icon className="animate-spin text-indigo-600" />
          ) : (
            "Ask"
          )}
        </Button>
      </form>
    </div>
  );
}

export default Chat;
