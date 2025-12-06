"use client";

export default function DashboardError({ error, reset } : {error:any, reset:any}) {
  return (
    <div>
      <h1>Dashboard Error</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}