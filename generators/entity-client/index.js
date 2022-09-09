const chalk = require('chalk');
const EntityClientGenerator = require('generator-jhipster-svelte/generators/entity-client');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends EntityClientGenerator {
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
		this.skipClient = this.config.get('skipClient') || false;
	}

	get initializing() {
		return super._initializing();
	}

	get prompting() {
		return super._prompting();
	}

	get configuring() {
		return super._configuring();
	}

	get composing() {
		return super._composing();
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

	get writing() {
		return super._writing();
	}

	get postWriting() {
		return super._postWriting();
	}

	get end() {
		return super._end();
	}
};
