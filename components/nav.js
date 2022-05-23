const navActiveClass = 'cm-menu__list__item--active';

class Nav extends HTMLElement {
  constructor(){
    super();

    // ideally would have a loading state
    this.cities = [];
    this.active = this.getAttribute('active'); 
    this.serverError = false;
  }

  connectedCallback() {
    this.render();
    // add listeners
    window.addEventListener('resize', this.handleWindowResize);
    this.fetchCities();
  }

  fetchCities = async () => {
    fetch('http://localhost:8080/api')
    .then( response => response.json() )
    .then( data => {
      this.cities = data['cities'];
      this.render();
      this.resetMonorail();
    })
    .catch((error) => {
      this.serverError = true;
      this.render();
      // error found, probably not running the server
    });
  }

  selectCity( city ){
    const item = document.getElementById(city);
    if( item.classList.contains(navActiveClass) ) return;
    // change active city
    // first, clear class of all items
    const siblings = item => [...item.parentElement.children].filter(s=>s!=item);
    siblings(item).forEach(elem => elem.classList.remove(navActiveClass));
    item.classList.add(navActiveClass);
    this.resetMonorail();
  }

  resetMonorail() {
    // TODO: not perfect if more than one navigation item
    const activeItems = document.getElementsByClassName(navActiveClass);
    const monorails = document.getElementsByClassName('cm-menu__monorail');
    if( activeItems.length > 0 && monorails.length > 0 ){
      // exists, reposition monorail
      const activeItem = activeItems[0];
      const posLeft = activeItem.offsetLeft;
      const width = activeItem.offsetWidth;
      // set the custom properties
      monorails[0].style.setProperty('--train-left', posLeft + 'px');
      monorails[0].style.setProperty('--train-width', width + 'px');
    }
  }

  // listeners
  handleWindowResize = (e) => {
    // handle resize
      this.resetMonorail();
  }

  render() {
    if( this.serverError == true ){
      this.innerHTML = `<div id="cm-loader">
        <span>Error - See Console</span>
        </div>`;
        console.log('Please go to the route of the directory and enter "npm install", and then "npm run start" to begin the server so that you can access the data from the local API.');
        return;
    }

    if( this.cities.length == 0 ){
      this.innerHTML = `<div id="cm-loader">
        <span>Loading...</span>
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
        li.classList.add(navActiveClass);
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
    let train = document.createElement("span"); // this metaphor...
    train.classList.add('cm-menu__monorail__train');
    monorail.appendChild(train);

    nav.appendChild(monorail);

    // throw that badboy in the element
    this.innerHTML = '';
    this.appendChild(nav);
  }


}

customElements.define("cm-nav", Nav);