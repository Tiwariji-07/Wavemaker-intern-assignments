

const pressedButtonSelector = '[data-theme][aria-pressed="true"]';
const defaultTheme = 'blue';

const applyTheme = (theme) => {
  const target = document.querySelector(`[data-theme="${theme}"]`);
  document.documentElement.setAttribute("data-selected-theme", theme);
  document.querySelector(pressedButtonSelector).setAttribute('aria-pressed', 'false');
  target.setAttribute('aria-pressed', 'true');
};

const handleThemeSelection = (event) => {
  const target = event.target;
  const isPressed = target.getAttribute('aria-pressed');
  const theme = target.getAttribute('data-theme');        
  console.log(isPressed);
  console.log(theme);
  if(isPressed !== "true") {
    applyTheme(theme);
    localStorage.setItem('selected-theme', theme);
  }
}

const setInitialTheme = () => {
  const savedTheme = localStorage.getItem('selected-theme');
  console.log(savedTheme);
  if(savedTheme && savedTheme !== defaultTheme) {
    applyTheme(savedTheme);
  }else{
    const target = document.querySelector(`[data-theme="${defaultTheme}"]`);
  document.documentElement.setAttribute("data-selected-theme", defaultTheme);
  document.querySelector(pressedButtonSelector).setAttribute('aria-pressed', 'false');
  target.setAttribute('aria-pressed', 'true');
  }
};

setInitialTheme();

const themeSwitcher = document.querySelector('#theme');
const buttons = themeSwitcher.querySelectorAll('button');

buttons.forEach((button) => {
   button.addEventListener('click', handleThemeSelection);
});