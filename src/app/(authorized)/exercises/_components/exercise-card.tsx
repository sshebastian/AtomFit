import { YoutubeEmbed } from "@/components/shared/youtube-embed";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Exercise } from "@/types/exercise";
import { LikeBtn } from "./like-btn";
import Image from "next/image";

type Props = {
  exercise: Exercise;
};

export function ExerciseCard({ exercise }: Props) {
  const video_id = exercise.tutorial_link.slice(32);
  const thumbnailUrl = `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`;
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="group relative w-[260px] cursor-pointer overflow-hidden border-2 bg-popover transition-all hover:brightness-125">
            <CardHeader className="p-4 pb-1">
              <Image
                src={thumbnailUrl}
                alt={exercise.name}
                width={300}
                height={300}
                className="h-auto max-w-full rounded-lg"
              />
              {/* <div className="mx-auto aspect-square w-full max-w-[250px] rounded-xl bg-secondary"></div> */}

              <h2 className="overflow-hidden font-mono uppercase">
                {exercise.name}
              </h2>
              <div className="flex flex-wrap gap-1">
                {exercise.muscles.map((muscle, index) => (
                  <Badge key={index} className="uppercase">
                    {muscle}
                  </Badge>
                ))}
              </div>
              <CardDescription className="font-semibold">
                {exercise.description}
              </CardDescription>
            </CardHeader>
            <div className="flex justify-end">
              <LikeBtn exercise_id={exercise.id} />
            </div>
          </Card>
        </DialogTrigger>
        <DialogContent className="md:min-w-[700px]">
          <DialogHeader>
            <DialogTitle className="text-3xl">{exercise.name}</DialogTitle>
          </DialogHeader>
          <section className="mt-2">
            <YoutubeEmbed embedId={video_id} />
            <h2>Focus Area</h2>
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {exercise.muscles.map((muscle, index) => (
                <Badge key={index} className="text-lg uppercase">
                  {muscle}
                </Badge>
              ))}
            </div>
            <p>{exercise.description}</p>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
