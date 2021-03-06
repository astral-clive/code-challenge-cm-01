# code-challenge-cm-01
## Get Started
* `clone` git to directory
* run `npm install`
* `npm run start` to begin server (simple Express to serve JSON as API)
* Open **index.html** in browser
* Also available at [https://paulhitchmough.com/coding-challenge/](https://paulhitchmough.com/coding-challenge/)

## Notes
* Building as a Web Component was unnecessary, but did demonstrate the solution using "ES6 [...] as much as possible." - I could have also have built the solution with HTML and only handled the interactions with JS
* Served JSON on Express server to replicate a simple API
* Design isn't centered perfectly, this was intentional to replicate video exact proportions
* Ran with *CSS Custom Properties* as I wanted to use CSS for the animations
* Modified JSON to allow for abbreviations on mobile, and to help with timezone offset from GMT
* Timezone could be handled better with API
* Use a *mixin* for variable sized font, but only on parts that weren't directly referenced in the challenge ("Loading" and the Clock interface)

### Possible Improvements
* Clock functionality could be streamlined with measuring local offset to GMT and then the active city's offset, saving the offset between the two as a part of the Class's state, therefore reducing operations each time in the `setInterval()`
* Obviously a mobile approach for the menu would be required

---

## Description
You're building an interactive editorial piece about cities around the world, and want to include a navigation component that will allow the reader to learn about a diﬀerent city. 

Create a simple, minimalist navigation bar based on the video example and JSON ﬁle provided. Match the design as closely as you can. The navigation bar should have a sliding bar that indicates a selected item, and that bar should resize itself to match the width of the selected item text.

## Requirements

* On `resize`, the sliding indicator bar should update its position and size to match text. 
* Code should be optimized for Safari. Support for other browsers is not necessary.
* **Please limit library usage**. `ES6` and `CSS` as much as possible. `SASS` is permissible.
* You will have 24 hours to complete the exercise. 

## Bonus
Display the current time of the selected city. You have creative license on how this should look and behave. 

## Extra Resources
* Example of functionality and design available in **slider-nav** video provided
