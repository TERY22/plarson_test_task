function doBeforeAndAfterDOMContentLoaded(cb) {
	document.addEventListener('readystatechange', () => {
		if (document.readyState === 'interactive') {
			cb();
			document.addEventListener('DOMContentLoaded', () => {
				cb()
			});
		}
	})
}

const randomFunction = () => {
	console.log('I\'am doing something!');
}

doBeforeAndAfterDOMContentLoaded(randomFunction)

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded');
})
