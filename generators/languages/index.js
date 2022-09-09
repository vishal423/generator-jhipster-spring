const chalk = require('chalk');
const LanguagesGenerator = require('generator-jhipster-svelte/generators/languages');

const blueprintPackageJson = require('../../package.json');

module.exports = class extends LanguagesGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used only like ${chalk.yellow(
					'jhipster --blueprints spring'
				)} or using cli ${chalk.yellow('spring')}`
			);
		}

		this.blueprintjs = blueprintPackageJson;
		this.enableTranslation = this.config.get('enableTranslation') || false;
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
};
