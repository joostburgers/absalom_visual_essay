// JavaScript source code const 
init = () => {
	const main = d3.select("main"); const scrolly = main.select("#scrolly"); const figure = scrolly.select("figure"); const article = scrolly.select("article"); const step = article.selectAll(".step");
	// initialize the scrollama 
	const scroller = scrollama();
	// generic window resize listener event 
	const handleResize = () => {
		// 1. update height of step elements 
		const stepH = Math.floor(window.innerHeight * 0.75); step.style("height", `${stepH}px`);
		const figureHeight = window.innerHeight / 2;
		const figureMarginTop = (window.innerHeight - figureHeight) / 2;

		figure
			.style("height", `${figureHeight}px`)
			.style("top", `${figureMarginTop}px`);

		// 3. tell scrollama to update new element dimensions
		scroller.resize();
	}
	// scrollama event handlers 
	const handleStepEnter = (response) => {
		step.classed("is-active", function (d, i) {
			return i === response.index;
		});

		// update graphic based on step
		startAnimation(response.index);
	}
	// 1. force a resize on load to ensure proper dimensions are sent to scrollama handleResize();
	// 2. setup the scroller passing options //      this will also initialize trigger observations // 3. bind scrollama event handlers (this can be chained like below) 
	const scroller = scrollama().setup({ step: "#scrolly article .step", offset: 0.33, debug: false }).onStepEnter(handleStepEnter);
	// optimize handleResize with debouncing 
	const debounce = (func, wait, immediate) => {
		let timeout; return () => {
			const context = this, args = arguments; const later = () => {
				timeout = null; if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout; clearTimeout(timeout); timeout = setTimeout(later, wait); if (callNow) func.apply(context, args);
		};
	}
	const handleResizeDebounced = debounce(handleResize, 100); window.addEventListener("resize", handleResizeDebounced);
}

const startAnimation = (index) => {
	const currentStep = step.filter(function (d, i) { return i === index; }); const currentImg = currentStep.select("img");
	currentImg.style("opacity", 0);
	window.requestAnimationFrame(() => { currentImg.style("opacity", 1); });
}
document.addEventListener("DOMContentLoaded", init);
