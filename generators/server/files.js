const { GRADLE } = require('generator-jhipster/jdl/jhipster/build-tool-types');
const constants = require('generator-jhipster/generators/generator-constants');

const serverFiles = {
	global: [
		{
			path: constants.SERVER_MAIN_RES_DIR,
			templates: ['banner.txt'],
		},
	],
	gradle: [
		{
			condition: generator => generator.buildTool === GRADLE,
			templates: [
				'build.gradle',
				'settings.gradle',
				'gradle.properties',
				{ file: 'gradlew', method: 'copy', noEjs: true },
				{ file: 'gradlew.bat', method: 'copy', noEjs: true },
				{ file: 'gradle/wrapper/gradle-wrapper.jar', method: 'copy', noEjs: true },
				'gradle/wrapper/gradle-wrapper.properties',
			],
		},
	],
	resources: [
		{
			path: constants.SERVER_MAIN_RES_DIR,
			templates: ['application.yml'],
		},
	],
	sources: [
		{
			path: constants.SERVER_MAIN_SRC_DIR,
			templates: [
				{
					file: 'package/MainApplication.java',
					renameTo: generator => `${generator.packageFolder}/${generator.javaMainClass}.java`,
				},
			],
		},
	],
};

function writeFiles() {
	this.writeFilesToDisk(serverFiles, this, false);
}

module.exports = {
	writeFiles,
};
