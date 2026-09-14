import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BlobBackground } from "@/components/BlobBackground";
import { Navbar } from "@/components/Navbar";
import { CursorGlow } from "@/components/CursorGlow";
import { ClickSound } from "@/components/ClickSound";
import { CDMusicPlayer } from "@/components/CDMusicPlayer";
import { ThemeParticles } from "@/components/ThemeParticles";
import { Preloader } from "@/components/Preloader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="hero-text text-[20vw] text-glow leading-none">404</h1>
        <Link to="/" className="mt-6 inline-block text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground">
          ← Return home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-2xl">Signal lost</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground hover:text-accent"
        >
          Re-establish ↻
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nova Studio — Cinematic Digital Portfolio" },
      { name: "description", content: "A cinematic dark futuristic portfolio crafting immersive digital experiences at the edge of design and motion." },
      { property: "og:title", content: "Nova Studio — Cinematic Digital Portfolio" },
      { property: "og:description", content: "A cinematic dark futuristic portfolio crafting immersive digital experiences at the edge of design and motion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nova Studio — Cinematic Digital Portfolio" },
      { name: "twitter:description", content: "A cinematic dark futuristic portfolio crafting immersive digital experiences at the edge of design and motion." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/28e6d373-dc1f-44de-bc29-b472bbe80c79/id-preview-bdddbf49--7f49bf9a-4b62-420b-b820-e02ff0b7b57f.lovable.app-1779329107562.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/28e6d373-dc1f-44de-bc29-b472bbe80c79/id-preview-bdddbf49--7f49bf9a-4b62-420b-b820-e02ff0b7b57f.lovable.app-1779329107562.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <BlobBackground />
      <CursorGlow />
      <ThemeParticles />
      <ClickSound />
      <CDMusicPlayer />
      <div className="noise-overlay" />
      <Preloader />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
