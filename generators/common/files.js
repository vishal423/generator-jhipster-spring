const commonFiles = {
	global: [
		{
			templates: ['README.md', 'sonar-project.properties'],
		},
	],
};

function writeCommonFiles() {
	this.writeFilesToDisk(commonFiles, this, false);
}

module.exports = {
	writeCommonFiles,
};
