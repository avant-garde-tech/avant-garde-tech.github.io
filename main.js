class MdArticle extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const srcPath = this.getAttribute("src");

    let md;
    if (srcPath !== null) {
      const res = await fetch(srcPath);
      md = await res.text();
    } else {
      md = this.innerHTML.trim();
    }

    marked.use({ gfm: true, breaks: true });
    this.innerHTML = `
      <div class="markdown">
        ${marked.parse(md)}
      </div>
    `;
  }
}

customElements.define("md-article", MdArticle);
