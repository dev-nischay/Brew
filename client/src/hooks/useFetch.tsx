import { useState } from "react";

type ResponseData = {
  message: string;
  status: boolean;
  products?: {};
  token?: string;
};

type RequestMethod = "POST" | "PUT" | "GET" | "DELETE";

type fetchProps = {
  endpoint: string;
  method?: RequestMethod;
  body?: {};
  extras: {
    requireAuth?: boolean;
    additionalHeader?: Record<string, string>;
  };
};

// pass extras for now make it optional later

// take the token from authstore

export const useFetch = ({
  endpoint,
  method = "GET",
  body,
  extras: { requireAuth = false, additionalHeader },
}: fetchProps) => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const baseUrl = `/api/v1/user/${endpoint}`;

  const myHeader = new Headers();
  myHeader.set("Content-Type", "application/json");

  let token; // remove this later

  if (requireAuth && token) {
    myHeader.set("Authorization", `Bearer ${token}`);
  }

  if (body && (method === "GET" || "DELETE")) {
    throw new Error("Body can only be sent with POST or PUT methods");
  }

  //   if (additionalHeader) myHeader.set(additionalHeader); check on this later

  const reset = () => {
    setData(null), setLoading(true), setError(null);
  };

  const request = async () => {
    try {
      const response = await fetch(`${baseUrl}`, {
        method,
        headers: myHeader,
        ...(body && { body: JSON.stringify(body) }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
      return result;
    } catch (error) {
      console.log(`Fetch error ${error} `);
      setError(error);
      return error;
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
