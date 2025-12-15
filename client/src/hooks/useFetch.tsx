import { useState } from "react";
import type { RequestMethod, ApiResponse, Extras } from "./hooks.types";
import { useAuthStore } from "../store/authStore";

export const useFetch = (
  endpoint: string,
  method: RequestMethod,
  extras?: Extras,
  body?: unknown
) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const baseUrl = `http://localhost:3000/api/v1/user`;
  const url = `${baseUrl}/${endpoint}`;

  const myHeader = new Headers();
  myHeader.set("Content-Type", "application/json");

  const token = useAuthStore((state) => state.token);

  if (extras?.requireAuth && token) {
    myHeader.set("Authorization", `Bearer ${token}`);
  }

  if (body && (method === "GET" || method === "DELETE")) {
    throw new Error("Body can only be sent with POST or PUT methods");
  }

  const reset = () => {
    setData(null), setLoading(true), setError(null);
  };

  const request = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}`, {
        method,
        headers: myHeader,
        ...(typeof body === "object" && { body: JSON.stringify(body) }),
      });

      const result: ApiResponse = await response.json();
      if (!response.ok) {
        const serverErr = (result?.error ?? result?.message) as unknown;
        const parsedErrors =
          typeof serverErr === "string"
            ? stringToArr(serverErr).map((s) => s.trim())
            : Array.isArray(serverErr)
            ? serverErr
            : [String(serverErr)];

        setError(parsedErrors);
        throw new Error(parsedErrors.join(", ") || "Request failed");
      }

      if (result.message) setData(result);
      return result;
    } catch (error) {
      const e = error instanceof Error ? error : new Error(String(error));
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
    reset,
  };
};

const stringToArr = (a: string) => {
  return a.split(",");
};
