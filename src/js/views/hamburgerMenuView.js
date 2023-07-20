const hamburgerMenuElement = document.querySelector(".hamburger-menu");
const navElement = document.querySelector("ul");
const mainElement = document.querySelector("main");
const bodyElement = document.querySelector("body");
const navLinks = document.querySelector("ul");
const collectionOfToggleElements = [
  hamburgerMenuElement,
  navElement,
  mainElement,
  bodyElement,
];

class HamburgerMenuView {
  removeHamburgerEffects() {
    collectionOfToggleElements.forEach((element) => {
      element.classList.remove("active");
    });
  }
  handleHamburgerMenuClick() {
    collectionOfToggleElements.forEach((element) => {
      element.classList.toggle("active");
    });
  }

  addHamburgerMenuClickHandler(a) {
    hamburgerMenuElement.addEventListener("click", a);
  }

  addNavLinksClickHandler() {
    navLinks.addEventListener("click", this.removeHamburgerEffects);
  }
}

export default new HamburgerMenuView();
