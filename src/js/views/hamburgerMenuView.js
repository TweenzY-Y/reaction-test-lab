const hamburgerMenuElement = document.querySelector(".hamburger-menu");
const navElement = document.querySelector("ul");
const mainElement = document.querySelector("main");
const bodyElement = document.querySelector("body");
const navLinkElements = document.querySelectorAll("a");
const collectionOfToggleElements = [
  hamburgerMenuElement,
  navElement,
  mainElement,
  bodyElement,
];

class HamburgerMenuView {
  toggleHamburgerMenuEffect(mobileView) {
    if (!hamburgerMenuElement.classList.contains("active") && mobileView) {
      collectionOfToggleElements.forEach((element) => {
        element.classList.add("active");
      });
    } else {
      collectionOfToggleElements.forEach((element) => {
        element.classList.remove("active");
      });
    }
  }

  addHamburgerMenuClickHandler(a) {
    hamburgerMenuElement.addEventListener("click", a);
  }
}

export default new HamburgerMenuView();
