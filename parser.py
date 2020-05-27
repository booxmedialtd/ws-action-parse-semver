import semver
import re
import os

def main(raw_string, extractor_regex = None):
    version_string = raw_string
    if extractor_regex:
        version_string = extract_semver_from_string(raw_string, extractor_regex)

    # see https://pypi.org/project/semver/
    ver = semver.VersionInfo.parse(version_string)

    print_github_action_output('major', ver.major)
    print_github_action_output('minor', ver.minor)
    print_github_action_output('patch', ver.patch)
    print_github_action_output('prerelease', ver.prerelease)
    print_github_action_output('build', ver.build)
    print_github_action_output('fullversion', version_string)

def get_input_raw_string():
    input_raw_string = os.environ.get('INPUT_INPUT_STRING')

    if not input_raw_string or not input_raw_string.strip():
        raise Exception("Missing mandatory parameter input_string")

    return input_raw_string

def get_extractor_regex():
    input_regex = os.environ.get('INPUT_VERSION_EXTRACTOR_REGEX')
    if not input_regex:
        return None

    try:
        re.compile(input_regex)
    except re.error:
        raise Exception("Invalid input version_extractor_regex: not a valid regex")

    return input_regex

def extract_semver_from_string(raw_string, regex):
    matches = re.findall(regex, raw_string)

    if 0 == len(matches):
        raise Exception("No match found for given regex")
    if 2 <= len(matches):
        raise Exception("Multiple matches found for given regex")

    return matches[0]

def print_github_action_output(name, val):
    string_val = '' if val is None else val
    print(f"::set-output name={name}::{string_val}")


if __name__ == '__main__':
    main(get_input_raw_string(), get_extractor_regex())
