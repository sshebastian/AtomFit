import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export function WorkoutCard() {
  return (
    <>
      <Link href={"#"}>
        <Card className="border-2 bg-popover transition-all hover:scale-105">
          <CardHeader className="p-4">
            <div className="mx-auto aspect-square w-full max-w-[250px] rounded-xl bg-secondary"></div>

            <h2 className="font-mono uppercase">Title</h2>
            <CardDescription className="font-semibold">
              20 min | 15 exercises
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
}
