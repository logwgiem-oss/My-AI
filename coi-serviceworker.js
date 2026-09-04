/*! coi-serviceworker v0.1.3 - MIT License - https://github.com/gzuidhof/coi-serviceworker */
(() => {
    const n = self.window;
    const e = n ? window.location.href : self.registration.scope;
    const t = `${e}_coiReloaded`;
    
    if (n) {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register(window.document.currentScript.src).then(
                (n) => {
                    n.addEventListener("updatefound", () => {
                        window.location.reload();
                    });
                    if (n.active && !window.crossOriginIsolated && !sessionStorage.getItem(t)) {
                        sessionStorage.setItem(t, "1");
                        window.location.reload();
                    }
                },
                (n) => console.error("COI registration failed: ", n)
            );
        }
    } else {
        self.addEventListener("install", () => self.skipWaiting());
        self.addEventListener("activate", (n) => n.waitUntil(self.clients.claim()));
        self.addEventListener("fetch", (n) => {
            const e = n.request;
            if ("short-circuit" === e.mode || !e.url.startsWith(self.location.origin)) return;
            n.respondWith(
                fetch(e).then((n) => {
                    if (0 === n.status) return n;
                    const e = new Headers(n.headers);
                    e.set("Cross-Origin-Embedder-Policy", "require-corp");
                    e.set("Cross-Origin-Opener-Policy", "same-origin");
                    return new Response(n.body, { status: n.status, statusText: n.statusText, headers: e });
                })
            );
        });
    }
})();
