//Catche DOM


function component() {
	const element = document.createElement('div');

	element.innerHTML = 'Webpack setup successful';

	return element;
  }

  document.body.appendChild(component());