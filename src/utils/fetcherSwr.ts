import useSWR from "swr";
import { BASE_API_URL } from "./constants";

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
