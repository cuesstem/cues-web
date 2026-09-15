const SUPABASEURL = "https://fqhlfvoopeqazmzmmqnk.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxaGxmdm9vcGVxYXptem1tcW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODcwMTMsImV4cCI6MjEwNTA2MzAxM30.iMNShXqk_aQlRU-EdDNpjeIghcfBQK6WgKA_zZy8qPk";

const supabaseClient = window.supabase.createClient(
  SUPABASEURL,
  SUPABASE_ANON_KEY,
);
async function signUpUser(email, password, username) {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (error) {
    alert("Sign up failed: " + error.message);
    return;
  }

  alert("Account created! Check your email or sign in.");
  window.location.href = "signin";
}
async function loginUser(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  alert("Successfully logged in!");
  window.location.href = "index";
}
async function checkUserSession() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (session) {
    console.log("Logged in user:", session.user.email);
  } else {
    console.log("No user logged in.");
  }
}

async function updateNavbarAuth() {
  const desktopSlot = document.getElementById("desktop-auth-slot");
  const mobileSlot = document.getElementById("mobile-auth-slot");

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (session) {
    const username =
      session.user.user_metadata?.username || session.user.email.split("@")[0];

    // The unified layout for both mobile and desktop main bars
    const userHtml = `
            <div class="flex flex-col text-right leading-tight">
                <span class="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Logged in</span>
                <span class="text-xs md:text-sm font-bold text-white">${username}</span>
            </div>
        `;

    if (desktopSlot) desktopSlot.innerHTML = userHtml;
    if (mobileSlot) mobileSlot.innerHTML = userHtml;
  }
}

document.addEventListener("DOMContentLoaded", updateNavbarAuth);

document.addEventListener("DOMContentLoaded", updateNavbarAuth);

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}
class Lesson {
  constructor(id, title, subject, description, videoUrl, latexNotesUrl) {
    this.id = id;
    this.title = title;
    this.subject = subject;
    this.description = description;
    this.videoUrl = videoUrl;
    this.latexNotesUrl = latexNotesUrl;
  }

  createHTMLLesson() {
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
const lessonDB = [
  new Lesson(
    "phys-01",
    "Moment of Inertia",
    "physics",
    "Why mass distribution determines rotational resistance.",
    "https://www.youtube.com/embed/6unef5Hz6SU",
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
    container.innerHTML += lesson.createHTMLLesson();
  });
}

function playVideo(url) {
  const modal = document.getElementById("video-modal");
  const frame = document.getElementById("video-frame");

  if (modal && frame) {
    frame.src = url;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeVideo() {
  const modal = document.getElementById("video-modal");
  const frame = document.getElementById("video-frame");

  if (modal && frame) {
    frame.src = "";
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

class Article {
  constructor(id, page, title, description, subject) {
    this.id = id;
    this.page = page;
    this.title = title;
    this.description = description;

    this.subject = subject;
  }
  //

  createHTMLArticle() {
    //border color
    let borderColor = null;
    if (this.page === "physics") borderColor = "hover:border-cyan-400";
    else if (this.page === "math") borderColor = "hover:border-amber-400";
    else if (this.page === "chemistry")
      borderColor = "hover:border-emerald-400";
    else if (this.page === "it") borderColor = "hover:border-indigo-400";
    else borderColor = "hover:border-cyan-400";

    let textColor = borderColor;

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
  }
}
const articleDB = [new Article("test", "math", "test123", "test234", "math")];
function renderArticles(pageFilter) {
  const container = document.getElementById("article-grid");
  if (!container) return;

  container.innerHTML = "";
  const filteredArticles = articleDB.filter(
    (article) => article.page === pageFilter,
  );

  filteredArticles.forEach((article) => {
    container.innerHTML += article.createHTMLArticle();
  });
}
