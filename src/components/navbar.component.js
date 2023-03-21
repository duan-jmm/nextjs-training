import Link from "next/link";

export function Navbar(props) {
  return (
    <nav className="flex sm:justify-center space-x-4 pt-5">
      {[
        ["All", "/"],
        ["Random", "/random"],
        ["About", "/about"],
        ["Login", "/auth/login"],
      ].map(([title, url]) => (
        <a href={url} className="rounded-lg px-3 py-2 text-slate-700 font-bold hover:bg-slate-100 hover:text-slate-900">
          {title}
        </a>
      ))}
    </nav>
  );
}
