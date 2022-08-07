module.exports = {
	askForClient,
};

async function askForClient() {
	if (this.existingProject) return;

	const choices = [
		{
			value: 'no',
			name: 'No Client',
		},
	];

	const answers = await this.prompt({
		type: 'list',
		name: 'clientFramework',
		message: `Choose a client framework.`,
		choices,
		default: 'no',
	});

	this.clientFramework = this.jhipsterConfig.clientFramework = answers.clientFramework;
	if (this.clientFramework === 'no') {
		this.skipClient = this.jhipsterConfig.skipClient = true;
	}
}
