import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { InteractiveGrid } from "../components/InteractiveGrid";
import { CustomCursor } from "../components/CustomCursor";
import faviconUrl from "../assets/favicon.png";

function NotFoundComponent() {
  return (
    <div className="relative z-[1] flex min-h-screen items-center justify-center px-4">
      <div className="neu-raised-lg max-w-md rounded-[2.5rem] bg-surface px-8 py-10 text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint neu-inset-sm">
          <span className="led led-on animate-led-breathe" />
          No signal
        </div>
        <h1 className="text-emboss font-display text-8xl font-bold tracking-tight">404</h1>
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">Page not found</h2>
        <p className="mt-2 text-sm text-ink-soft">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            search={{ project: undefined, experience: undefined }}
            className="neu-key inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="relative z-[1] flex min-h-screen items-center justify-center px-4">
      <div className="neu-raised-lg max-w-md rounded-[2.5rem] bg-surface px-8 py-10 text-center">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-faint neu-inset-sm">
          <span className="led led-on animate-led-breathe" />
          Interference
        </div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="neu-key inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-accent-ink"
          >
            Try again
          </button>
          <a
            href="/"
            className="neu-key inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-ink"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Simon Rödig" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#e9e6e0" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: faviconUrl },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
    scripts: [
      {
        // Apply the stored theme before first paint to avoid a light/dark flash.
        children: `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-surface">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <InteractiveGrid />
      {/* <CustomCursor /> */}
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
