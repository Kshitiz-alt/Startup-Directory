"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/utilsAndValidations";
import { z } from "zod";
import * as Toast from '@radix-ui/react-toast'
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: "", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();


  const handleFormSubmit = async (prevState: object, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        // pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData);

      if (result.status == "SUCCESS") {
        setToastMessage({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });
        setToastOpen(true)

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;
        setErrors(fieldErorrs as unknown as Record<string, string>);
        setToastMessage({
          title: "Error",
          description: "Please check your inputs and try again.",
        });
      } else {
        setToastMessage({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
        });
      }
      setToastOpen(true);

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
        data: null,
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <>
      <Toast.Provider>
        <form action={formAction} className="p-10 w-[60%] justify-self-center">
          {/* {state} */}
          <div className="text-2xl p-10">
            <label htmlFor="title" className="">
              Title
            </label>
            <Input
              id="title"
              name="title"
              className="startup-form_input"
              required
              placeholder="Startup Title"
            />

            {errors.title && <p className="startup-form_error">{errors.title}</p>}
          </div>

          <div className="text-2xl p-10">
            <label htmlFor="description" className="startup-form_label">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              className="startup-form_textarea"
              required
              placeholder="Startup Description"
            />

            {errors.description && (
              <p className="startup-form_error">{errors.description}</p>
            )}
          </div>

          <div className="text-2xl p-10">
            <label htmlFor="category" className="startup-form_label">
              Category
            </label>
            <Input
              id="category"
              name="category"
              className="startup-form_input"
              required
              placeholder="Startup Category (Tech, Health, Education...)"
            />

            {errors.category && (
              <p className="startup-form_error">{errors.category}</p>
            )}
          </div>

          <div className="text-2xl p-10">
            <label htmlFor="link" className="startup-form_label">
              Image URL
            </label>
            <Input
              id="link"
              name="link"
              className="startup-form_input"
              required
              placeholder="Startup Image URL"
            />

            {errors.link && <p className="startup-form_error">{errors.link}</p>}
          </div>

          

          <Button
            type="submit"
            className="w-[80%] ml-[7em] bg-[rgba(255,116,116,0.7)] p-10 cursor-pointer"
            disabled={isPending}
          >
            {isPending
              ? "Submitting..."
              : state.status === "SUCCESS"
                ? "Submitted!"
                : "Submit Your Pitch"}
            <Send className="size-6 ml-2" />
          </Button>
        </form>
        {state.status === "SUCCESS" && (
          <p className="text-green-500 text-center mt-4">
            Form submitted successfully!
          </p>
        )}
        {state.status === "ERROR" && (
          <p className="text-red-500 text-center mt-4">
            Error: {state.error || "Submission failed."}
          </p>
        )}
        <Toast.Root
          open={toastOpen}
          onOpenChange={setToastOpen}
          className="bg-gray-900 text-white rounded shadow-lg p-4 w-[320px]"
        >
          <Toast.Title className="font-bold">{toastMessage.title}</Toast.Title>
          <Toast.Description className="mt-1">{toastMessage.description}</Toast.Description>
          <Toast.Close asChild>
            <button className="text-blue-400 text-sm mt-2">Close</button>
          </Toast.Close>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 z-50" />
      </Toast.Provider >
    </>
  );
};

export default StartupForm;
