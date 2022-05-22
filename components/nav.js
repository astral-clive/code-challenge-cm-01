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
    const cities = this.cities;
    console.log(cities);

    // create list item
    let ul = document.createElement("ul");
    ul.setAttribute('class', 'cm-menu__list');
    cities.forEach( (city, i) => {
      let li = document.createElement("li")
      li.setAttribute('class', 'cm-menu__list__item');
      li.setAttribute('id', city.section);
      // key not necessary, but if converted to React
      li.innerHTML = city.label;
      ul.appendChild(li);      
    });

    // create nav item
    let nav = document.createElement("nav");
    nav.setAttribute('class', 'cm-menu');
    nav.appendChild(ul);

    // throw that badboy in the element
    this.innerHTML = '';
    this.appendChild(nav);
  }


}

customElements.define("cm-nav", Nav);