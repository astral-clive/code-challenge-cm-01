class Nav extends HTMLElement {
  constructor(){
    super();

    this.cities = [];
  }

  connectedCallback() {
    this.render();
    // add listeners
    window.addEventListener('resize', this.handleWindowResize);
    this.fetchCities();
  }

  fetchCities = async () => {
    fetch('http://localhost:8080/api')
    .then(response => response.json())
    .then(data => console.log(data));
  }

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