const { CAFFEINE } = require('generator-jhipster/jdl/jhipster/cache-types');
const { NO: NO_CACHE } = require('generator-jhipster/jdl/jhipster/cache-types');
const { NO: NO_DATABASE } = require('generator-jhipster/jdl/jhipster/database-types');
const { SESSION } = require('generator-jhipster/jdl/jhipster/authentication-types');
const { GRADLE } = require('generator-jhipster/jdl/jhipster/build-tool-types');
const { OptionNames } = require('generator-jhipster/jdl/jhipster/application-options');

const { AUTHENTICATION_TYPE, BUILD_TOOL, CACHE_PROVIDER, DATABASE_TYPE, PACKAGE_NAME, SERVER_PORT } = OptionNames;

module.exports = {
	askForServerSideOpts,
	askForOptionalItems,
};

function askForServerSideOpts() {
	if (this.existingProject) return undefined;

	const defaultArtifactName = this.jhipsterConfig.baseName.trim().toLowerCase().replace(' ', '-').replace('_', '');

	const prompts = [
		{
			type: 'input',
			name: 'groupName',
			validate: input =>
				/^([a-z][a-z\d]*(\.[a-z][a-z\d]*)*)$/.test(input) ? true : 'The application group name is not valid.',
			message: 'What is the application group name?',
			default: 'com.example',
			store: true,
		},
		{
			type: 'input',
			name: 'artifactName',
			validate: input =>
				/^[a-zA-Z]+([_\- ]?[a-zA-Z\d]+)*$/.test(input) ? true : 'The application artifact name is not valid.',
			message: 'What is the application artifact name?',
			default: defaultArtifactName,
			store: true,
		},
		{
			type: 'input',
			name: 'description',
			message: 'What is the application description?',
			default: `Spring Hipster application for ${this.jhipsterConfig.baseName}`,
			store: true,
		},
		{
			type: 'input',
			name: PACKAGE_NAME,
			validate: input =>
				/^([a-z](\.?[a-z\d]+)*)$/.test(input) ? true : 'The application base package name is not valid.',
			message: 'What is the application base package?',
			default: answers => {
				return `${answers.groupName}.${defaultArtifactName.toLowerCase().replace('-', '')}`;
			},
			store: true,
		},
		{
			type: 'input',
			name: SERVER_PORT,
			validate: input => (/^[1-9]+\d+$/.test(input) ? true : 'The port number is not valid.'),
			message: 'On which port number do you want to run the application?',
			default: 8080,
			store: true,
		},
		{
			type: 'list',
			name: AUTHENTICATION_TYPE,
			message: `Choose an authentication type to secure the application.`,
			choices: () => {
				return [
					{
						value: SESSION,
						name: 'HTTP session authentication',
					},
				];
			},
			default: SESSION,
		},
		{
			type: 'list',
			name: DATABASE_TYPE,
			message: `Choose database type to store the service data.`,
			choices: () => {
				return [
					{
						value: 'PostgreSQL',
						name: 'PostgreSQL',
					},
					{
						value: NO_DATABASE,
						name: 'No Database',
					},
				];
			},
			default: 'PostgreSQL',
		},
		{
			type: 'list',
			name: CACHE_PROVIDER,
			message: 'Choose a cache implementation.',
			choices: [
				{
					value: CAFFEINE,
					name: 'Caffeine',
				},
				{
					value: NO_CACHE,
					name: 'No Cache',
				},
			],
			default: CAFFEINE,
		},
		{
			when: answers => answers.cacheProvider !== NO_CACHE,
			type: 'confirm',
			name: 'enableHibernateCache',
			message: 'Do you want to use Hibernate 2nd level cache?',
			default: 'true',
		},
		{
			type: 'list',
			name: BUILD_TOOL,
			message: 'Choose a build tool.',
			choices: [
				{
					value: GRADLE,
					name: 'Gradle',
				},
			],
			default: GRADLE,
		},
	];

	return this.prompt(prompts).then(answers => {
		this.artifactName = this.blueprintConfig.artifactName = answers.artifactName;
		this.groupName = this.blueprintConfig.groupName = answers.groupName;
		this.description = this.blueprintConfig.description = answers.description;

		this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType = answers.serviceDiscoveryType;
		this.reactive = this.jhipsterConfig.reactive = false;
		this.authenticationType = this.jhipsterConfig.authenticationType = answers.authenticationType;

		this.packageName = this.jhipsterConfig.packageName = answers.packageName;
		this.serverPort = this.jhipsterConfig.serverPort = answers.serverPort || '8080';
		this.cacheProvider = this.jhipsterConfig.cacheProvider = answers.cacheProvider || NO_CACHE;
		this.enableHibernateCache = this.jhipsterConfig.enableHibernateCache = !!answers.enableHibernateCache;

		const { databaseType } = answers;
		this.databaseType = this.jhipsterConfig.databaseType = databaseType || NO_DATABASE;
		this.devDatabaseType = this.jhipsterConfig.devDatabaseType = answers.devDatabaseType || databaseType;
		this.prodDatabaseType = this.jhipsterConfig.prodDatabaseType = answers.prodDatabaseType || databaseType;

		this.searchEngine = this.jhipsterConfig.searchEngine = answers.searchEngine;
		this.buildTool = this.jhipsterConfig.buildTool = answers.buildTool;
		this.enableGradleEnterprise = this.jhipsterConfig.enableGradleEnterprise = answers.enableGradleEnterprise;
		this.gradleEnterpriseHost = this.jhipsterConfig.gradleEnterpriseHost = answers.gradleEnterpriseHost;
	});
}

function askForOptionalItems() {
	if (this.existingProject) return undefined;

	const choices = [];
	const defaultChoice = [];

	const PROMPTS = {
		type: 'checkbox',
		name: 'serverSideOptions',
		message: 'Choose additional technologies',
		choices,
		default: defaultChoice,
	};

	if (choices.length > 0) {
		return this.prompt(PROMPTS).then(answers => {
			this.serverSideOptions = this.jhipsterConfig.serverSideOptions = answers.serverSideOptions;
			this.websocket = this.jhipsterConfig.websocket = this.getOptionFromArray(
				answers.serverSideOptions,
				'websocket'
			);
			this.searchEngine = this.jhipsterConfig.searchEngine = this.getOptionFromArray(
				answers.serverSideOptions,
				'searchEngine'
			);
			this.messageBroker = this.jhipsterConfig.messageBroker = this.getOptionFromArray(
				answers.serverSideOptions,
				'messageBroker'
			);
			this.enableSwaggerCodegen = this.jhipsterConfig.enableSwaggerCodegen = this.getOptionFromArray(
				answers.serverSideOptions,
				'enableSwaggerCodegen'
			);
			// Only set this option if it hasn't been set in a previous question, as it's only optional for monoliths
			if (!this.jhipsterConfig.serviceDiscoveryType) {
				this.serviceDiscoveryType = this.jhipsterConfig.serviceDiscoveryType = this.getOptionFromArray(
					answers.serverSideOptions,
					'serviceDiscoveryType'
				);
			}
		});
	}
	return undefined;
}
