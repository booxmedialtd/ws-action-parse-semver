const parseSemver = require('semver/functions/parse');

const SEMVER_PRERELEASE_BUILD_SEPARATOR = '.';

class SemanticVersion {
    constructor(fullVersion, major, minor, patch, preRelease, build) {
        this.fullVersion = String(fullVersion);
        this.major = String(major);
        this.minor = String(minor);
        this.patch = String(patch);
        this.preRelease = String(preRelease);
        this.build = String(build);
    }
}

function createSemanticVersion(parsedSemver) {
    return new SemanticVersion(
        parsedSemver.raw,
        parsedSemver.major, parsedSemver.minor, parsedSemver.patch,
        parsedSemver.prerelease.join(SEMVER_PRERELEASE_BUILD_SEPARATOR),
        parsedSemver.build.join(SEMVER_PRERELEASE_BUILD_SEPARATOR)
    );
}

// Public
function parse(semVerString) {
    const parsedSemver = parseSemver(semVerString);

    if (!parsedSemver){
        throw new Error('Error: Invalid semver string');
    }

    return createSemanticVersion(parsedSemver);
}

exports.parse = parse;
