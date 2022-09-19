module.exports = {
	askForApplicationType,
	//	askForTestOpts,
};

async function askForApplicationType() {
	if (this.existingProject) return;

	const applicationTypeChoices = [
		{
			value: 'monolith',
			name: 'Monolithic application',
		},
	];

	const answers = await this.prompt([
		{
			type: 'list',
			name: 'applicationType',
			message: `Choose an application type.`,
			choices: applicationTypeChoices,
			default: 'monolith',
		},
	]);

	this.applicationType = this.jhipsterConfig.applicationType = answers.applicationType;
}

// async function askForTestOpts() {
//	if (this.existingProject) return;
//
//	const choices = [];
//	const defaultChoice = [];
//
//	if (!this.skipServer) {
//		choices.push({ name: 'Gatling', value: 'gatling' });
//	}
//
//	const PROMPT = {
//		type: 'checkbox',
//		name: 'testFrameworks',
//		message: 'Choose additional testing frameworks to use in the application.',
//		choices,
//		default: defaultChoice,
//	};
//
//	const answers = choices.length ? await this.prompt(PROMPT) : { testFrameworks: [] };
//
//	this.testFrameworks = this.jhipsterConfig.testFrameworks = answers.testFrameworks;
// }
