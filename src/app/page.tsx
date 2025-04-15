'use client';

import { Button } from "@pellegrinidev/piggy-ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen justify-center items-center flex flex-col">
        <Link href="/auth/login">
          <Button>Teste</Button>
        </Link>
    </div>
  );
}
