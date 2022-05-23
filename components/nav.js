const navActiveClass = 'cm-menu__list__item--active';

class Nav extends HTMLElement {
  constructor(){
    super();

    // ideally would have a loading state
    this.cities = [];
    this.active = this.getAttribute('active'); 
    this.serverError = false;

    this.timeOffset = false;
    this.timeOutput = '';
  }

  connectedCallback() {
    this.render();
    // add listeners
    window.addEventListener('resize', this.handleWindowResize);
    this.fetchCities();

    // start clock a'tickin'
    setInterval(() => { 
      // TODO: improvement possible with just adding a second at a time to a date
      this.showTime();
    },1000);
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
    // show time
    this.timeOffset = item.getAttribute('offset');
    this.showTime();
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

  pushTime() {
    if( this.timeOutput == '' ){
      return false;
    }
    const clockOutput = document.getElementById('cm-clock__face');
    clockOutput.innerHTML = this.timeOutput;
  }

  showTime() {
    if( this.timeOffset == false ) return;

    const offset = this.timeOffset;
    // find the GMT time from timezone on local
    const localDate = new Date();
    const localOffset = localDate.getTimezoneOffset(); // in minutes
    const localHourOffset = localOffset / 60;
    const utcDate = new Date();
    utcDate.setTime(localDate.getTime() + (localHourOffset*60*60*1000));

    const locationTime = new Date();
    locationTime.setTime(utcDate.getTime() + (offset*60*60*1000));

    // (date.getMinutes()<10?'0':'') double digits minutes
    let locSuffix = 'AM';
    const locMins = ('0'+locationTime.getMinutes()).slice(-2);
    let locHours = locationTime.getHours();
    if( locHours > 12 ){
      locSuffix = 'PM';
      locHours = locHours - 12;
    }
    const locSeconds = ('0'+locationTime.getSeconds()).slice(-2);
    this.timeOutput = locHours + ':' + locMins + ':' + locSeconds + locSuffix;
    this.pushTime();
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
    let ul = document.createElement('ul');
    ul.setAttribute('class', 'cm-menu__list');
    cities.forEach( (city, i) => {
      let li = document.createElement('li')
      li.setAttribute('id', city.section);
      li.setAttribute('offset', city.offset);
      li.classList.add('cm-menu__list__item');
      // check for active
      if( city.section == this.active ){
        li.classList.add(navActiveClass);
        this.timeOffset = city.offset;
        this.showTime();
      }
      // key not necessary, but if converted to React
      li.innerHTML = '<span class="hide-desktop">'+ city.abbr +'</span><span class="show-desktop">'+ city.label +'</span>';
      li.onclick = () => this.selectCity(city.section);
      ul.appendChild(li);      
    });

    // create nav element
    let nav = document.createElement('nav');
    nav.classList.add('cm-menu');
    nav.appendChild(ul);
    // add monorail
    let monorail = document.createElement('div');
    monorail.classList.add('cm-menu__monorail');
    let train = document.createElement('span'); // this metaphor...
    train.classList.add('cm-menu__monorail__train');
    monorail.appendChild(train);

    nav.appendChild(monorail);

    // throw that badboy in the element
    this.innerHTML = '';
    this.appendChild(nav);
  }


}

customElements.define('cm-nav', Nav);