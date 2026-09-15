function renderNavbar() {
  const navbarHTML = `
    <header class="border-b border-brandBorder bg-slate-950/90 backdrop-blur sticky top-0 z-50 px-4 md:px-6 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <a href="/cues-web/" class="text-xl font-bold text-cyan-400">
          CUES<span class="text-slate-500 text-sm font-normal">.stem</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="lessons" class="hover:text-white transition-colors">Lessons</a>
          <a href="math" class="hover:text-amber-400 transition-colors">Math</a>
          <a href="physics" class="hover:text-cyan-400 transition-colors">Physics</a>
          <a href="chemistry" class="hover:text-emerald-400 transition-colors">Chemistry</a>
          <a href="it" class="hover:text-indigo-400 transition-colors">IT</a>
          <a href="study-guide" class="hover:text-white transition-colors">Study Guide</a>
          <a href="for-teachers" class="hover:text-white transition-colors">For Teachers</a>
          <a href="about" class="hover:text-white transition-colors">About</a>
          
          <!-- Desktop Auth Slot -->
          <div id="desktop-auth-slot" class="flex items-center">
              <a href="signin.html" class="bg-slate-800 hover:bg-slate-700 text-white px-4 py-1.5 rounded-md border border-slate-700 transition-all text-sm font-medium">Sign In</a>
          </div>
        </nav>

        <!-- Mobile Header Right Side (Auth Slot + Hamburger) -->
        <div class="flex items-center gap-3 md:hidden">
            <div id="mobile-auth-slot">
                <a href="signin.html" class="bg-slate-800 text-white px-3 py-1 rounded-md border border-slate-700 text-xs font-medium">Sign In</a>
            </div>
            
            <button id="menu-btn" onclick="toggleMobileMenu()" class="text-slate-300 hover:text-white focus:outline-none p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
        </div>
      </div>

      <!-- Mobile Dropdown Drawer Links -->
      <div id="mobile-menu" class="hidden md:hidden pt-4 pb-2 border-t border-brandBorder mt-4 space-y-3 text-sm font-medium text-slate-300">
        <a href="lessons" class="block py-1 hover:text-white">Lessons</a>
        <a href="math" class="block py-1 hover:text-amber-400">Math</a>
        <a href="physics" class="block py-1 hover:text-cyan-400">Physics</a>
        <a href="chemistry" class="block py-1 hover:text-emerald-400">Chemistry</a>
        <a href="it" class="block py-1 hover:text-indigo-400">IT</a>
        <a href="study-guide" class="block py-1 hover:text-white">Study Guide</a>
        <a href="for-teachers" class="block py-1 hover:text-white">For Teachers</a>
        <a href="about" class="block py-1 hover:text-white">About</a>
      </div>
    </header>
    `;

  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    placeholder.innerHTML = navbarHTML;

    if (typeof updateNavbarAuth === "function") {
      updateNavbarAuth();
    }
  }
}

document.addEventListener("DOMContentLoaded", renderNavbar);
