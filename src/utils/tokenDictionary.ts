export interface SyntaxTokenExplanation {
  token: string;
  name: string;
  description: string;
  example: string;
  usageExample: string;
  tip?: string;
}

const TOKEN_DICTIONARY: Record<string, Omit<SyntaxTokenExplanation, 'token'>> = {
  port: {
    name: 'Network Port Number',
    description: 'The TCP network port number used for ADB daemon communication over Wi-Fi or USB forwarding.',
    example: '5555',
    usageExample: 'adb tcpip 5555  (or: adb connect 192.168.1.50:5555)',
    tip: 'Port 5555 is the standard default port for ADB over Wi-Fi. Ports below 1024 require root privileges.',
  },
  host: {
    name: 'Device IP Address or Hostname',
    description: 'The local Wi-Fi IPv4 address or hostname assigned to the Android device on your local network.',
    example: '192.168.1.105',
    usageExample: 'adb connect 192.168.1.105:5555',
    tip: 'Find this in Android Settings > About Phone > Status > IP Address.',
  },
  serial: {
    name: 'Target Device Serial Number',
    description: 'The unique hardware serial number reported by USB or IP:port address when multiple devices/emulators are connected.',
    example: 'R58M40ABCD1 or emulator-5554',
    usageExample: 'adb -s R58M40ABCD1 shell',
    tip: 'Run "adb devices" or "fastboot devices" to view all connected serial numbers.',
  },
  package: {
    name: 'Application Package ID',
    description: 'The unique reverse-domain bundle identifier of the Android application defined in its AndroidManifest.xml.',
    example: 'com.whatsapp or com.android.chrome',
    usageExample: 'adb uninstall com.whatsapp  (or: adb shell pm clear com.android.chrome)',
    tip: 'To list all installed packages on your phone, execute "adb shell pm list packages".',
  },
  'package-name': {
    name: 'Application Package ID',
    description: 'The unique application package identifier (not the APK filename or app title).',
    example: 'com.spotify.music or com.instagram.android',
    usageExample: 'adb shell pm clear com.spotify.music',
    tip: 'Use "adb shell pm list packages -3" to see only 3rd-party user apps.',
  },
  'path-to-apk': {
    name: 'Local APK File Path',
    description: 'The filesystem file path to the Android application package file (.apk) on your computer.',
    example: './build/app-release.apk or C:\\Users\\Name\\app.apk',
    usageExample: 'adb install -r ./downloads/app-debug.apk',
    tip: 'You can drag and drop an .apk file directly into your terminal window to populate its full path.',
  },
  'local-path': {
    name: 'Host Computer File Path',
    description: 'The file or folder directory path on your development machine (PC/Mac/Linux).',
    example: './backup.zip or /home/user/downloads/data.db',
    usageExample: 'adb push ./my-photo.jpg /sdcard/Pictures/',
    tip: 'Relative paths (starting with ./) and absolute paths are both supported.',
  },
  'remote-path': {
    name: 'Android Device File Path',
    description: 'The destination or source filesystem path on the internal Android Linux storage.',
    example: '/sdcard/Download/ or /data/local/tmp/',
    usageExample: 'adb pull /sdcard/Download/document.pdf ./',
    tip: 'Internal shared storage is accessible at /sdcard/ or /storage/emulated/0/.',
  },
  path: {
    name: 'Target File or Directory Path',
    description: 'A file or folder path on the Android device or host machine.',
    example: '/sdcard/screenshot.png',
    usageExample: 'adb shell screencap -p /sdcard/screenshot.png',
  },
  partition: {
    name: 'Hardware Block Partition Name',
    description: 'The specific storage partition table name on the device (e.g., boot, init_boot, recovery, vbmeta, system, product).',
    example: 'boot or recovery or vbmeta',
    usageExample: 'fastboot flash boot magisk_patched.img',
    tip: 'On A/B slot devices, Fastboot automatically appends your current slot (e.g. boot_a).',
  },
  'image-file': {
    name: 'Raw Firmware Image File (.img)',
    description: 'The path on your computer to the partition disk image file (.img) to be tested or flashed.',
    example: 'boot.img or twrp-3.7.0.img or vbmeta.img',
    usageExample: 'fastboot flash boot boot.img',
    tip: 'Ensure the image matches your exact device codename to avoid bricking.',
  },
  slot: {
    name: 'Firmware Slot Selector (A/B)',
    description: 'The partition slot letter on modern seamless update devices with dual slot architecture.',
    example: 'a or b or other or all',
    usageExample: 'fastboot set_active other',
    tip: 'Run "fastboot getvar current-slot" to see which slot your device is currently booted from.',
  },
  activity: {
    name: 'Android Activity Component',
    description: 'The specific Activity class name inside the application to launch via ActivityManager (am).',
    example: '.MainActivity or com.android.settings/.Settings',
    usageExample: 'adb shell am start -n com.android.settings/.Settings',
    tip: 'Prefix with package name: <package>/<activity>.',
  },
  text: {
    name: 'Input String Text',
    description: 'The text characters to simulate typing into the currently focused input field on device.',
    example: '"Hello%sWorld"  (%s represents space)',
    usageExample: 'adb shell input text "Hello%sAndroid"',
    tip: 'Spaces should be replaced with %s when using the Android input command.',
  },
  keycode: {
    name: 'Android Hardware Keycode Number',
    description: 'The numeric keycode constant representing a physical or navigation button event.',
    example: '26 (Power) or 3 (Home) or 4 (Back) or 224 (Wakeup)',
    usageExample: 'adb shell input keyevent 26',
    tip: 'Keycode 26 toggles the power screen on/off; Keycode 3 returns to Home.',
  },
  x: {
    name: 'Horizontal Screen Coordinate',
    description: 'The horizontal pixel coordinate (X-axis) from the top-left corner of the touchscreen.',
    example: '540',
    usageExample: 'adb shell input tap 540 1200',
  },
  y: {
    name: 'Vertical Screen Coordinate',
    description: 'The vertical pixel coordinate (Y-axis) from the top-left corner of the touchscreen.',
    example: '1200',
    usageExample: 'adb shell input tap 540 1200',
  },
  density: {
    name: 'Display Pixel Density (DPI)',
    description: 'The screen pixel density in dots per inch (DPI) applied by WindowManager.',
    example: '420 or 480',
    usageExample: 'adb shell wm density 420',
    tip: 'Run "adb shell wm density reset" anytime to restore the factory default DPI.',
  },
  resolution: {
    name: 'Screen Resolution Dimensions',
    description: 'The screen display resolution in WIDTHxHEIGHT pixels.',
    example: '1080x2400',
    usageExample: 'adb shell wm size 1080x2400',
    tip: 'Run "adb shell wm size reset" to revert back to default.',
  },
  options: {
    name: 'Command Flags / Optional Arguments',
    description: 'Optional command flags that modify behavior, such as "-r" to reinstall or "-d" to allow downgrade.',
    example: '-r -g',
    usageExample: 'adb install -r -g app.apk',
  },
};

/**
 * Parses syntax and command strings to extract and explain all parameters/placeholders.
 */
export function extractSyntaxTokens(syntax: string, command: string): SyntaxTokenExplanation[] {
  const text = `${syntax} ${command}`;
  const results: SyntaxTokenExplanation[] = [];
  const seen = new Set<string>();

  // Match <token> or [token]
  const regex = /[<\[]([a-zA-Z0-9_\-:]+)[>\]]/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const rawMatch = match[0];
    const tokenKey = match[1].toLowerCase().trim();

    if (seen.has(rawMatch) || seen.has(tokenKey)) continue;
    seen.add(rawMatch);
    seen.add(tokenKey);

    // Look up directly or fuzzy match
    let entry = TOKEN_DICTIONARY[tokenKey];

    if (!entry) {
      // Check partial keys
      const keys = Object.keys(TOKEN_DICTIONARY);
      for (const k of keys) {
        if (tokenKey.includes(k)) {
          entry = TOKEN_DICTIONARY[k];
          break;
        }
      }
    }

    if (entry) {
      results.push({
        token: rawMatch,
        name: entry.name,
        description: entry.description,
        example: entry.example,
        usageExample: entry.usageExample,
        tip: entry.tip,
      });
    } else {
      // Fallback for custom parameters
      results.push({
        token: rawMatch,
        name: `${match[1].replace(/[-_]/g, ' ').toUpperCase()} Parameter`,
        description: `Replace this placeholder with your specific ${match[1].replace(/[-_]/g, ' ')} value.`,
        example: `your-${match[1]}`,
        usageExample: syntax.replace(rawMatch, `your-${match[1]}`),
      });
    }
  }

  return results;
}
