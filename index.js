const extractor = require('./src/extractor.js');
const parser = require('./src/parser.js');
const githubActionsIO = require('./src/actions_io.js');

const INPUT_INPUT_STRING = 'input_string';
const INPUT_VERSION_EXTRACTOR_REGEX = 'version_extractor_regex';

const OUTPUT_MAJOR = 'major';
const OUTPUT_MINOR = 'minor';
const OUTPUT_PATCH = 'patch';
const OUTPUT_PRE_RELEASE = 'prerelease';
const OUTPUT_BUILD = 'build';
const OUTPUT_FULL_VERSION = 'fullversion';

function runAction(getInput, writeOutput) {
    const inputString = getInput(INPUT_INPUT_STRING, true);
    const extractorRegex = getInput(INPUT_VERSION_EXTRACTOR_REGEX);

    versionString = inputString;
    if (extractorRegex) {
        versionString = extractor.extractWithRegexString(inputString, extractorRegex);
    }

    semanticVersion = parser.parse(versionString);

    writeOutput(OUTPUT_MAJOR, semanticVersion.major);
    writeOutput(OUTPUT_MINOR, semanticVersion.minor);
    writeOutput(OUTPUT_PATCH, semanticVersion.patch);
    writeOutput(OUTPUT_PRE_RELEASE, semanticVersion.preRelease);
    writeOutput(OUTPUT_BUILD, semanticVersion.build);
    writeOutput(OUTPUT_FULL_VERSION, semanticVersion.fullVersion);
}

runAction(githubActionsIO.getInput, githubActionsIO.writeOutput);