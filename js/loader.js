const loaderStyle = `
#loader {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 24px;
  text-align: center;
  padding-top: 50vh;
  z-index: 9999;
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = loaderStyle;
document.head.appendChild(styleElement);

function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}
