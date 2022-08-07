const commonFiles = {
	global: [
		{
			templates: ['.editorconfig', '.gitignore', 'README.md'],
		},
	],
};
const sharedFiles = {
	global: [
		{
			templates: [
				{
					file: 'gitattributes',
					renameTo: () => '.gitattributes',
					method: 'copy',
				},
			],
		},
	],
};

function writeFiles() {
	this.writeFilesToDisk(commonFiles, this, false);
}

function writeMainGeneratorFiles() {
	this.writeFilesToDisk(sharedFiles, this, false, this.fetchFromInstalledJHipster('common/templates'));
}

module.exports = {
	writeFiles,
	writeMainGeneratorFiles,
};
