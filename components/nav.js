class Nav extends HTMLElement {
  constructor(){
    super();

    // ideally would have a loading state
    this.cities = [];
    this.active = this.getAttribute('active'); 
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

  selectCity( city ){
    const item = document.getElementById(city);
    if( item.classList.contains('cm-menu__list__item--active') ) return;
    // change active city
    // first, clear class of all items
    const siblings = item => [...item.parentElement.children].filter(s=>s!=item);
    siblings(item).forEach(elem => elem.classList.remove('cm-menu__list__item--active'));
    console.log(siblings);
    item.classList.add('cm-menu__list__item--active');
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

    // create list and list items
    let ul = document.createElement("ul");
    ul.setAttribute('class', 'cm-menu__list');
    cities.forEach( (city, i) => {
      let li = document.createElement("li")
      li.setAttribute('id', city.section);
      li.classList.add('cm-menu__list__item');
      // check for active
      if( city.section == this.active ){
        li.classList.add('cm-menu__list__item--active');
      }
      // key not necessary, but if converted to React
      li.innerHTML = city.label;
      li.onclick = () => this.selectCity(city.section);
      ul.appendChild(li);      
    });

    // create nav element
    let nav = document.createElement("nav");
    nav.classList.add('cm-menu');
    nav.appendChild(ul);
    // add monorail
    let monorail = document.createElement("div");
    monorail.classList.add('cm-menu__monorail');
    nav.appendChild(monorail);

    // throw that badboy in the element
    this.innerHTML = '';
    this.appendChild(nav);
  }


}

customElements.define("cm-nav", Nav);