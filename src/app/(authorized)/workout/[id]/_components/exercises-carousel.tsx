"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCountdown } from "@/hooks/useCountdown";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Props = {
  exercises: {
    id: number;
    name: string;
    description: string;
    video_url: string;
    type: string;
    muscles: string[];
    time: number;
  }[];
};

export function ExercisesCarousel({ exercises }: Props) {
  const { secondsLeft, start } = useCountdown();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="size-full">
        <CarouselContent>
          {exercises.map((exercise, index) => (
            <CarouselItem key={index}>
              <div className="mx-auto aspect-video w-full rounded-xl border-2 bg-popover"></div>
              <section>
                <h1 className="uppercase">{exercise.name}</h1>
                <span>{exercise.time}</span>
              </section>
              <p className="text-muted-foreground">{exercise.description}</p>
              <div className="flex items-center gap-1">
                {exercise.muscles.map((muscle, index) => (
                  <Badge key={index} className="font-mono text-sm uppercase">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-4 right-5 flex items-center gap-1 rounded-full bg-popover p-1 opacity-80">
          <Button
            size={"icon"}
            variant={"ghost"}
            className="size-7 rounded-full"
            onClick={() => api?.scrollPrev()}
            disabled={!api?.canScrollPrev()}
          >
            <FaChevronLeft />
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: count }).map((_, index) => {
              if (index + 1 === current)
                return (
                  <div
                    onClick={() => api?.scrollTo(index)}
                    key={index}
                    className="h-3 w-6 cursor-pointer rounded-full bg-primary transition-all"
                  />
                );
              return (
                <div
                  onClick={() => api?.scrollTo(index)}
                  key={index}
                  className="size-3 cursor-pointer rounded-full bg-primary opacity-65 transition-all"
                />
              );
            })}
          </div>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="size-7 rounded-full"
            onClick={() => api?.scrollNext()}
            disabled={!api?.canScrollNext()}
          >
            <FaChevronRight />
          </Button>
        </div>
      </Carousel>
    </>
  );
}
