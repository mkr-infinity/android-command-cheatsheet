import type { CommandItem } from './types';

export const adbCommands: CommandItem[] = [
  // --- Device & Connection ---
  {
    id: 'devices',
    tool: 'adb',
    command: 'adb devices',
    title: 'List connected devices',
    description: 'Queries the ADB server and displays all detected Android devices and emulators along with their connection state.',
    category: 'Device & Connection',
    syntax: 'adb devices [-l]',
    examples: [
      'adb devices',
      'adb devices -l'
    ],
    options: [
      { flag: '-l', description: 'Long listing mode; prints product, model, device name, and USB transport ID.' }
    ],
    requirements: ['ADB installed in PATH', 'USB debugging enabled on target device', 'Authorized computer RSA key'],
    risk: 'safe',
    tags: ['device', 'connection', 'status', 'list', 'usb', 'detect'],
    aliases: ['list devices', 'connected devices', 'show phones', 'check adb'],
    related: ['devices-long', 'connect', 'disconnect', 'get-state']
  },
  {
    id: 'devices-long',
    tool: 'adb',
    command: 'adb devices -l',
    title: 'List devices with hardware details',
    description: 'Outputs all connected devices including their hardware product code, device codename, marketing model, and transport ID.',
    category: 'Device & Connection',
    syntax: 'adb devices -l',
    examples: [
      'adb devices -l'
    ],
    options: [
      { flag: '-l', description: 'Enable verbose hardware identifier output.' }
    ],
    requirements: ['ADB installed', 'USB debugging enabled'],
    risk: 'safe',
    tags: ['device', 'hardware', 'model', 'verbose', 'serial'],
    aliases: ['device model', 'device info', 'hardware codename'],
    related: ['devices', 'getprop-model']
  },
  {
    id: 'connect',
    tool: 'adb',
    command: 'adb connect <ip>:<port>',
    title: 'Connect over Wi-Fi / TCP',
    description: 'Establishes a wireless ADB connection to an Android device over TCP/IP using its IP address and listening port (default 5555).',
    category: 'Device & Connection',
    syntax: 'adb connect <host>[:<port>]',
    examples: [
      'adb connect 192.168.1.105:5555',
      'adb connect 10.0.0.42'
    ],
    options: [
      { flag: '<port>', description: 'Port number opened by adb tcpip (defaults to 5555).' }
    ],
    requirements: ['Device and host on same Wi-Fi network', 'ADB TCP mode enabled via adb tcpip 5555 or Android 11+ Wireless Debugging'],
    risk: 'safe',
    tags: ['network', 'wireless', 'wifi', 'tcp', 'connect'],
    aliases: ['wireless adb', 'connect wifi', 'remote adb'],
    related: ['disconnect', 'tcpip', 'pair']
  },
  {
    id: 'disconnect',
    tool: 'adb',
    command: 'adb disconnect [ip:port]',
    title: 'Disconnect wireless device',
    description: 'Terminates an active TCP/IP wireless ADB connection to a specific device, or disconnects all TCP devices if no address is supplied.',
    category: 'Device & Connection',
    syntax: 'adb disconnect [<host>[:<port>]]',
    examples: [
      'adb disconnect 192.168.1.105:5555',
      'adb disconnect'
    ],
    options: [
      { flag: '[host:port]', description: 'Specific target address to drop. If omitted, all wireless sessions are severed.' }
    ],
    requirements: ['Active wireless connection'],
    risk: 'safe',
    tags: ['wireless', 'wifi', 'disconnect', 'drop'],
    aliases: ['close wireless', 'unpair wifi'],
    related: ['connect', 'tcpip']
  },
  {
    id: 'pair',
    tool: 'adb',
    command: 'adb pair <ip>:<port> [pairing_code]',
    title: 'Pair wireless debugging (Android 11+)',
    description: 'Pairs a computer with an Android 11+ device using TLS authentication and a 6-digit one-time pairing code from Developer Options.',
    category: 'Device & Connection',
    syntax: 'adb pair <host>:<port> [code]',
    examples: [
      'adb pair 192.168.1.105:37129 849201',
      'adb pair 192.168.1.105:41255'
    ],
    options: [
      { flag: '[code]', description: '6-digit Wi-Fi pairing code displayed on Android screen. Prompts if omitted.' }
    ],
    requirements: ['Android 11 or higher', 'Wireless debugging enabled', 'Same local network'],
    risk: 'safe',
    tags: ['pair', 'wireless', 'tls', 'android 11', 'security'],
    aliases: ['pair wifi', 'wireless pair', 'tls pair'],
    related: ['connect', 'tcpip']
  },
  {
    id: 'wait-for-device',
    tool: 'adb',
    command: 'adb wait-for-device',
    title: 'Wait for device ready state',
    description: 'Blocks command execution until the connected device is fully booted and accepted by the ADB daemon. Essential for automation and CI/CD pipelines.',
    category: 'Device & Connection',
    syntax: 'adb wait-for-device',
    examples: [
      'adb wait-for-device',
      'adb wait-for-device shell getprop sys.boot_completed'
    ],
    options: [],
    requirements: ['Device plugged in or booting'],
    risk: 'safe',
    tags: ['automation', 'scripting', 'wait', 'boot'],
    aliases: ['block until ready', 'wait device'],
    related: ['devices', 'get-state']
  },
  {
    id: 'get-state',
    tool: 'adb',
    command: 'adb get-state',
    title: 'Print device state',
    description: 'Returns the current low-level ADB transport status of the connected device: offline, bootloader, or device.',
    category: 'Device & Connection',
    syntax: 'adb get-state',
    examples: [
      'adb get-state'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['status', 'state', 'offline', 'bootloader'],
    aliases: ['check state', 'is device connected'],
    related: ['devices', 'get-serialno']
  },
  {
    id: 'get-serialno',
    tool: 'adb',
    command: 'adb get-serialno',
    title: 'Print device hardware serial',
    description: 'Outputs the unique hardware serial number assigned to the connected Android device.',
    category: 'Device & Connection',
    syntax: 'adb get-serialno',
    examples: [
      'adb get-serialno'
    ],
    options: [],
    requirements: ['Device connected and authorized'],
    risk: 'safe',
    tags: ['serial', 'hardware', 'id', 'uuid'],
    aliases: ['serial number', 'device serial'],
    related: ['devices', 'getprop-model']
  },
  {
    id: 'start-server',
    tool: 'adb',
    command: 'adb start-server',
    title: 'Start local ADB background server',
    description: 'Launches the local ADB host background server on localhost port 5037 if it is not already running.',
    category: 'Device & Connection',
    syntax: 'adb start-server',
    examples: [
      'adb start-server'
    ],
    options: [],
    requirements: ['Host machine with ADB'],
    risk: 'safe',
    tags: ['server', 'daemon', 'host', 'start'],
    aliases: ['launch adb', 'run adb daemon'],
    related: ['kill-server']
  },
  {
    id: 'kill-server',
    tool: 'adb',
    command: 'adb kill-server',
    title: 'Terminate ADB background server',
    description: 'Kills the local ADB background daemon process. Resolves hung connections, unresponsive states, and stuck USB ports.',
    category: 'Device & Connection',
    syntax: 'adb kill-server',
    examples: [
      'adb kill-server'
    ],
    options: [],
    requirements: ['Host machine with ADB'],
    risk: 'safe',
    tags: ['server', 'restart', 'kill', 'reset', 'troubleshoot'],
    aliases: ['reset adb', 'restart adb daemon', 'fix adb not responding'],
    related: ['start-server', 'devices']
  },

  // --- App Management ---
  {
    id: 'install-apk',
    tool: 'adb',
    command: 'adb install <path_to_apk>',
    title: 'Install Android application package (APK)',
    description: 'Pushes an APK file to the device and invokes the package manager to install it.',
    category: 'App Management',
    syntax: 'adb install [-r] [-d] [-g] [-t] <file.apk>',
    examples: [
      'adb install app-release.apk',
      'adb install -r -g app-debug.apk',
      'adb install -d old-version.apk'
    ],
    options: [
      { flag: '-r', description: 'Reinstall existing app, retaining its data and cache.' },
      { flag: '-d', description: 'Allow version code downgrade.' },
      { flag: '-g', description: 'Grant all runtime permissions listed in app manifest automatically.' },
      { flag: '-t', description: 'Allow installing test packages marked android:testOnly.' }
    ],
    requirements: ['Device authorized', 'Unknown sources / debugging installation permitted'],
    risk: 'safe',
    tags: ['install', 'apk', 'app', 'package', 'deploy'],
    aliases: ['install app', 'load apk', 'sideload apk', 'push app'],
    related: ['uninstall-app', 'install-multiple', 'pm-list-packages']
  },
  {
    id: 'install-multiple',
    tool: 'adb',
    command: 'adb install-multiple <apk1> <apk2> ...',
    title: 'Install split APKs / App Bundles (AAB)',
    description: 'Installs multi-split APK packages (base.apk plus config and density splits) in a single atomic atomic session.',
    category: 'App Management',
    syntax: 'adb install-multiple [-r] <base.apk> <split1.apk> <split2.apk>',
    examples: [
      'adb install-multiple base.apk split_config.arm64_v8a.apk split_config.xxhdpi.apk'
    ],
    options: [
      { flag: '-r', description: 'Replace existing application.' }
    ],
    requirements: ['Split APK files extracted from bundle'],
    risk: 'safe',
    tags: ['bundle', 'split apk', 'aab', 'install'],
    aliases: ['install split', 'install app bundle', 'multi apk'],
    related: ['install-apk', 'uninstall-app']
  },
  {
    id: 'uninstall-app',
    tool: 'adb',
    command: 'adb uninstall <package_name>',
    title: 'Uninstall application',
    description: 'Removes the installed application package and deletes its private data directories from /data/data.',
    category: 'App Management',
    syntax: 'adb uninstall [-k] <package_name>',
    examples: [
      'adb uninstall com.example.myapp',
      'adb uninstall -k com.example.myapp'
    ],
    options: [
      { flag: '-k', description: 'Keep the application data and cache directories after package removal.' }
    ],
    requirements: ['Device connected and authorized'],
    risk: 'caution',
    riskExplanation: 'Removes the application and permanently deletes user data unless the -k flag is specified.',
    tags: ['uninstall', 'remove', 'delete app', 'purge'],
    aliases: ['delete app', 'remove package', 'uninstall apk'],
    related: ['install-apk', 'pm-clear']
  },
  {
    id: 'pm-list-packages',
    tool: 'adb',
    command: 'adb shell pm list packages',
    title: 'List installed application packages',
    description: 'Queries the Package Manager service and prints the complete list of package names installed on the system.',
    category: 'App Management',
    syntax: 'adb shell pm list packages [-3] [-s] [-d] [-e] [-f] [filter]',
    examples: [
      'adb shell pm list packages',
      'adb shell pm list packages -3',
      'adb shell pm list packages -s',
      'adb shell pm list packages | grep google'
    ],
    options: [
      { flag: '-3', description: 'Show third-party (user-installed) packages only.' },
      { flag: '-s', description: 'Show system packages only.' },
      { flag: '-d', description: 'Filter only disabled packages.' },
      { flag: '-e', description: 'Filter only enabled packages.' },
      { flag: '-f', description: 'Print the associated APK path along with package name.' }
    ],
    requirements: ['Device connected and authorized'],
    risk: 'safe',
    tags: ['packages', 'apps', 'list', 'filter', 'pm'],
    aliases: ['list apps', 'show installed packages', 'find package'],
    related: ['pm-path', 'pm-clear', 'install-apk']
  },
  {
    id: 'pm-path',
    tool: 'adb',
    command: 'adb shell pm path <package_name>',
    title: 'Get filesystem APK path of an app',
    description: 'Prints the physical filesystem path where the base APK and splits for the specified package are stored on the Android filesystem.',
    category: 'App Management',
    syntax: 'adb shell pm path <package_name>',
    examples: [
      'adb shell pm path com.google.android.youtube',
      'adb shell pm path com.android.chrome'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['path', 'extract', 'backup', 'apk location'],
    aliases: ['apk location', 'where is apk', 'find apk file'],
    related: ['pm-list-packages', 'pull']
  },
  {
    id: 'pm-clear',
    tool: 'adb',
    command: 'adb shell pm clear <package_name>',
    title: 'Clear app data and cache',
    description: 'Clears all user data, database records, shared preferences, and cache files associated with a package, resetting it to factory fresh install state.',
    category: 'App Management',
    syntax: 'adb shell pm clear <package_name>',
    examples: [
      'adb shell pm clear com.example.myapp',
      'adb shell pm clear com.android.browser'
    ],
    options: [],
    requirements: ['Device connected and authorized'],
    risk: 'caution',
    riskExplanation: 'Instantly wipes all user accounts, local databases, logins, and configurations stored by the application.',
    tags: ['clear', 'reset', 'cache', 'wipe', 'data'],
    aliases: ['reset app', 'clear app data', 'wipe app', 'delete app cache'],
    related: ['uninstall-app', 'am-force-stop']
  },
  {
    id: 'pm-disable',
    tool: 'adb',
    command: 'adb shell pm disable-user --user 0 <package_name>',
    title: 'Disable / debloat system app for current user',
    description: 'Disables a pre-installed carrier or OEM bloatware app for the primary user without requiring root privileges.',
    category: 'App Management',
    syntax: 'adb shell pm disable-user --user 0 <package_name>',
    examples: [
      'adb shell pm disable-user --user 0 com.facebook.katana',
      'adb shell pm disable-user --user 0 com.sec.android.app.sbrowser'
    ],
    options: [
      { flag: '--user 0', description: 'Targets user 0 (the primary owner profile).' }
    ],
    requirements: ['Device connected and authorized'],
    risk: 'caution',
    riskExplanation: 'Disabling critical core Android system apps (e.g. system UI or framework) can cause reboot loops.',
    tags: ['debloat', 'disable', 'freeze', 'system apps', 'carrier'],
    aliases: ['debloat android', 'disable bloatware', 'freeze app'],
    related: ['pm-enable', 'pm-list-packages']
  },
  {
    id: 'pm-enable',
    tool: 'adb',
    command: 'adb shell pm enable <package_name>',
    title: 'Re-enable previously disabled app',
    description: 'Re-activates a frozen or disabled application package, restoring its launcher icon and background services.',
    category: 'App Management',
    syntax: 'adb shell pm enable <package_name>',
    examples: [
      'adb shell pm enable com.facebook.katana'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['enable', 'unfreeze', 'restore app'],
    aliases: ['unfreeze app', 'restore disabled app'],
    related: ['pm-disable', 'pm-list-packages']
  },

  // --- Files & Storage ---
  {
    id: 'push',
    tool: 'adb',
    command: 'adb push <local_path> <remote_path>',
    title: 'Copy file from computer to device',
    description: 'Transfers a file or folder from the host development machine to a specified path on the Android filesystem.',
    category: 'Files & Storage',
    syntax: 'adb push [--sync] <local>... <remote>',
    examples: [
      'adb push update.zip /sdcard/',
      'adb push config.json /data/local/tmp/',
      'adb push photos/ /sdcard/DCIM/'
    ],
    options: [
      { flag: '--sync', description: 'Only push files that are newer or missing on the target device.' }
    ],
    requirements: ['Write permissions at remote destination (e.g. /sdcard/ or /data/local/tmp/)'],
    risk: 'safe',
    tags: ['push', 'upload', 'transfer', 'copy', 'file'],
    aliases: ['upload file', 'send file to phone', 'copy to android'],
    related: ['pull', 'shell-ls']
  },
  {
    id: 'pull',
    tool: 'adb',
    command: 'adb pull <remote_path> [local_path]',
    title: 'Copy file from device to computer',
    description: 'Downloads a file or directory tree from the Android device to the specified local directory on the host computer.',
    category: 'Files & Storage',
    syntax: 'adb pull [-a] <remote>... [<local>]',
    examples: [
      'adb pull /sdcard/screenshot.png .',
      'adb pull /sdcard/DCIM/Camera/ ./photos/',
      'adb pull /data/anr/traces.txt traces.txt'
    ],
    options: [
      { flag: '-a', description: 'Preserve file timestamp and mode permissions.' }
    ],
    requirements: ['Read permission on the remote file/directory'],
    risk: 'safe',
    tags: ['pull', 'download', 'fetch', 'extract', 'backup'],
    aliases: ['download file', 'get file from phone', 'copy from android'],
    related: ['push', 'screencap-file']
  },
  {
    id: 'shell-ls',
    tool: 'adb',
    command: 'adb shell ls -la <path>',
    title: 'List files and permissions in directory',
    description: 'Lists all files, hidden items, owner permissions, SELinux contexts, and timestamps inside an Android directory.',
    category: 'Files & Storage',
    syntax: 'adb shell ls -la [path]',
    examples: [
      'adb shell ls -la /sdcard/',
      'adb shell ls -la /data/local/tmp/'
    ],
    options: [
      { flag: '-l', description: 'Long listing format.' },
      { flag: '-a', description: 'Show all files including hidden entries starting with dot.' }
    ],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['files', 'directory', 'list', 'storage', 'ls'],
    aliases: ['dir', 'list folder', 'browse storage'],
    related: ['push', 'pull', 'shell-df']
  },
  {
    id: 'shell-rm',
    tool: 'adb',
    command: 'adb shell rm -rf <path>',
    title: 'Delete files or directory recursively',
    description: 'Deletes a file or directory tree from the Android storage volume.',
    category: 'Files & Storage',
    syntax: 'adb shell rm [-r] [-f] <path>',
    examples: [
      'adb shell rm /sdcard/test.txt',
      'adb shell rm -rf /data/local/tmp/test_dir'
    ],
    options: [
      { flag: '-r', description: 'Recursive deletion for directories.' },
      { flag: '-f', description: 'Force removal without prompting.' }
    ],
    requirements: ['Write permissions on parent directory'],
    risk: 'destructive',
    riskExplanation: 'Permanently deletes files with no recycle bin or recovery option.',
    tags: ['delete', 'remove', 'rm', 'purge', 'storage'],
    aliases: ['delete file', 'remove folder', 'erase files'],
    related: ['push', 'shell-ls']
  },
  {
    id: 'shell-df',
    tool: 'adb',
    command: 'adb shell df -h',
    title: 'Show disk space usage by partition',
    description: 'Displays storage statistics, free space, and mount points across all mounted Android filesystem partitions in human-readable units.',
    category: 'Files & Storage',
    syntax: 'adb shell df -h',
    examples: [
      'adb shell df -h',
      'adb shell df -h /data'
    ],
    options: [
      { flag: '-h', description: 'Human-readable formatting (MB/GB).' }
    ],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['storage', 'disk', 'space', 'partitions', 'memory'],
    aliases: ['free space', 'check storage', 'disk usage'],
    related: ['shell-ls']
  },

  // --- Shell ---
  {
    id: 'shell-interactive',
    tool: 'adb',
    command: 'adb shell',
    title: 'Open interactive remote Linux shell',
    description: 'Launches an interactive pseudo-terminal shell session directly on the target Android operating system.',
    category: 'Shell',
    syntax: 'adb shell',
    examples: [
      'adb shell'
    ],
    options: [],
    requirements: ['Device connected and authorized'],
    risk: 'safe',
    tags: ['shell', 'terminal', 'bash', 'sh', 'interactive'],
    aliases: ['enter phone shell', 'terminal login', 'adb bash'],
    related: ['shell-getprop', 'shell-whoami']
  },
  {
    id: 'shell-getprop',
    tool: 'adb',
    command: 'adb shell getprop [key]',
    title: 'Read Android system build properties',
    description: 'Reads Android runtime properties from the system property store, or dumps all system properties if no key is provided.',
    category: 'Shell',
    syntax: 'adb shell getprop [<property_key>]',
    examples: [
      'adb shell getprop',
      'adb shell getprop ro.build.version.release',
      'adb shell getprop ro.product.model',
      'adb shell getprop ro.build.fingerprint'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['properties', 'version', 'model', 'system info', 'config'],
    aliases: ['android version', 'system property', 'device codename'],
    related: ['shell-setprop', 'devices-long']
  },
  {
    id: 'shell-setprop',
    tool: 'adb',
    command: 'adb shell setprop <key> <value>',
    title: 'Set Android system property',
    description: 'Sets a runtime system property in the Android init environment. Useful for testing debug flags, mock sensors, and developer parameters.',
    category: 'Shell',
    syntax: 'adb shell setprop <key> <value>',
    examples: [
      'adb shell setprop debug.layout true',
      'adb shell setprop log.tag.MyApp DEBUG'
    ],
    options: [],
    requirements: ['Device connected', 'May require root or shell permissions depending on property namespace'],
    risk: 'caution',
    riskExplanation: 'Changing sensitive system properties can trigger visual bugs or crash subsystem services until reboot.',
    tags: ['property', 'debug', 'system', 'configure'],
    aliases: ['change property', 'toggle debug flag'],
    related: ['shell-getprop']
  },
  {
    id: 'shell-whoami',
    tool: 'adb',
    command: 'adb shell whoami',
    title: 'Print active shell user UID / role',
    description: 'Displays the user ID name running the current ADB shell process (e.g. shell, root, or u0_a...).',
    category: 'Shell',
    syntax: 'adb shell whoami',
    examples: [
      'adb shell whoami'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['user', 'uid', 'root', 'security', 'role'],
    aliases: ['check root', 'current user'],
    related: ['root', 'shell-interactive']
  },

  // --- Debugging ---
  {
    id: 'am-start',
    tool: 'adb',
    command: 'adb shell am start -n <package>/<activity>',
    title: 'Launch an activity component',
    description: 'Uses Activity Manager to launch an explicit Android activity by its full package and component name.',
    category: 'Debugging',
    syntax: 'adb shell am start -n <package>/<activity_component>',
    examples: [
      'adb shell am start -n com.example.myapp/.MainActivity',
      'adb shell am start -n com.google.android.youtube/com.google.android.apps.youtube.app.WatchWhileActivity'
    ],
    options: [
      { flag: '-W', description: 'Wait for launch to complete and report performance timing.' },
      { flag: '-S', description: 'Force stop the target app before starting activity.' }
    ],
    requirements: ['App package installed'],
    risk: 'safe',
    tags: ['activity', 'launch', 'run app', 'intent', 'am'],
    aliases: ['start app', 'open activity', 'launch screen'],
    related: ['am-start-url', 'am-force-stop']
  },
  {
    id: 'am-start-url',
    tool: 'adb',
    command: 'adb shell am start -a android.intent.action.VIEW -d <url>',
    title: 'Open URL / Deep link in browser or app',
    description: 'Dispatches an implicit VIEW intent to test deep links, universal links, or open a web page in the default web browser.',
    category: 'Debugging',
    syntax: 'adb shell am start -a android.intent.action.VIEW -d <url>',
    examples: [
      'adb shell am start -a android.intent.action.VIEW -d "https://github.com"',
      'adb shell am start -a android.intent.action.VIEW -d "myapp://checkout?id=492"'
    ],
    options: [
      { flag: '-a', description: 'Specify the Intent action string.' },
      { flag: '-d', description: 'Specify data URI.' }
    ],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['deeplink', 'url', 'browser', 'intent', 'test'],
    aliases: ['test deep link', 'open web page', 'test intent'],
    related: ['am-start']
  },
  {
    id: 'am-force-stop',
    tool: 'adb',
    command: 'adb shell am force-stop <package_name>',
    title: 'Force stop running application',
    description: 'Terminates all processes, background services, alarms, and notifications associated with the specified package immediately.',
    category: 'Debugging',
    syntax: 'adb shell am force-stop <package_name>',
    examples: [
      'adb shell am force-stop com.example.myapp',
      'adb shell am force-stop com.android.chrome'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['kill', 'stop', 'terminate', 'quit', 'am'],
    aliases: ['kill app', 'close app', 'terminate process'],
    related: ['am-start', 'pm-clear']
  },
  {
    id: 'input-keyevent',
    tool: 'adb',
    command: 'adb shell input keyevent <keycode>',
    title: 'Simulate physical hardware key press',
    description: 'Sends a simulated hardware key code event to the device window manager (e.g. Home, Back, Power, Volume).',
    category: 'Debugging',
    syntax: 'adb shell input keyevent <keycode_number_or_name>',
    examples: [
      'adb shell input keyevent 3',
      'adb shell input keyevent 4',
      'adb shell input keyevent 26',
      'adb shell input keyevent 82'
    ],
    options: [
      { flag: '3', description: 'KEYCODE_HOME' },
      { flag: '4', description: 'KEYCODE_BACK' },
      { flag: '26', description: 'KEYCODE_POWER' },
      { flag: '66', description: 'KEYCODE_ENTER' },
      { flag: '82', description: 'KEYCODE_MENU' }
    ],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['input', 'key', 'home', 'back', 'power', 'simulate'],
    aliases: ['press home', 'press back', 'turn off screen', 'simulate button'],
    related: ['input-text', 'input-tap']
  },
  {
    id: 'input-text',
    tool: 'adb',
    command: 'adb shell input text <string>',
    title: 'Type text into active input field',
    description: 'Types a sequence of characters into whichever text input or edit field currently has focus on the Android screen.',
    category: 'Debugging',
    syntax: 'adb shell input text <string>',
    examples: [
      'adb shell input text "HelloWorld"',
      'adb shell input text "secret_password123"'
    ],
    options: [],
    requirements: ['Input field must be focused on screen'],
    risk: 'safe',
    tags: ['input', 'keyboard', 'type', 'automation'],
    aliases: ['type text', 'paste password', 'send keystrokes'],
    related: ['input-tap', 'input-keyevent']
  },
  {
    id: 'input-tap',
    tool: 'adb',
    command: 'adb shell input tap <x> <y>',
    title: 'Simulate screen touch at coordinates',
    description: 'Simulates a finger tap event at the specified pixel coordinates (X, Y) on the display.',
    category: 'Debugging',
    syntax: 'adb shell input tap <x_coord> <y_coord>',
    examples: [
      'adb shell input tap 540 960',
      'adb shell input tap 100 200'
    ],
    options: [],
    requirements: ['Screen turned on'],
    risk: 'safe',
    tags: ['input', 'touch', 'click', 'tap', 'automation'],
    aliases: ['touch screen', 'click point', 'simulate tap'],
    related: ['input-swipe', 'input-text']
  },
  {
    id: 'input-swipe',
    tool: 'adb',
    command: 'adb shell input swipe <x1> <y1> <x2> <y2> [duration_ms]',
    title: 'Simulate swipe / drag gesture',
    description: 'Simulates a finger drag or swipe motion from starting coordinates (x1, y1) to ending coordinates (x2, y2). Useful for scrolling and drag-and-drop.',
    category: 'Debugging',
    syntax: 'adb shell input swipe <x1> <y1> <x2> <y2> [duration_ms]',
    examples: [
      'adb shell input swipe 540 1600 540 400 300',
      'adb shell input swipe 540 400 540 1600 300'
    ],
    options: [
      { flag: '[duration_ms]', description: 'Duration of gesture in milliseconds. High values (e.g. 1500) act as long-presses.' }
    ],
    requirements: ['Screen turned on'],
    risk: 'safe',
    tags: ['swipe', 'scroll', 'gesture', 'drag'],
    aliases: ['scroll down', 'scroll up', 'drag screen'],
    related: ['input-tap']
  },
  {
    id: 'bugreport',
    tool: 'adb',
    command: 'adb bugreport [zip_file]',
    title: 'Generate full Android diagnostic bugreport',
    description: 'Captures a complete snapshot of system diagnostics, dumpsys logs, battery history, ANR traces, and radio states into a ZIP archive.',
    category: 'Debugging',
    syntax: 'adb bugreport [<path_to_zip>]',
    examples: [
      'adb bugreport',
      'adb bugreport ./bugreport.zip'
    ],
    options: [],
    requirements: ['Device connected and authorized', 'Storage space on host'],
    risk: 'safe',
    tags: ['bugreport', 'diagnostics', 'anr', 'crash', 'traces', 'dump'],
    aliases: ['capture bug report', 'dump diagnostics', 'system report'],
    related: ['logcat', 'dumpsys-battery']
  },

  // --- Logs ---
  {
    id: 'logcat',
    tool: 'adb',
    command: 'adb logcat',
    title: 'Stream live Android system logs',
    description: 'Streams continuous real-time diagnostic output from the Android log ring buffer.',
    category: 'Logs',
    syntax: 'adb logcat [options] [filterspecs]',
    examples: [
      'adb logcat',
      'adb logcat -v time',
      'adb logcat *:E',
      'adb logcat -s ActivityManager:I MyAppTag:D'
    ],
    options: [
      { flag: '-v <format>', description: 'Sets log message formatting (brief, process, tag, raw, time, threadtime).' },
      { flag: '-s', description: 'Sets default filter to silent so only explicitly specified tags print.' },
      { flag: '-d', description: 'Dump current buffer to stdout and exit without streaming.' },
      { flag: '-c', description: 'Clear (flush) log ring buffers and exit.' }
    ],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['logcat', 'logs', 'debug', 'errors', 'stream', 'diagnostics'],
    aliases: ['view logs', 'android logs', 'crash logs'],
    related: ['logcat-clear', 'logcat-errors', 'logcat-dump']
  },
  {
    id: 'logcat-clear',
    tool: 'adb',
    command: 'adb logcat -c',
    title: 'Clear log ring buffers',
    description: 'Flushes and empties the entire Android log ring buffer history so subsequent logcat commands show only fresh events.',
    category: 'Logs',
    syntax: 'adb logcat -c',
    examples: [
      'adb logcat -c'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['logcat', 'clear', 'flush', 'reset'],
    aliases: ['flush logs', 'wipe logcat', 'clean logs'],
    related: ['logcat', 'logcat-dump']
  },
  {
    id: 'logcat-errors',
    tool: 'adb',
    command: 'adb logcat *:E',
    title: 'Filter logcat for error logs only',
    description: 'Filters the system log stream to isolate critical system and application exceptions and errors (log level Error & Fatal).',
    category: 'Logs',
    syntax: 'adb logcat *:E',
    examples: [
      'adb logcat *:E',
      'adb logcat *:F'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['errors', 'crash', 'exceptions', 'fatal', 'logcat'],
    aliases: ['show crashes', 'error logs', 'exception stream'],
    related: ['logcat', 'logcat-dump']
  },
  {
    id: 'logcat-dump',
    tool: 'adb',
    command: 'adb logcat -d > log.txt',
    title: 'Export logs snapshot to local text file',
    description: 'Dumps the current contents of the circular log buffer to a local text file on the development computer and exits.',
    category: 'Logs',
    syntax: 'adb logcat -d > <output_file.txt>',
    examples: [
      'adb logcat -d > log.txt',
      'adb logcat -d -v threadtime > crash.log'
    ],
    options: [
      { flag: '-d', description: 'Dump log buffer without continuous blocking.' }
    ],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['export', 'save', 'file', 'dump', 'logcat'],
    aliases: ['save logs to file', 'export logcat', 'record crash log'],
    related: ['logcat', 'bugreport']
  },

  // --- Screenshots & Recording ---
  {
    id: 'screencap-stream',
    tool: 'adb',
    command: 'adb exec-out screencap -p > screenshot.png',
    title: 'Capture screenshot directly to computer',
    description: 'Captures the active Android screen framebuffer and pipes the PNG stream directly to a file on your local machine without needing intermediate device storage.',
    category: 'Screenshots & Recording',
    syntax: 'adb exec-out screencap -p > <output.png>',
    examples: [
      'adb exec-out screencap -p > screenshot.png',
      'adb exec-out screencap -p > ~/Desktop/screen.png'
    ],
    options: [
      { flag: '-p', description: 'Output in standard PNG image format.' }
    ],
    requirements: ['Device display powered on and unlocked'],
    risk: 'safe',
    tags: ['screenshot', 'screencap', 'screen', 'image', 'capture', 'direct'],
    aliases: ['take screenshot', 'save screen', 'capture phone screen'],
    related: ['screencap-file', 'screenrecord']
  },
  {
    id: 'screencap-file',
    tool: 'adb',
    command: 'adb shell screencap -p /sdcard/screenshot.png',
    title: 'Save screenshot to device storage',
    description: 'Captures a screenshot and saves it as an image file on the internal SD card storage.',
    category: 'Screenshots & Recording',
    syntax: 'adb shell screencap -p <remote_path.png>',
    examples: [
      'adb shell screencap -p /sdcard/screenshot.png'
    ],
    options: [],
    requirements: ['Write permission on remote path'],
    risk: 'safe',
    tags: ['screenshot', 'screencap', 'device storage'],
    aliases: ['phone screenshot', 'save screenshot to sdcard'],
    related: ['screencap-stream', 'pull']
  },
  {
    id: 'screenrecord',
    tool: 'adb',
    command: 'adb shell screenrecord /sdcard/demo.mp4',
    title: 'Record screen video to MP4 file',
    description: 'Records high-definition screen video of device activity to an MP4 video file on the device. Press Ctrl+C to terminate recording.',
    category: 'Screenshots & Recording',
    syntax: 'adb shell screenrecord [options] <path.mp4>',
    examples: [
      'adb shell screenrecord /sdcard/demo.mp4',
      'adb shell screenrecord --size 1280x720 --bit-rate 6000000 /sdcard/demo.mp4',
      'adb shell screenrecord --time-limit 30 /sdcard/clip.mp4'
    ],
    options: [
      { flag: '--size <wxh>', description: 'Video resolution (e.g. 1280x720). Default is native device resolution.' },
      { flag: '--bit-rate <rate>', description: 'Bit rate in bits per second (default 4000000 = 4Mbps).' },
      { flag: '--time-limit <sec>', description: 'Set maximum recording duration in seconds (default and max 180s).' }
    ],
    requirements: ['Android 4.4+', 'Available internal storage'],
    risk: 'safe',
    tags: ['screenrecord', 'video', 'recording', 'demo', 'mp4'],
    aliases: ['record video', 'record screen', 'capture video'],
    related: ['screencap-stream', 'pull']
  },

  // --- Reboot & Recovery ---
  {
    id: 'reboot',
    tool: 'adb',
    command: 'adb reboot',
    title: 'Reboot Android device normally',
    description: 'Restarts the Android operating system into normal user mode.',
    category: 'Reboot & Recovery',
    syntax: 'adb reboot',
    examples: [
      'adb reboot'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['reboot', 'restart', 'power'],
    aliases: ['restart phone', 'reboot system'],
    related: ['reboot-bootloader', 'reboot-recovery', 'reboot-fastboot']
  },
  {
    id: 'reboot-bootloader',
    tool: 'adb',
    command: 'adb reboot bootloader',
    title: 'Reboot into Bootloader / Fastboot mode',
    description: 'Reboots the device into the bootloader interface where low-level Fastboot flashing commands can be executed.',
    category: 'Reboot & Recovery',
    syntax: 'adb reboot bootloader',
    examples: [
      'adb reboot bootloader'
    ],
    options: [],
    requirements: ['Device connected and authorized'],
    risk: 'safe',
    tags: ['bootloader', 'fastboot', 'reboot', 'flashing'],
    aliases: ['go to bootloader', 'enter fastboot', 'reboot fastboot'],
    related: ['reboot', 'reboot-recovery', 'fastboot-devices']
  },
  {
    id: 'reboot-recovery',
    tool: 'adb',
    command: 'adb reboot recovery',
    title: 'Reboot into Recovery mode',
    description: 'Reboots the device into Android recovery console (Stock Recovery or custom TWRP/OrangeFox) for OTAs and wipes.',
    category: 'Reboot & Recovery',
    syntax: 'adb reboot recovery',
    examples: [
      'adb reboot recovery'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['recovery', 'twrp', 'ota', 'wipe', 'reboot'],
    aliases: ['go to recovery', 'enter recovery', 'twrp reboot'],
    related: ['reboot', 'reboot-bootloader', 'sideload']
  },
  {
    id: 'reboot-fastboot',
    tool: 'adb',
    command: 'adb reboot fastboot',
    title: 'Reboot into FastbootD (User-space Fastboot)',
    description: 'Reboots Android 10+ devices into fastbootd (userspace fastboot), allowing partition resizing and flashing dynamic logical partitions (system, vendor, product).',
    category: 'Reboot & Recovery',
    syntax: 'adb reboot fastboot',
    examples: [
      'adb reboot fastboot'
    ],
    options: [],
    requirements: ['Android 10 or newer with Dynamic Partitions'],
    risk: 'safe',
    tags: ['fastbootd', 'dynamic partitions', 'reboot', 'logical'],
    aliases: ['enter fastbootd', 'userspace fastboot'],
    related: ['reboot-bootloader', 'reboot']
  },
  {
    id: 'reboot-edl',
    tool: 'adb',
    command: 'adb reboot edl',
    title: 'Reboot into Qualcomm EDL Mode',
    description: 'Reboots Qualcomm-based Snapdragon devices directly into Emergency Download (EDL / 9008) mode for low-level unbricking.',
    category: 'Reboot & Recovery',
    syntax: 'adb reboot edl',
    examples: [
      'adb reboot edl'
    ],
    options: [],
    requirements: ['Qualcomm Snapdragon chipset'],
    risk: 'caution',
    riskExplanation: 'Device screen turns black and requires QPST / QFIL or special unbrick tools to exit if no firmware is flashed.',
    tags: ['edl', 'qualcomm', 'emergency', 'unbrick', '9008'],
    aliases: ['enter edl', '9008 mode', 'unbrick mode'],
    related: ['reboot-bootloader', 'reboot']
  },
  {
    id: 'sideload',
    tool: 'adb',
    command: 'adb sideload <update.zip>',
    title: 'Sideload OTA / recovery update package',
    description: 'Sends and installs a full OTA package or custom ROM ZIP archive to a device booted into Recovery Mode with "Apply update from ADB" active.',
    category: 'Reboot & Recovery',
    syntax: 'adb sideload <filename.zip>',
    examples: [
      'adb sideload ota_update.zip',
      'adb sideload lineage-21.0.zip'
    ],
    options: [],
    requirements: ['Device booted into Recovery Mode', '"Apply update from ADB" enabled in recovery'],
    risk: 'caution',
    riskExplanation: 'Flashing incompatible update ZIPs may soft-brick the operating system.',
    tags: ['sideload', 'ota', 'rom', 'flash', 'update', 'recovery'],
    aliases: ['flash zip', 'sideload update', 'install ota'],
    related: ['reboot-recovery']
  },

  // --- Permissions ---
  {
    id: 'pm-grant',
    tool: 'adb',
    command: 'adb shell pm grant <package> <permission>',
    title: 'Grant runtime permission to an application',
    description: 'Grants a declared runtime permission (e.g. WRITE_SECURE_SETTINGS, ACCESS_FINE_LOCATION) to an app without user prompt.',
    category: 'Permissions',
    syntax: 'adb shell pm grant <package_name> <permission_name>',
    examples: [
      'adb shell pm grant com.example.app android.permission.WRITE_SECURE_SETTINGS',
      'adb shell pm grant com.example.app android.permission.ACCESS_FINE_LOCATION'
    ],
    options: [],
    requirements: ['App must declare the permission in its AndroidManifest.xml'],
    risk: 'safe',
    tags: ['permission', 'grant', 'security', 'secure settings'],
    aliases: ['allow permission', 'give write secure settings', 'bypass permission prompt'],
    related: ['pm-revoke', 'pm-reset-permissions']
  },
  {
    id: 'pm-revoke',
    tool: 'adb',
    command: 'adb shell pm revoke <package> <permission>',
    title: 'Revoke runtime permission from an application',
    description: 'Revokes a previously granted runtime permission from the specified application.',
    category: 'Permissions',
    syntax: 'adb shell pm revoke <package_name> <permission_name>',
    examples: [
      'adb shell pm revoke com.example.app android.permission.ACCESS_FINE_LOCATION'
    ],
    options: [],
    requirements: ['Target app installed'],
    risk: 'safe',
    tags: ['permission', 'revoke', 'security', 'deny'],
    aliases: ['remove permission', 'deny permission'],
    related: ['pm-grant', 'pm-reset-permissions']
  },
  {
    id: 'pm-reset-permissions',
    tool: 'adb',
    command: 'adb shell pm reset-permissions',
    title: 'Reset all runtime permissions to defaults',
    description: 'Resets all granted runtime permissions for all installed applications back to default factory states.',
    category: 'Permissions',
    syntax: 'adb shell pm reset-permissions',
    examples: [
      'adb shell pm reset-permissions'
    ],
    options: [],
    requirements: ['Device connected and authorized'],
    risk: 'caution',
    riskExplanation: 'Apps will prompt again for camera, location, storage, and microphone access.',
    tags: ['permissions', 'reset', 'privacy', 'security'],
    aliases: ['reset all permissions', 'default permissions'],
    related: ['pm-grant', 'pm-revoke']
  },

  // --- Network ---
  {
    id: 'tcpip',
    tool: 'adb',
    command: 'adb tcpip 5555',
    title: 'Restart ADB daemon in TCP/IP listening mode',
    description: 'Instructs the connected device to listen for ADB connections on network TCP port 5555, allowing USB cable removal for wireless debugging.',
    category: 'Network',
    syntax: 'adb tcpip <port>',
    examples: [
      'adb tcpip 5555'
    ],
    options: [
      { flag: '5555', description: 'Standard ADB TCP port.' }
    ],
    requirements: ['Initial USB cable connection to trigger the command'],
    risk: 'safe',
    tags: ['tcpip', 'network', 'wireless', 'port', 'wifi'],
    aliases: ['enable wifi adb', 'start adb over wifi', 'wireless mode'],
    related: ['connect', 'disconnect']
  },
  {
    id: 'forward',
    tool: 'adb',
    command: 'adb forward tcp:<local_port> tcp:<remote_port>',
    title: 'Forward host local socket to device socket',
    description: 'Sets up socket forwarding from a port on the host computer to a port or socket on the Android device.',
    category: 'Network',
    syntax: 'adb forward tcp:<local_port> tcp:<remote_port>',
    examples: [
      'adb forward tcp:8080 tcp:8080',
      'adb forward tcp:9222 localabstract:chrome_devtools_remote'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['forward', 'port', 'proxy', 'network', 'tunnel'],
    aliases: ['port forward', 'forward port', 'tunnel socket'],
    related: ['reverse', 'forward-list']
  },
  {
    id: 'reverse',
    tool: 'adb',
    command: 'adb reverse tcp:<remote_port> tcp:<local_port>',
    title: 'Reverse socket connection (device to host)',
    description: 'Allows network requests originating on the Android device to route back into a server running on your computer localhost (e.g. dev server on port 3000).',
    category: 'Network',
    syntax: 'adb reverse tcp:<device_port> tcp:<host_port>',
    examples: [
      'adb reverse tcp:3000 tcp:3000',
      'adb reverse tcp:8081 tcp:8081'
    ],
    options: [],
    requirements: ['Android 5.0+'],
    risk: 'safe',
    tags: ['reverse', 'localhost', 'dev server', 'tunnel', 'network'],
    aliases: ['reverse port forward', 'access localhost from phone', 'react native debug port'],
    related: ['forward']
  },
  {
    id: 'forward-list',
    tool: 'adb',
    command: 'adb forward --list',
    title: 'List active port forward socket rules',
    description: 'Displays all currently established local-to-remote socket forwarding tunnels.',
    category: 'Network',
    syntax: 'adb forward --list',
    examples: [
      'adb forward --list'
    ],
    options: [],
    requirements: ['Host machine with ADB'],
    risk: 'safe',
    tags: ['forward', 'network', 'sockets', 'list'],
    aliases: ['show forwarded ports', 'list socket rules'],
    related: ['forward', 'reverse']
  },

  // --- System ---
  {
    id: 'dumpsys-battery',
    tool: 'adb',
    command: 'adb shell dumpsys battery',
    title: 'Inspect detailed battery hardware status',
    description: 'Prints current battery charge level, voltage, battery temperature, health status, and charging source (AC/USB/Wireless).',
    category: 'System',
    syntax: 'adb shell dumpsys battery',
    examples: [
      'adb shell dumpsys battery'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['battery', 'voltage', 'temperature', 'power', 'dumpsys'],
    aliases: ['battery health', 'check battery level', 'battery status'],
    related: ['dumpsys-battery-set', 'dumpsys-meminfo']
  },
  {
    id: 'dumpsys-battery-set',
    tool: 'adb',
    command: 'adb shell dumpsys battery set level <percentage>',
    title: 'Mock / simulate battery level for testing',
    description: 'Overrides Android OS battery percentage reporter for testing low-battery notifications and power-saving modes.',
    category: 'System',
    syntax: 'adb shell dumpsys battery set level <0-100>',
    examples: [
      'adb shell dumpsys battery set level 5',
      'adb shell dumpsys battery set level 100',
      'adb shell dumpsys battery reset'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['battery', 'mock', 'simulate', 'test', 'dumpsys'],
    aliases: ['fake battery level', 'test low battery', 'set battery percent'],
    related: ['dumpsys-battery']
  },
  {
    id: 'dumpsys-meminfo',
    tool: 'adb',
    command: 'adb shell dumpsys meminfo [package_name]',
    title: 'Analyze memory usage (RAM / PSS / Heap)',
    description: 'Dumps deep RAM allocation statistics including Native Heap, Dalvik Heap, Graphics buffers, and PSS memory for an app or the whole system.',
    category: 'System',
    syntax: 'adb shell dumpsys meminfo [<package_name>]',
    examples: [
      'adb shell dumpsys meminfo',
      'adb shell dumpsys meminfo com.example.myapp'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['ram', 'memory', 'leak', 'heap', 'dumpsys', 'performance'],
    aliases: ['check ram usage', 'memory leak check', 'app ram'],
    related: ['dumpsys-cpuinfo']
  },
  {
    id: 'dumpsys-cpuinfo',
    tool: 'adb',
    command: 'adb shell dumpsys cpuinfo',
    title: 'View live CPU usage breakdown by process',
    description: 'Outputs CPU workload percentages consumed by individual apps, system services, and kernel threads over the recent sampling window.',
    category: 'System',
    syntax: 'adb shell dumpsys cpuinfo',
    examples: [
      'adb shell dumpsys cpuinfo'
    ],
    options: [],
    requirements: ['Device connected'],
    risk: 'safe',
    tags: ['cpu', 'processor', 'load', 'performance', 'dumpsys'],
    aliases: ['check cpu usage', 'cpu load', 'top processes'],
    related: ['dumpsys-meminfo']
  },
  {
    id: 'wm-size',
    tool: 'adb',
    command: 'adb shell wm size [widthxheight|reset]',
    title: 'View or override physical screen resolution',
    description: 'Reads the physical display resolution or overrides it to test responsive UI layouts across various screen resolutions.',
    category: 'System',
    syntax: 'adb shell wm size [<width>x<height>|reset]',
    examples: [
      'adb shell wm size',
      'adb shell wm size 1080x1920',
      'adb shell wm size reset'
    ],
    options: [
      { flag: 'reset', description: 'Restores the original native hardware screen resolution.' }
    ],
    requirements: ['Device connected'],
    risk: 'caution',
    riskExplanation: 'Setting an unsupported extreme resolution can make the screen unreadable. Always use wm size reset to restore.',
    tags: ['resolution', 'screen', 'display', 'wm', 'ui test'],
    aliases: ['change resolution', 'screen size', 'reset resolution'],
    related: ['wm-density']
  },
  {
    id: 'wm-density',
    tool: 'adb',
    command: 'adb shell wm density [dpi|reset]',
    title: 'View or override display DPI scale density',
    description: 'Adjusts the software DPI (density-independent dots per inch) scale factor of the Android display.',
    category: 'System',
    syntax: 'adb shell wm density [<dpi>|reset]',
    examples: [
      'adb shell wm density',
      'adb shell wm density 420',
      'adb shell wm density reset'
    ],
    options: [
      { flag: 'reset', description: 'Restores default factory DPI density.' }
    ],
    requirements: ['Device connected'],
    risk: 'caution',
    riskExplanation: 'Setting extreme DPI values can cause UI elements to render too large or too small to touch.',
    tags: ['dpi', 'density', 'scale', 'ui', 'display'],
    aliases: ['change dpi', 'screen scale', 'display size'],
    related: ['wm-size']
  },

  // --- Advanced ---
  {
    id: 'root',
    tool: 'adb',
    command: 'adb root',
    title: 'Restart adbd with root permissions',
    description: 'Restarts the on-device adbd daemon with root privileges (available on userdebug, eng, or rooted custom firmware builds).',
    category: 'Advanced',
    syntax: 'adb root',
    examples: [
      'adb root'
    ],
    options: [],
    requirements: ['Userdebug or rooted ROM (fails on production user builds without root)'],
    risk: 'caution',
    riskExplanation: 'Grants administrative unrestricted access to all filesystem partitions.',
    tags: ['root', 'superuser', 'adbd', 'developer'],
    aliases: ['enable root', 'run adb as root'],
    related: ['unroot', 'remount', 'disable-verity']
  },
  {
    id: 'unroot',
    tool: 'adb',
    command: 'adb unroot',
    title: 'Restart adbd with standard shell permissions',
    description: 'Restarts the on-device adbd daemon back into unprivileged standard shell user context.',
    category: 'Advanced',
    syntax: 'adb unroot',
    examples: [
      'adb unroot'
    ],
    options: [],
    requirements: ['Device running adb root'],
    risk: 'safe',
    tags: ['unroot', 'shell', 'drop privileges'],
    aliases: ['disable root', 'exit root adb'],
    related: ['root']
  },
  {
    id: 'remount',
    tool: 'adb',
    command: 'adb remount',
    title: 'Remount system partitions as read-write (RW)',
    description: 'Remounts /system, /vendor, and /product partitions as read-write, enabling manual modification of system binaries and APKs.',
    category: 'Advanced',
    syntax: 'adb remount [-R]',
    examples: [
      'adb remount',
      'adb remount -R'
    ],
    options: [
      { flag: '-R', description: 'Automatically reboot device if needed to complete remounting overlayfs.' }
    ],
    requirements: ['Rooted device or userdebug build', 'dm-verity disabled'],
    risk: 'caution',
    riskExplanation: 'Modifying mounted system partitions can cause bootloops if corrupted files are saved.',
    tags: ['remount', 'read-write', 'rw', 'system', 'modify'],
    aliases: ['mount system rw', 'make system writable'],
    related: ['disable-verity', 'root']
  },
  {
    id: 'disable-verity',
    tool: 'adb',
    command: 'adb disable-verity',
    title: 'Disable dm-verity kernel integrity check',
    description: 'Disables Device Mapper Verity (dm-verity) cryptographic block integrity enforcement on userdebug builds to allow system partition modifications.',
    category: 'Advanced',
    syntax: 'adb disable-verity',
    examples: [
      'adb disable-verity'
    ],
    options: [],
    requirements: ['Unlocked bootloader', 'Userdebug build or custom kernel'],
    risk: 'destructive',
    riskExplanation: 'Disables core Android security cryptographic verification; device requires reboot to apply.',
    tags: ['dm-verity', 'verity', 'security', 'system', 'integrity'],
    aliases: ['turn off dm verity', 'disable verity'],
    related: ['remount', 'root']
  }
];
