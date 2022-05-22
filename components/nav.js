class Nav extends HTMLElement {
  constructor(){
    super();

    // ideally would have a loading state
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
    .then( (data) => {
      this.cities = data['cities'];
      this.render();
    });
  }

  // listeners
  handleWindowResize = (e) => {
    // handle resize
  }

  render() {
    if( this.cities.length == 0 ){
      this.innerHTML = `<div>
        Loading...
        </div>`;
        return;
    }
    
    // data received from api under this.cities
    console.log(this.cities);
    
    this.innerHTML = `
      <div>
        Loaded.
      </div>
    `;
  }


}

customElements.define("cm-nav", Nav);