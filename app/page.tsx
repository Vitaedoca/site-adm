'use client'
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {

  const [click, setClick] = useState(0)

  function clicando() {

    setClick( prevClick => prevClick + 1)

  }

  useEffect(() => {
    console.log(click);
  }, [click]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={clicando}>Clik aqui</Button>
    </main>
  );
}
