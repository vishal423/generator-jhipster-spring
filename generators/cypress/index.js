/* eslint-disable class-methods-use-this */
const chalk = require('chalk');
const CypressGenerator = require('generator-jhipster-svelte/generators/cypress');

const blueprintPackageJson = require('../../package.json');

module.exports = class extends CypressGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		const jhContext = (this.jhipsterContext = this.options.jhipsterContext);

		if (!jhContext) {
			this.error(
				`This is a JHipster blueprint and should be used only like ${chalk.yellow(
					'jhipster --blueprints spring'
				)} or using cli ${chalk.yellow('jh')}`
			);
		}

		this.blueprintjs = blueprintPackageJson;
		this.cypressCoverage = this.config.get('cypressCoverage') || false;
	}

	get prompting() {
		return super._prompting();
	}
};
