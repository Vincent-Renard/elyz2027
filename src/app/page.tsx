import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Frise présidentielle <span className="text-elyz-blue">2027</span>
        </h1>
        <p className="mt-2 text-zinc-500">
          Chronologie des candidatures et événements clés de l&apos;élection.
        </p>
      </div>
      <Timeline />
    </div>
  );
}
