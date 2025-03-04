import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MovieList from "./MovieList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Movie API</h1>
        <MovieList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
