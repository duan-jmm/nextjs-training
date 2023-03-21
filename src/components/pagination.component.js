import Link from "next/link";

export function Pagination({ current }) {
  const alphabet = {
    a: { prev: null, next: "b" },
    b: { prev: "a", next: "c" },
    c: { prev: "b", next: "d" },
    d: { prev: "c", next: "e" },
    e: { prev: "d", next: "f" },
    f: { prev: "e", next: "g" },
    g: { prev: "f", next: "h" },
    h: { prev: "g", next: "i" },
    i: { prev: "h", next: "j" },
    j: { prev: "i", next: "k" },
    k: { prev: "j", next: "l" },
    l: { prev: "k", next: "m" },
    m: { prev: "l", next: "n" },
    n: { prev: "m", next: "o" },
    o: { prev: "n", next: "p" },
    p: { prev: "o", next: "q" },
    q: { prev: "p", next: "r" },
    r: { prev: "q", next: "s" },
    s: { prev: "r", next: "t" },
    t: { prev: "s", next: "u" },
    u: { prev: "t", next: "v" },
    v: { prev: "u", next: "w" },
    w: { prev: "v", next: "x" },
    x: { prev: "w", next: "y" },
    y: { prev: "x", next: "z" },
    z: { prev: "y", next: null },
  };

  return (
    <div className={"mt-10 flex justify-center"}>
      <nav aria-label={"Page navigation example"}>
        <ul className={"list-style-none flex"}>
          {alphabet[current]?.prev == null ? (
            ""
          ) : (
            <li>
              <a
                className={
                  "relative block rounded bg-transparent py-3 px-5 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                }
                href={`/home/${alphabet[current]?.prev}`}
              >
                Previous
              </a>
            </li>
          )}

          {alphabet[current]?.prev != null ? (
            <li>
              <a
                className={
                  "relative block rounded bg-transparent py-3 px-5 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                }
                href={`/home/${alphabet[current]?.prev}`}
              >
                {alphabet[current]?.prev.toUpperCase()}
              </a>
            </li>
          ) : (
            ""
          )}

          <li>
            <a className={"relative block rounded bg-primary-100 py-3 px-5 text-lg font-medium text-cyan-600 transition-all duration-300"}>
              {current?.toUpperCase()}
            </a>
          </li>

          {alphabet[current]?.next != null ? (
            <li>
              <a
                className={
                  "relative block rounded bg-transparent py-3 px-5 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                }
                href={`/home/${alphabet[current]?.next}`}
              >
                {alphabet[current]?.next.toUpperCase()}
              </a>
            </li>
          ) : (
            ""
          )}
          {alphabet[current]?.next == null ? (
            ""
          ) : (
            <li>
              <a
                className={
                  "relative block rounded bg-transparent py-3 px-5 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                }
                href={`/home/${alphabet[current]?.next}`}
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
