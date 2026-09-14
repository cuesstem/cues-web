function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
}
class Article {
  constructor(id, page, title, description, text) {
    this.id = id;
    this.page = page;
    this.title = title;
    this.description = description;
    this.text = text;
  }
}
