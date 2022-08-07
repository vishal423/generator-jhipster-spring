const path = require('path');

const askForModuleName = function askForModuleName() {
	if (this.jhipsterConfig.baseName) return undefined;

	const defaultApplicationName = /^[a-zA-Z]+([_\- ]?[a-zA-Z\d]+)*$/.test(path.basename(process.cwd()))
		? path.basename(process.cwd())
		: 'SpringHipsterDemo';
	return this.prompt({
		type: 'input',
		name: 'baseName',
		validate: input => {
			if (!/^[a-zA-Z]+([_\- ]?[a-zA-Z\d]+)*$/.test(input)) {
				return 'The application name cannot contain special characters.';
			}
			return true;
		},
		message: 'What is the application name?',
		default: defaultApplicationName,
	}).then(answers => {
		this.baseName = this.jhipsterConfig.baseName = answers.baseName;
	});
};

module.exports = { askForModuleName };
