
function extractWithRegexString(inputString, regexString)
{
    const regex = new RegExp(regexString, 'g');
    matches = regex.exec(inputString);

    if (null === matches) {
        throw new Error("Error: No regex match found");
    }
    if (2 < matches.length) {
        throw new Error("Error: Multiple regex matches found");
    }

    return matches[1];
}

exports.extractWithRegexString = extractWithRegexString;

