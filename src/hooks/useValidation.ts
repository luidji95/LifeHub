import { useState } from "react";
import { ZodSchema, ZodError } from "zod";

export function useValidation<T>(schema: ZodSchema<T>) {
  const [errors, setErrors] = useState<string | null>(null);

  const validate = (data: T) => {
    try {
      schema.parse(data);
      setErrors(null);
      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        setErrors(err.errors[0].message);
      }
      return false;
    }
  };

  return { validate, errors };
}
