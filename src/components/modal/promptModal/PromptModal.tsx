"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useGlobalContext } from "@/services/context/GlobalContext";
import { useModalContext } from "@/services/context/ModalContext";
import Prompt from "@/interfaces/prompt.interface";

interface Props {
  prompt: Prompt;
}

export default function PromptModal({ prompt }: Props) {
  const { prompts, setPrompts } = useGlobalContext();
  const { setIsPromptModalOpen } = useModalContext();

  const [updatedPrompt, setUpdatedPrompt] = useState<Prompt>(prompt);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedPrompt({ ...updatedPrompt, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdatedPrompt({
      ...prompt,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    // try {
    //   const prompt: Prompt = updatedPrompt;
    //   const id: string = prompt.promptId;
    //   const endpoint = `/api/folder/${id}`;
    //   const options = {
    //     method: "PUT",
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ prompt }),
    //   };
    //   const response = await fetch(endpoint, options);
    //   const data = await response.json();
    //   // dummy data
    //   const updPrompt = {
    //     ...prompt,
    //     [e.currentTarget.name]: e.currentTarget.value,
    //   };
    //   setPrompts(
    //     prompts.map((prompt: Prompt) => {
    //       if (prompt.promptId === id) {
    //         prompt = updatedPrompt;
    //         return prompt;
    //       }
    //       return prompt;
    //     })
    //   );
    // } catch (error) {
    //   console.log("ERROR", error);
    // }
    let updatedPrompts = [...prompts];
    updatedPrompts = updatedPrompts.map((prompt: Prompt) => {
      if (prompt.promptId === updatedPrompt.promptId) return updatedPrompt;
      return prompt;
    });
    setIsPromptModalOpen(false);
  };

  return (
    <form onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}>
      <label className="text-sm font-bold text-neutral-200">Title</label>
      <input
        className="my-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow text-neutral-100 focus:outline-none"
        placeholder="A name for your prompt."
        id="title"
        name="title"
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
        value={updatedPrompt.title}
      />

      <label className="mt-6 text-sm font-bold text-neutral-200">
        Description
      </label>
      <textarea
        className="my-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow text-neutral-100 focus:outline-none"
        placeholder="A description for your prompt."
        id="description"
        name="description"
        rows={3}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(event)
        }
        value={updatedPrompt.description}
      />

      <label className="mt-6 text-sm font-bold text-neutral-200">Prompt</label>
      <textarea
        className="my-2 w-full border border-neutral-800 rounded-lg bg-[#40414F] px-4 py-2 shadow text-neutral-100 focus:outline-none"
        placeholder="Prompt content. Use {{}} to denote a variable. Ex: {{name}} is a {{adjective}} {{noun}}"
        rows={10}
        id="prompt"
        name="prompt"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleChange(event)
        }
        value={updatedPrompt.prompt}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 mt-6 border rounded-lg shadow border-neutral-500 text-neutral-900 hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
      >
        Save
      </button>
    </form>
  );
}
