# Parse Semver

Github action that can be used parse a semantic version. It leverages nodejs [semver module](https://www.npmjs.com/package/semver) to parse 
the semver. 

## Inputs

### `input_string`

**Required** Raw input string containing or is a semantic version to be parsed

### `version_extractor_regex`

**Optional** Regex to extract semantic version from a raw input string if input string is not a semver. It is mandatory to match a single semver from the input string. 

## Outputs

### `major`

`MAJOR` part of the semver 


### `minor`

`MINOR` part of the semver 


### `patch`

`PATCH` part of the semver 


### `prerelease`

`prerelease` part of the semver 


### `build`

`build` part of the semver 


### `fullversion`

Full representation of the semver 

## Example usage

### With a extractor regex
```
 - name: Example parse semver 
   uses: booxmedialtd/ws-parse-tag@v1.0
   with:
     input_string: 'refs/tags/v1.0.4'
     version_extractor_regex: '\/v(.*)$'
```

### Without a extractor regex
```
 - name: Example parse semver 
   uses: booxmedialtd/ws-parse-tag@v1.0
   with:
     input_string: '1.0.4'
```