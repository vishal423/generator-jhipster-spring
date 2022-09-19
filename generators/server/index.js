const chalk = require('chalk');
const ServerGenerator = require('generator-jhipster-svelte/generators/server');
const { writeFiles } = require('./files');
const { askForServerSideOpts, askForOptionalItems } = require('./prompts');
const { askForModuleName } = require('../base');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends ServerGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used like ${chalk.yellow('jhipster --blueprints spring')} `
			);
		}

		this.blueprintjs = blueprintPackageJson;
		this.skipServer = this.config.get('skipServer') || false;
	}

	get initializing() {
		return super._initializing();
	}

	// eslint-disable-next-line class-methods-use-this
	get prompting() {
		const phaseFromJHipster = super._prompting();
		return {
			...phaseFromJHipster,
			askForModuleName,
			askForServerSideOpts,
			askForOptionalItems,
		};
	}

	get configuring() {
		return super._configuring();
	}

	get composing() {
		return super._composing();
	}

	get loading() {
		const phaseFromJHipster = super._loading();
		return {
			...phaseFromJHipster,
			loadBlueprintConfig() {
				this.artifactName = this.blueprintConfig.artifactName;
				this.groupName = this.blueprintConfig.groupName;
				this.description = this.blueprintConfig.description;
			},
		};
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
			configureConstants() {
				if (!this.skipServer) {
					this.javaMainClass = `${this.mainClass.substring(0, this.mainClass.length - 3)}Application`;
				}
			},
			writeAdditionalFile() {
				if (!this.skipServer) {
					writeFiles.call(this);
				}
			},
		};
	}

	// eslint-disable-next-line class-methods-use-this
	get postWriting() {
		// override to not include package scripts
		return {};
	}

	get end() {
		return super._end();
	}
};
