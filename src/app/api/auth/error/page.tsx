import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
  return (
    <div>
      Please use authorized account
      <Button>
        <Link href="/api/auth/signin">Sign In</Link>
      </Button>
    </div>
  );
};

export default Error;
