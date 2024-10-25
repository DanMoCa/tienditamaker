import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <article className="container relative max-w-3xl py-6 lg:py-10">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-[-200px] top-14 hidden xl:inline-flex"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        <div>
          <p className="block text-sm text-muted-foreground">Published on</p>
          <h1 className="scroll-m-20 text-3xl font-bold pt-4 tracking-tight lg:text-3xl">
            titulo
          </h1>
          <div className="mt-4 flex items-center space-x-3">
            <div className="flex flex-col text-left leading-tight">
              <p className="font-medium">name</p>
              <Link href={`https://www.x.com/`} target="_blank">
                <p className="text-xs text-gray-800 dark:text-gray-300 font-semibold hover:underline hover:cursor-pointer">
                  @
                </p>
              </Link>
            </div>
          </div>
        </div>

        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </>
  );
}
