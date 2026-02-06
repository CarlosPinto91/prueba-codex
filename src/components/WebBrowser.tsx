import { ArrowLeft, ArrowRight, ExternalLink, RefreshCcw, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

interface WebBrowserProps {
  onClose: () => void;
}

const defaultUrl = "https://developer.mozilla.org";

const WebBrowser = ({ onClose }: WebBrowserProps) => {
  const [inputUrl, setInputUrl] = useState(defaultUrl);
  const [history, setHistory] = useState<string[]>([defaultUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const currentUrl = history[historyIndex];

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const safeUrl = useMemo(() => {
    try {
      const parsed = new URL(currentUrl);
      return parsed.toString();
    } catch {
      return "about:blank";
    }
  }, [currentUrl]);

  useEffect(() => {
    setInputUrl(currentUrl);
  }, [currentUrl]);

  const handleNavigate = (event?: FormEvent) => {
    event?.preventDefault();
    if (!inputUrl.trim()) {
      return;
    }
    const formattedUrl = inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`;
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      next.push(formattedUrl);
      return next;
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const openExternal = () => {
    const formattedUrl = inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`;
    window.open(formattedUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/95 shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => canGoBack && setHistoryIndex((prev) => prev - 1)}
            className="rounded-full border border-slate-800 bg-slate-900/70 p-2 text-slate-300 transition hover:border-indigo-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canGoBack}
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => canGoForward && setHistoryIndex((prev) => prev + 1)}
            className="rounded-full border border-slate-800 bg-slate-900/70 p-2 text-slate-300 transition hover:border-indigo-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!canGoForward}
          >
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => setReloadKey((prev) => prev + 1)}
            className="rounded-full border border-slate-800 bg-slate-900/70 p-2 text-slate-300 transition hover:border-indigo-400 hover:text-white"
          >
            <RefreshCcw size={16} />
          </button>
        </div>
        <button
          onClick={onClose}
          className="rounded-full border border-slate-800 bg-slate-900/70 p-2 text-slate-300 transition hover:border-rose-400 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      <div className="border-b border-slate-800/80 bg-slate-950/80 px-4 py-3">
        <form onSubmit={handleNavigate} className="flex flex-wrap items-center gap-3">
          <input
            value={inputUrl}
            onChange={(event) => setInputUrl(event.target.value)}
            className="min-w-0 flex-1 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
            placeholder="Introduce una URL"
          />
          <button
            type="submit"
            className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
          >
            Ir
          </button>
          <button
            type="button"
            onClick={openExternal}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-400/50 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/20"
          >
            <ExternalLink size={14} />
            Abrir Fuera
          </button>
        </form>
      </div>

      <div className="border-b border-yellow-500/40 bg-yellow-500/10 px-4 py-2 text-xs text-yellow-100">
        Algunos sitios como Google o YouTube bloquean iframes por seguridad. Usa “Abrir Fuera” si ves
        una pantalla en blanco.
      </div>

      <div className="h-[60vh] bg-slate-950">
        <iframe
          key={reloadKey}
          title="Navegador integrado"
          src={safeUrl}
          className="h-full w-full border-none"
          sandbox="allow-forms allow-same-origin allow-scripts allow-popups allow-modals"
        />
      </div>
    </div>
  );
};

export default WebBrowser;
