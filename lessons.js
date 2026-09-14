class Lesson {
  constructor(id, title, subject, description, videoUrl, latexNotesUrl) {
    this.id = id;
    this.title = title;
    this.subject = subject;
    this.description = description;
    this.videoUrl = videoUrl;
    this.latexNotesUrl = latexNotesUrl;
  }

  createCardHTML() {
    let borderColor =
      this.subject === "physics"
        ? "hover:border-cyan-400"
        : this.subject === "math"
          ? "hover:border-amber-400"
          : this.subject === "chemistry"
            ? "hover:border-emerald-400"
            : "hover:border-indigo-400";

    let badgeColor =
      this.subject === "physics"
        ? "text-cyan-400"
        : this.subject === "math"
          ? "text-amber-400"
          : this.subject === "chemistry"
            ? "text-emerald-400"
            : "text-indigo-400";

    return `
            <div class="p-6 rounded-xl border border-brandBorder bg-slate-900/50 flex flex-col justify-between transition-colors ${borderColor}">
                <div>
                    <span class="text-xs font-semibold uppercase tracking-wider ${badgeColor}">${this.subject}</span>
                    <h3 class="text-xl font-bold text-white mt-1">${this.title}</h3>
                    <p class="text-sm text-slate-400 mt-2 leading-relaxed">${this.description}</p>
                </div>
                
                <div class="flex gap-3 mt-6">
                    <button onclick="playVideo('${this.videoUrl}')" class="bg-slate-100 hover:bg-white text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors w-full text-center">
                        Watch
                    </button>
                    <a href="${this.latexNotesUrl}" target="_blank" download class="border border-brandBorder hover:bg-slate-800 text-slate-300 font-medium px-4 py-2 rounded-lg text-sm transition-colors text-center w-full">
                        PDF
                    </a>
                </div>
            </div>
        `;
  }
}

// THE DATABASE
const lessonDB = [
  new Lesson(
    "phys-01",
    "Moment of Inertia",
    "physics",
    "Why mass distribution determines rotational resistance.",
    "./videos/placeholder.mp4",
    "./pdfs/inertia.pdf",
  ),
  new Lesson(
    "phys-02",
    "Kinematics in 2D",
    "physics",
    "Projectile motion and vector derivations.",
    "./videos/placeholder.mp4",
    "./pdfs/kinematics.pdf",
  ),
  new Lesson(
    "chem-01",
    "SN1 vs SN2",
    "chemistry",
    "Nucleophilic substitution pathways.",
    "./videos/placeholder.mp4",
    "./pdfs/organic.pdf",
  ),
  new Lesson(
    "math-01",
    "Visualizing Derivatives",
    "math",
    "The geometric intuition behind limits.",
    "./videos/placeholder.mp4",
    "./pdfs/derivatives.pdf",
  ),
  new Lesson(
    "it-01",
    "Binary Search",
    "it",
    "How searching through sets in fast time helps us build efficient programs",
    "./videos/placeholder.mp4",
    "./pdfs/binarysearch.pdf",
  ),
];

function renderLessons(subjectFilter) {
  const container = document.getElementById("lesson-grid");
  if (!container) return;

  container.innerHTML = "";
  const filteredLessons = lessonDB.filter(
    (lesson) => lesson.subject === subjectFilter,
  );

  filteredLessons.forEach((lesson) => {
    container.innerHTML += lesson.createCardHTML();
  });
}
function playVideo(url) {
  alert(`In v2.0, this will open the HTML5 player for: ${url}`);
}
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}
