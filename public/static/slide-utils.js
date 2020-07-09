const putStylesToClass = (element) => {
  const createClassFromStyle = (styleStr) => {
    var style = document.createElement('style');
    style.type = 'text/css';
    const className =  "cl_"+Math.random().toString(36).substring(7);
    console.log(className)
    style.innerHTML = '.'+className+' { '+styleStr+'}';
    document.getElementsByTagName('head')[0].appendChild(style);
    return className;
  }

  const styleStr = element.getAttribute("style");
  element.removeAttribute("style");
  const className = createClassFromStyle(styleStr);
  element.classList.add(className);
}

const $ = (elementId) => {
  const element = document.getElementById(elementId);
  putStylesToClass(element);
  return element;
};