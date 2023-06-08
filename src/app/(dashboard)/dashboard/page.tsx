import Button from "@/components/ui/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface Props {}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      dashboard page
      <Button variant={"ghost"}>{JSON.stringify(session)}</Button>
    </div>
  );
}
