 async function cargarDEFCON() {
  const feed = document.getElementById("news-feed");

  const fuentes = [
    ["CYBER", "https://thehackernews.com/feeds/posts/default"],
    ["CYBER", "https://www.bleepingcomputer.com/feed/"],
    ["CYBER", "https://www.darkreading.com/rss.xml"],
    ["WAR", "https://www.aljazeera.com/xml/rss/all.xml"],
    ["WAR", "https://feeds.bbci.co.uk/news/world/rss.xml"],
    ["POL", "https://www.reuters.com/rssFeed/worldNews"],
    ["ECO", "https://www.ft.com/rss/home"],
    ["ECO", "https://www.reuters.com/rssFeed/businessNews"]
  ];

  let noticias = [];

  for (const [tipo, url] of fuentes) {
    try {
      const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
      const res = await fetch(api);
      const data = await res.json();

      if (data.status === "ok") {
        data.items.slice(0, 2).forEach(item => {
          noticias.push(`[DEFCON-${tipo}] ${item.title.toUpperCase()}`);
        });
      }
    } catch {
      noticias.push(`[DEFCON-${tipo}] FUENTE NO DISPONIBLE`);
    }
  }

  const salida = noticias.join(" ◆ ");
  feed.innerHTML = salida + " ◆ " + salida;
}

window.addEventListener("load", cargarDEFCON);
