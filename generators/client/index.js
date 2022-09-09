const chalk = require('chalk');
const ClientGenerator = require('generator-jhipster-svelte/generators/client');
const blueprintPackageJson = require('../../package.json');
const { askForClient } = require('./prompts');
const { askForModuleName } = require('../base');

module.exports = class extends ClientGenerator {
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
		const defaultPhaseFromJHipster = super._prompting();
		return {
			...defaultPhaseFromJHipster,
			askForClient,
			askForModuleName,
			overrideConfigOptions() {
				this.configOptions.clientFramework = this.jhipsterConfig.clientFramework = this.clientFramework;
				this.configOptions.clientTheme = this.jhipsterConfig.clientTheme = this.clientTheme = 'none';
				this.configOptions.clientThemeVariant =
					this.jhipsterConfig.clientThemeVariant =
					this.clientThemeVariant =
						'';
				this.configOptions.withAdminUi = this.jhipsterConfig.withAdminUi = this.askForAdminUi = '';
			},
		};
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
		return {
			...super._writing(),
			configurePrettier() {
				this.javaPrettier = false;
			},
		};
	}

	get postWriting() {
		return super._postWriting();
	}

	get end() {
		return super._end();
	}
};
