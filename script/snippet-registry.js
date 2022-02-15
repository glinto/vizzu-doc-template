
class SnippetRegistry {
	constructor() {
		this.snippets = {};
		this.snippetPlayerChart = undefined;
	}

	addSnippet(semver, animFn, options) {
		let [_, major, minor] = semver.split('.').map((x) => parseInt(x));

		if (!this.snippets[major]) this.snippets[major] = [];
		this.snippets[major][minor] = { fn: animFn, options: options };
	}

	playSnippet(semver) {
		if (!semver) return Promise.reject('No semver specified');
		let [_, major, minor] = semver.split('.').map((x) => parseInt(x));
		if (this.snippets[major] === undefined) return Promise.reject('Unknown major');
		if (this.snippets[major][minor] === undefined) return Promise.reject('Unknown minor');

		// If we already have a base state from where we want to animate the chart
		// we use that, otherwise we need to incemental build the state
		if (this.snippets[major][minor].baseState !== undefined) {
			// hide the chart until we transit to base state
			this.snippetPlayerChart.classList.add('opacity-0');

			return this.playState(this.snippets[major][minor].baseState, '10ms')
				.then(() => {
					// we can now show the chart as it transitions to the target state
					this.snippetPlayerChart.classList.remove('opacity-0');
					return this.playState(this.snippets[major][minor].fn, '500ms');
				})
				.then(() => {
					// Save the result as the base state of the next step (if exists)
					if (this.snippets[major][minor + 1] !== undefined) {
						this.snippets[major][minor + 1].baseState = this.snippetPlayerChart.chart.config;
					}
				});
		}
		// We do not have the base state yet - let's build it
		else {
			return this.buildState(major, 1, minor);
		}

	}

	playState(state, speed) {

		return this.snippetPlayerChart.chart.initializing.then(() => {
			if (typeof state === 'function') {
				return state(this.snippetPlayerChart.chart);
			}
			else {
				return this.snippetPlayerChart.chart.animate(state, speed);
			}
		});

	}

	async buildState(major, minorFrom, minorTo) {
		if (this.snippets[major] === undefined) {
			console.log('Cannot build state for major', major);
			return Promise.reject('Unknown major');
		}
		console.log('Building incremental snippet state', major, minorFrom, minorTo);

		// Hide the chart until we build the base state
		this.snippetPlayerChart.classList.add('opacity-0');

		let animSpeed = '10ms';

		// Wait for the cahrt to be initialized
		await this.snippetPlayerChart.chart.initializing;

		for (let minor = minorFrom;minor <= minorTo;minor++) {
			if (this.snippets[major][minor] === undefined) continue;

			if (minor === minorTo) {
				// for the last step we show the chart
				// and use normal anim speed
				this.snippetPlayerChart.classList.remove('opacity-0');
				animSpeed = '500ms';
			}

			await this.playState(this.snippets[major][minor].fn, animSpeed);

			// Save the result as the base state of the next step (if exists)
			if (this.snippets[major][minor + 1] !== undefined) {
				this.snippets[major][minor + 1].baseState = this.snippetPlayerChart.chart.config;
			}

		}

		return Promise.resolve();

	}

}

registry = new SnippetRegistry();