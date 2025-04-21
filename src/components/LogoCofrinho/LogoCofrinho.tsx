import { Heading } from "@pellegrinidev/piggy-ui";
import Link from "next/link";

const LogoCofrinho = () => (
  <Link href="/" className="flex items-center gap-2 select-none">
    <img src="/images/mascote/Logo.png" alt="Cofrinho Logo" className="w-10 h-10" />
    <Heading size="xl" className="text-brand-500">
      Cofrinho
    </Heading>
  </Link>
);

export default LogoCofrinho;