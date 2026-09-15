function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}

class Article {
  //Creates the actual class
  constructor(id, page, title, description, subject) {
    this.id = id;
    this.page = page;
    this.title = title;
    this.description = description;

    this.subject = subject;
  }
  //

  //creates a block that loads the article
  createHTML() {
    //border color
    let borderColor = null;
    if (this.page === "physics") borderColor = "hover:border-cyan-400";
    else if (this.page === "math") borderColor = "hover:border-amber-400";
    else if (this.page === "chemistry")
      borderColor = "hover:border-emerald-400";
    else if (this.page === "it") borderColor = "hover:border-indigo-400";
    else borderColor = "hover:border-cyan-400";
    //

    //text color
    let textColor = borderColor;
    //

    //return the block
    return `
            <div class="p-6 rounded-xl border border-brandBorder bg-slate-900/50 flex flex-col justify-between transition-colors ${borderColor}">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider ${textColor}">${this.subject}</span>
                    <h3 class="text-xl font-bold text-white mt-1">${this.title}</h3>
                    <p class="text-sm text-slate-400 mt-2 leading-relaxed">${this.description}</p>
                </div>
                
                <div class="flex gap-3 mt-6">
                    <a href="articles/${this.id}" class="bg-slate-100 hover:bg-white text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors w-full text-center block">
                        See More
                    </a>
                </div>
            </div>
        `;
    //
  }
  //
}
function renderArticles(pageFilter) {
  const container = document.getElementById("article-grid");
  if (!container) return;

  container.innerHTML = "";
  const filteredArticles = articleDB.filter(
    (article) => article.page === pageFilter,
  );

  filteredArticles.forEach((article) => {
    container.innerHTML += article.createHTML();
  });
}
const articleDB = [new Article("test", "math", "test123", "test234", "math")];
