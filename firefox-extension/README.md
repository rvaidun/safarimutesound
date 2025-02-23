# Firefox Sound Mute Extension

This Firefox extension allows users to mute all sounds on websites with a simple toggle option. 

## Features

- Enable or disable sound muting on websites.
- Mutes all audio elements when enabled.

## Installation

1. Download or clone the repository.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click on "Load Temporary Add-on".
4. Select the `manifest.json` file from the downloaded repository.

## Usage

1. Click on the extension icon in the toolbar.
2. A popup will appear with an option to enable or disable sound muting.
3. Toggle the option to mute or unmute sounds on the current website.

## Development

To modify the extension, you can edit the following files:

- `src/background.js`: Background script that manages the extension's state.
- `src/content.js`: Content script that interacts with web pages to mute sounds.
- `src/options.html`: User interface for the extension's options.

## License

This project is licensed under the MIT License.