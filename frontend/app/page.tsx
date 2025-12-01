"use client";
import { fetchData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: fetchData,
  });
  const test = 123;
  return (
    <>
      <h1>Hello World</h1>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>{data ? <div>{data}</div> : <div>no data</div>}</div>
      )}
    </>
  );
}
