# Steam-HLTB
Displays HowLongToBeat times on Steam game pages whenever available. Firefox Extension


Forked from [Steam HLTB](https://addons.mozilla.org/en-US/firefox/addon/steam-hltb/)

Distinguishing features of the fork:

  - Fixed an issue where the data was shown for another game
  - Added mobile support
  - Planned development with HLTB changes


## Download & Install

<a href="https://addons.mozilla.org/en-US/firefox/addon/steam-hltb-fork/"><img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" alt='Get the Extension on Firefox' height="75"></a>

## Screenshots

<p float="left">
  <img
    src="https://github.com/user-attachments/assets/b71bc421-5b75-4a1a-9455-fdc5d581328a"
    alt="Desktop version"
    height="300"
  />
  <img
    src="https://github.com/user-attachments/assets/dfcfdd1b-766e-4f26-873d-87072d041cf6"
    alt="Mobile version"
    height="300"
  />
</p>



# For local installation: 

## Firefox:

- Download the xpi version from the [releases](https://github.com/alphaxleonidas/Steam-HLTB/releases).

- Go to `about:addons` in your browser URL.

- Click on the gear icon <img width="25" height="25" alt="image" src="https://github.com/user-attachments/assets/ca42ecea-0f72-48e5-b96a-0010135f8f63" />  and choose ` Install Add-on from file`.

- Select the xpi file. 

- The extension should work permanently. 

## Android [Firefox]

- Download the .xpi from the [Releases](https://github.com/alphaxleonidas/Steam-HLTB/releases) section.

- Enable debug menu:
  
  Open Firefox > Settings > About Firefox. Click on the Firefox logo 5 times > Enables Debug menu. 

- Disable signatures for extensions:[only needed if the file is unsigned]

  Go to a new tab. Type this in the URL: `about:config`. 

  Search `xpinstall.signatures.required` and toggle it to false. 

- Permananently Reveal Debug Menu:

  Go to settings page. Scroll down to `Secret Settings`. Enable `Keep Debug Menu revealed`.

- Install Extension:

  Go back to settings page. Scroll down and select `Install Extension from file`. Select the .xpi file. 

- Now the extension should work permanently.
