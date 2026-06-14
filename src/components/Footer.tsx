export default function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} ElyZ 2027</p>
        <p>Suivi indépendant de l&apos;actualité présidentielle</p>
      </div>
    </footer>
  );
}
