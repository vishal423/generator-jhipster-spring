const chalk = require('chalk');
const CommonGenerator = require('generator-jhipster-svelte/generators/common');
const { writeFiles, writeMainGeneratorFiles } = require('./files');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends CommonGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });
		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used like ${chalk.yellow('jhipster --blueprints spring')}`
			);
		}

		this.blueprintjs = blueprintPackageJson;
		this.skipServer = this.config.get('skipServer') || false;
	}

	get initializing() {
		return super._initializing();
	}

	get loading() {
		return super._loading();
	}

	get preparing() {
		return super._preparing();
	}

	get default() {
		return super._default();
	}

	// eslint-disable-next-line class-methods-use-this
	get writing() {
		return {
			writeAdditionalFile() {
				writeMainGeneratorFiles.call(this);
				writeFiles.call(this);
			},
		};
	}
};
