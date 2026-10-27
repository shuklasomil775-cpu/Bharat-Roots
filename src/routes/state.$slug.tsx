// Heritage detail screen: folk arts, cuisine, traditions and videos for one state.
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStateBySlug, type HeritageItem } from "@/lib/heritage";

export const Route = createFileRoute("/state/$slug")({
  loader: ({ params }) => {
    const state = getStateBySlug(params.slug);
    if (!state) throw notFound();
    return { name: state.name, description: state.description };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "State"} heritage · Bharat Roots` },
      { name: "description", content: loaderData?.description ?? "Explore Indian heritage." },
      { property: "og:title", content: `${loaderData?.name ?? "State"} heritage · Bharat Roots` },
      { property: "og:description", content: loaderData?.description ?? "Explore Indian heritage." },
    ],
  }),
  component: HeritageDetailScreen,
});

/** Card used for each folk art / dish / tradition. */
function ItemCard({ item, tone }: { item: HeritageItem; tone: string }) {
  return (
    <article className="animate-rise overflow-hidden rounded-xl bg-card shadow-card">
      <div className={`flex h-32 items-end p-4 lg:h-40 ${tone}`}>
        <h3 className="font-display text-lg font-bold text-primary-foreground">{item.name}</h3>
      </div>
      <p className="p-4 text-sm text-muted-foreground">{item.description}</p>
    </article>
  );
}

function HeritageDetailScreen() {
  const { slug } = Route.useParams();
  const state = getStateBySlug(slug);
  if (!state) return null;

  const tones = ["bg-primary", "bg-teal", "bg-gold text-gold-foreground", "bg-ink"];

  return (
    <AppShell>
      <div className="relative h-[250px] lg:h-[420px]">
        <img
          src={state.heroImage}
          alt={`${state.name} heritage`}
          width={1024}
          height={640}
          className="h-full w-full object-cover"
        />
         <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-foreground/30" />
        <Link
          to="/home"
          aria-label="Back to states"
           className="tap absolute left-4 top-5 rounded-full bg-foreground/45 p-2 text-card backdrop-blur lg:left-10 lg:top-8 xl:left-14"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
         <div className="absolute bottom-4 left-4 right-4 text-card lg:bottom-10 lg:left-10 lg:max-w-3xl xl:left-14">
           <p className="mb-2 hidden text-sm font-medium text-gold lg:block">Home / States / {state.name}</p>
           <h1 className="font-display text-3xl font-bold lg:text-6xl">{state.name}</h1>
           <p className="mt-1 text-sm text-card/85 lg:mt-3 lg:text-lg">{state.description}</p>
        </div>
      </div>

      <div className="p-4 lg:px-10 lg:py-8 xl:px-14">
        <Tabs defaultValue="arts">
           <TabsList className="grid w-full grid-cols-3 rounded-xl lg:mx-auto lg:max-w-2xl">
            <TabsTrigger value="arts">Folk Arts</TabsTrigger>
            <TabsTrigger value="food">Cuisine</TabsTrigger>
            <TabsTrigger value="festivals">Festivals</TabsTrigger>
          </TabsList>

           <TabsContent value="arts" className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {state.folkArts.map((item, i) => (
               <ItemCard key={item.name} item={item} tone={tones[i % tones.length] ?? "bg-primary"} />
            ))}
          </TabsContent>

           <TabsContent value="food" className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {state.cuisine.map((item, i) => (
               <ItemCard key={item.name} item={item} tone={tones[(i + 2) % tones.length] ?? "bg-primary"} />
            ))}
          </TabsContent>

           <TabsContent value="festivals" className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {state.traditions.map((item, i) => (
               <ItemCard key={item.name} item={item} tone={tones[(i + 1) % tones.length] ?? "bg-primary"} />
            ))}
          </TabsContent>
        </Tabs>

        <section className="mt-7">
          <h2 className="font-display text-lg font-semibold">Heritage videos</h2>
          <p className="text-sm text-muted-foreground">Watch these on YouTube</p>
           <div className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 xl:grid-cols-4 lg:overflow-visible">
            {state.videos.map((video) => (
              <a
                key={video.title}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                 className="tap w-64 shrink-0 snap-start overflow-hidden rounded-xl bg-card shadow-card lg:w-auto"
              >
                <div className="relative flex h-32 items-center justify-center bg-ink">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Play className="h-5 w-5 fill-current" />
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-display text-sm font-semibold">{video.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{video.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
