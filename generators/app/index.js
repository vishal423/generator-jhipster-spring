const chalk = require('chalk');
const AppGenerator = require('generator-jhipster-svelte/generators/app');

const prompts = require('./prompts');
const { askForModuleName } = require('../base');
const blueprintPackageJson = require('../../package.json');

module.exports = class extends AppGenerator {
	constructor(args, opts) {
		super(args, { ...opts, fromBlueprint: true });

		this.blueprintjs = blueprintPackageJson;
		this.skipServer = this.config.get('skipServer') || false;

		this.option('swagger-ui', {
			desc: 'Generate Swagger UI',
			type: Boolean,
			defaults: false,
		});

		if (this.options.swaggerUi) {
			this.blueprintConfig.swaggerUi = this.options.swaggerUi;
		} else if (!this.blueprintConfig) {
			this.blueprintConfig = {};
			this.blueprintConfig.swaggerUi = false;
		}
	}

	get initializing() {
		const initPhaseFromJHipster = super._initializing();

		return {
			...initPhaseFromJHipster,
			displayLogo() {
				/* eslint-disable prettier/prettier */
				this.log('\n');
				this.log(`  ${chalk.green('  &&&&&&&  &&&&&&   &&&&&&&   &&&&&&&&  &&     &&   &&&&&&&  ')}`);
				this.log(`  ${chalk.green(' &&        &&   &&  &&    &&     &&     &&&    &&  &&        ')}`);
				this.log(`  ${chalk.green('   &&&&&   &&&&&&   &&&&&&       &&     &&  && &&  &&   &&&& ')}`);
				this.log(`  ${chalk.green('       &&  &&       && &&        &&     &&    &&&  &&    &&  ')}`);
				this.log(`  ${chalk.green(' &&&&&&&   &&       &&    &&  &&&&&&&&  &&     &&    &&&&&   ')}`);
				this.log('\n');
				this.log(chalk.white.bold('       https://www.jhipster.tech\n'));
				this.log(chalk.white('Welcome to Spring Hipster ') + chalk.yellow(`v${this.blueprintjs.version}`));
				this.log(chalk.white(`Application files will be generated in folder: ${chalk.yellow(process.cwd())}`));
				this.log(
					chalk.green(
						' _______________________________________________________________________________________________________________\n'
					)
				);
				this.log(
					chalk.white(
						` If you find Spring Hipster useful, support with a star and follow ${chalk.yellow(
							'https://github.com/vishal423/generator-jhipster-spring'
						)}`
					)
				);
				this.log(
					chalk.green(
						' _______________________________________________________________________________________________________________\n'
					)
				);
			},
		};
	}

	get prompting() {
		const defaultPhaseFromJHipster = super._prompting();
		return {
			...defaultPhaseFromJHipster,
			askForApplicationType: prompts.askForApplicationType,
			askForModuleName,
		};
	}

	get configuring() {
		return super._configuring();
	}

	get composing() {
		const jhipsterDefault = super._composing();
		return {
			...jhipsterDefault,
			askForTestOpts: prompts.askForTestOpts,
		};
	}

	get default() {
		return super._default();
	}

	get writing() {
		return super._writing();
	}

	get install() {
		return super._install();
	}

	get end() {
		return super._end();
	}
};
