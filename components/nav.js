class Nav extends HTMLElement {
  constructor(){
    super();

    this.cities = [];
  }

  connectedCallback() {
    this.render();
    // add listeners
    window.addEventListener('resize', this.handleWindowResize);
  }

  // fetchCities = async () => {}

  // listeners
  handleWindowResize = (e) => {
    // handle resize
  }

  render() {
    this.innerHTML = `
      <div>
        Navigation Component
      </div>
    `;
  }

}

customElements.define("cm-nav", Nav);