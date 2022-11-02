import { Suspense, use } from "react";
import { CreatePostForm } from "~/client/CreatePostForm";
import { serialize } from "~/client/hydration";
import { PostList } from "~/components/PostList";
import { PostListItem } from "~/components/PostListItem";
import { rsc } from "../server-rsc/trpc";

function PostListSkeleton() {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {Array.from({ length: 10 }).map((_, i) => (
        <PostListItem.Skeleton key={i} />
      ))}
    </ul>
  );
}

function PostListRSC() {
  const postList = rsc.post.list.use({});
  use(new Promise((resolve) => setTimeout(resolve, 3_00)));

  return (
    <PostList
      initialData={serialize({
        pages: [postList],
        pageParams: [{}],
      })}
    />
  );
}

export default function Page() {
  return (
    <div className="space-y-6 p-4">
      <header>
        <h1>Overview</h1>
        <div className="prose rounded-md bg-white p-4 shadow">
          <p>
            First posts are fetched with RSC, the infinite scrolling is through
            client
          </p>
          <p>
            <a
              href="https://github.com/trpc/next-13"
              className="text-indigo-500 underline"
              target="_blank"
              rel="noreferrer"
            >
              View source on GitHub
            </a>
          </p>
        </div>
      </header>
      <section>
        <h2>Add post</h2>
        <CreatePostForm />
      </section>
      <section>
        <h2>All posts</h2>

        <div className="overflow-hidden rounded-md bg-white shadow">
          <Suspense fallback={<PostListSkeleton />}>
            <PostListRSC />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
