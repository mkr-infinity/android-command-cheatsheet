import type { CommandItem } from './types';

export const fastbootCommands: CommandItem[] = [
  // --- Device Detection ---
  {
    id: 'fastboot-devices',
    tool: 'fastboot',
    command: 'fastboot devices',
    title: 'List devices in Fastboot / Bootloader mode',
    description: 'Scans USB buses and lists all Android hardware currently running in low-level bootloader / fastboot protocol mode.',
    category: 'Device Detection',
    syntax: 'fastboot devices [-l]',
    examples: [
      'fastboot devices',
      'fastboot devices -l'
    ],
    options: [
      { flag: '-l', description: 'Outputs device path and USB bus topology.' }
    ],
    requirements: ['Device booted into Fastboot/Bootloader mode', 'Fastboot USB drivers installed (WinUSB on Windows, udev rules on Linux)'],
    risk: 'safe',
    tags: ['fastboot', 'detect', 'devices', 'bootloader', 'usb'],
    aliases: ['check fastboot', 'list fastboot', 'is bootloader detected'],
    related: ['fastboot-getvar-all', 'fastboot-reboot']
  },

  // --- Device Information ---
  {
    id: 'fastboot-getvar-all',
    tool: 'fastboot',
    command: 'fastboot getvar all',
    title: 'Query all bootloader variables and parameters',
    description: 'Dumps the entire set of hardware and bootloader environment variables exposed by the device firmware.',
    category: 'Device Information',
    syntax: 'fastboot getvar all',
    examples: [
      'fastboot getvar all'
    ],
    options: [],
    requirements: ['Device in bootloader mode'],
    risk: 'safe',
    tags: ['variables', 'getvar', 'firmware', 'hardware', 'diagnostics'],
    aliases: ['read bootloader info', 'check slots', 'device specs fastboot'],
    related: ['fastboot-getvar-unlocked', 'fastboot-getvar-slot', 'fastboot-devices']
  },
  {
    id: 'fastboot-getvar-unlocked',
    tool: 'fastboot',
    command: 'fastboot getvar unlocked',
    title: 'Check bootloader unlock status',
    description: 'Queries whether the bootloader is currently locked ("no") or unlocked ("yes"). Unlocking is mandatory before flashing partitions.',
    category: 'Device Information',
    syntax: 'fastboot getvar unlocked',
    examples: [
      'fastboot getvar unlocked'
    ],
    options: [],
    requirements: ['Device in bootloader mode'],
    risk: 'safe',
    tags: ['unlock', 'bootloader', 'security', 'status'],
    aliases: ['is bootloader unlocked', 'check unlock status'],
    related: ['fastboot-flashing-unlock', 'fastboot-getvar-all']
  },
  {
    id: 'fastboot-getvar-slot',
    tool: 'fastboot',
    command: 'fastboot getvar current-slot',
    title: 'Check active A/B slot partition',
    description: 'Returns which partition slot (either "a" or "b") the device is currently configured to boot from on A/B dual-slot devices.',
    category: 'Device Information',
    syntax: 'fastboot getvar current-slot',
    examples: [
      'fastboot getvar current-slot'
    ],
    options: [],
    requirements: ['A/B dual-slot compatible device in fastboot mode'],
    risk: 'safe',
    tags: ['slots', 'a/b', 'partitions', 'active slot'],
    aliases: ['check slot', 'which slot is active', 'slot a or b'],
    related: ['fastboot-set-active', 'fastboot-getvar-all']
  },
  {
    id: 'fastboot-oem-device-info',
    tool: 'fastboot',
    command: 'fastboot oem device-info',
    title: 'OEM hardware & tamper flag check',
    description: 'Displays OEM manufacturer-specific security data, including tamper status, critical unlock flag, and charger screen status.',
    category: 'Device Information',
    syntax: 'fastboot oem device-info',
    examples: [
      'fastboot oem device-info'
    ],
    options: [],
    requirements: ['Device in bootloader mode'],
    risk: 'safe',
    tags: ['oem', 'tamper', 'security', 'hardware info'],
    aliases: ['tamper flag', 'oem info', 'bootloader flags'],
    related: ['fastboot-getvar-all', 'fastboot-flashing-unlock']
  },

  // --- Reboot ---
  {
    id: 'fastboot-reboot',
    tool: 'fastboot',
    command: 'fastboot reboot',
    title: 'Reboot device out of Fastboot into Android',
    description: 'Restarts the device normal operating system, exiting the bootloader environment.',
    category: 'Reboot',
    syntax: 'fastboot reboot',
    examples: [
      'fastboot reboot'
    ],
    options: [],
    requirements: ['Device in fastboot mode'],
    risk: 'safe',
    tags: ['reboot', 'restart', 'exit fastboot'],
    aliases: ['exit bootloader', 'boot android', 'restart from fastboot'],
    related: ['fastboot-reboot-bootloader', 'fastboot-reboot-fastboot']
  },
  {
    id: 'fastboot-reboot-bootloader',
    tool: 'fastboot',
    command: 'fastboot reboot-bootloader',
    title: 'Warm reboot back into Bootloader mode',
    description: 'Reboots the hardware and immediately re-enters the bootloader/fastboot interface. Useful for reloading partition tables after flashing.',
    category: 'Reboot',
    syntax: 'fastboot reboot-bootloader',
    examples: [
      'fastboot reboot-bootloader'
    ],
    options: [],
    requirements: ['Device in bootloader mode'],
    risk: 'safe',
    tags: ['reboot', 'bootloader', 'reload'],
    aliases: ['restart bootloader', 'reload fastboot'],
    related: ['fastboot-reboot', 'fastboot-devices']
  },
  {
    id: 'fastboot-reboot-fastboot',
    tool: 'fastboot',
    command: 'fastboot reboot fastboot',
    title: 'Reboot from Bootloader into FastbootD (Userspace)',
    description: 'Switches the device into FastbootD mode, which runs within recovery ramdisk to facilitate resizing and flashing logical dynamic partitions.',
    category: 'Reboot',
    syntax: 'fastboot reboot fastboot',
    examples: [
      'fastboot reboot fastboot'
    ],
    options: [],
    requirements: ['Android 10+ device with dynamic partitions'],
    risk: 'safe',
    tags: ['fastbootd', 'dynamic partitions', 'userspace', 'reboot'],
    aliases: ['enter fastbootd', 'reboot to userspace fastboot'],
    related: ['fastboot-reboot-recovery', 'fastboot-reboot']
  },
  {
    id: 'fastboot-reboot-recovery',
    tool: 'fastboot',
    command: 'fastboot reboot recovery',
    title: 'Reboot directly into Recovery Console',
    description: 'Reboots the device from Fastboot mode straight into recovery mode (TWRP, OrangeFox, or stock recovery).',
    category: 'Reboot',
    syntax: 'fastboot reboot recovery',
    examples: [
      'fastboot reboot recovery'
    ],
    options: [],
    requirements: ['Device in bootloader mode'],
    risk: 'safe',
    tags: ['recovery', 'reboot', 'twrp'],
    aliases: ['boot into recovery', 'go to recovery from fastboot'],
    related: ['fastboot-reboot', 'fastboot-boot']
  },
  {
    id: 'fastboot-continue',
    tool: 'fastboot',
    command: 'fastboot continue',
    title: 'Continue standard boot sequence',
    description: 'Instructs the bootloader to continue loading the OS kernel without performing a full hardware power cycle.',
    category: 'Reboot',
    syntax: 'fastboot continue',
    examples: [
      'fastboot continue'
    ],
    options: [],
    requirements: ['Device in bootloader mode'],
    risk: 'safe',
    tags: ['continue', 'boot', 'resume'],
    aliases: ['resume boot', 'continue booting'],
    related: ['fastboot-reboot']
  },

  // --- Bootloader & Unlock/Lock ---
  {
    id: 'fastboot-flashing-unlock',
    tool: 'fastboot',
    command: 'fastboot flashing unlock',
    title: 'Unlock bootloader (Modern standard)',
    description: 'Initiates standard bootloader unlocking on modern Android devices (Android 6.0+). Prompts on-screen confirmation and factory resets all user data.',
    category: 'Unlock/Lock',
    syntax: 'fastboot flashing unlock',
    examples: [
      'fastboot flashing unlock'
    ],
    options: [],
    requirements: [
      'OEM Unlocking enabled in Android Developer Options',
      'Device booted into Bootloader mode',
      'USB connection'
    ],
    risk: 'destructive',
    riskExplanation: 'UNLOCKING THE BOOTLOADER WILL FACTORY RESET AND PERMANENTLY ERASE ALL USER DATA ON THE DEVICE! It also trips hardware warranty/integrity flags.',
    tags: ['unlock', 'bootloader', 'wipe', 'root', 'custom rom'],
    aliases: ['unlock bootloader', 'allow custom rom', 'flash unlock'],
    related: ['fastboot-flashing-lock', 'fastboot-flashing-unlock-critical', 'fastboot-getvar-unlocked']
  },
  {
    id: 'fastboot-flashing-lock',
    tool: 'fastboot',
    command: 'fastboot flashing lock',
    title: 'Re-lock bootloader and restore verified boot',
    description: 'Re-locks the bootloader and re-enables Android Verified Boot (AVB). Requires 100% stock firmware; factory resets the device.',
    category: 'Unlock/Lock',
    syntax: 'fastboot flashing lock',
    examples: [
      'fastboot flashing lock'
    ],
    options: [],
    requirements: ['All partitions must contain 100% unmodified stock signed firmware'],
    risk: 'destructive',
    riskExplanation: 'CRITICAL: Re-locking with modified partitions (custom ROM, Magisk root, TWRP) WILL HARD-BRICK the device! Also wipes all userdata.',
    tags: ['lock', 'relock', 'security', 'stock', 'avb'],
    aliases: ['relock bootloader', 'lock phone'],
    related: ['fastboot-flashing-unlock', 'fastboot-flashall']
  },
  {
    id: 'fastboot-flashing-unlock-critical',
    tool: 'fastboot',
    command: 'fastboot flashing unlock_critical',
    title: 'Unlock critical bootloader partitions',
    description: 'Unlocks deeper, critical bootloader and low-level firmware partitions (e.g. bootloader, radio, abl) on devices requiring extra authorization.',
    category: 'Unlock/Lock',
    syntax: 'fastboot flashing unlock_critical',
    examples: [
      'fastboot flashing unlock_critical'
    ],
    options: [],
    requirements: ['Standard flashing unlock completed first'],
    risk: 'destructive',
    riskExplanation: 'Allows overwriting the primary bootloader itself. Flashing corrupt files here can permanently brick the device hardware.',
    tags: ['critical', 'unlock', 'bootloader', 'firmware'],
    aliases: ['unlock critical', 'full unlock'],
    related: ['fastboot-flashing-unlock']
  },
  {
    id: 'fastboot-oem-unlock',
    tool: 'fastboot',
    command: 'fastboot oem unlock',
    title: 'Unlock bootloader (Legacy OEM syntax)',
    description: 'Legacy command used to unlock bootloaders on older Android devices (Android 5.1 and earlier, or specific OEM implementations).',
    category: 'Unlock/Lock',
    syntax: 'fastboot oem unlock [unlock_key]',
    examples: [
      'fastboot oem unlock',
      'fastboot oem unlock <unlock_code>'
    ],
    options: [],
    requirements: ['Legacy device or manufacturer specific unlock code'],
    risk: 'destructive',
    riskExplanation: 'Wipes all userdata and resets device to factory state.',
    tags: ['oem', 'legacy', 'unlock', 'bootloader'],
    aliases: ['old unlock command', 'oem unlock'],
    related: ['fastboot-flashing-unlock']
  },

  // --- Boot Images ---
  {
    id: 'fastboot-boot',
    tool: 'fastboot',
    command: 'fastboot boot <boot_image.img>',
    title: 'Temporarily boot kernel image into RAM',
    description: 'Loads and boots a kernel or recovery image (like TWRP or patched boot.img) directly into RAM without flashing or overwriting the device flash storage.',
    category: 'Boot Images',
    syntax: 'fastboot boot <path_to_image.img>',
    examples: [
      'fastboot boot twrp-3.7.0.img',
      'fastboot boot magisk_patched_boot.img'
    ],
    options: [],
    requirements: ['Unlocked bootloader', 'Compatible raw kernel or recovery image'],
    risk: 'safe',
    tags: ['boot', 'live', 'ram', 'twrp', 'temp boot', 'root'],
    aliases: ['temporary twrp', 'boot without flashing', 'test boot image', 'live boot'],
    related: ['fastboot-flash-boot', 'fastboot-flash-recovery']
  },

  // --- Flashing ---
  {
    id: 'fastboot-flash-boot',
    tool: 'fastboot',
    command: 'fastboot flash boot <boot.img>',
    title: 'Flash kernel / ramdisk to boot partition',
    description: 'Writes a kernel boot image to the boot partition. Commonly used for rooting with Magisk or installing custom kernels.',
    category: 'Flashing',
    syntax: 'fastboot flash boot <boot.img>',
    examples: [
      'fastboot flash boot boot.img',
      'fastboot flash boot magisk_patched.img'
    ],
    options: [],
    requirements: ['Unlocked bootloader'],
    risk: 'caution',
    riskExplanation: 'Flashing an incompatible kernel will prevent the OS from booting, causing a bootloop.',
    tags: ['flash', 'boot', 'kernel', 'root', 'magisk'],
    aliases: ['flash kernel', 'install magisk', 'flash boot image'],
    related: ['fastboot-boot', 'fastboot-flash-init-boot', 'fastboot-flash-vbmeta']
  },
  {
    id: 'fastboot-flash-init-boot',
    tool: 'fastboot',
    command: 'fastboot flash init_boot <init_boot.img>',
    title: 'Flash init_boot partition (Android 13+)',
    description: 'Flashes the dedicated init_boot partition introduced in Android 13+ devices (e.g. Pixel 7/8/9, Galaxy S23/S24) for Magisk / KernelSU root.',
    category: 'Flashing',
    syntax: 'fastboot flash init_boot <init_boot.img>',
    examples: [
      'fastboot flash init_boot magisk_patched_init_boot.img'
    ],
    options: [],
    requirements: ['Android 13+ GKI device with init_boot partition', 'Unlocked bootloader'],
    risk: 'caution',
    riskExplanation: 'Corrupt init_boot images will cause immediate bootloops.',
    tags: ['init_boot', 'android 13', 'android 14', 'gki', 'magisk', 'kernelsu'],
    aliases: ['root pixel 7', 'root pixel 8', 'flash init boot'],
    related: ['fastboot-flash-boot']
  },
  {
    id: 'fastboot-flash-recovery',
    tool: 'fastboot',
    command: 'fastboot flash recovery <recovery.img>',
    title: 'Flash custom recovery partition',
    description: 'Installs a custom recovery (such as TWRP or OrangeFox) onto the dedicated recovery partition (on legacy or non-A/B devices).',
    category: 'Flashing',
    syntax: 'fastboot flash recovery <recovery.img>',
    examples: [
      'fastboot flash recovery twrp.img',
      'fastboot flash recovery recovery.img'
    ],
    options: [],
    requirements: ['Device with dedicated recovery partition', 'Unlocked bootloader'],
    risk: 'caution',
    riskExplanation: 'Replaces stock recovery; ensures ability to flash custom ROM ZIPs.',
    tags: ['recovery', 'twrp', 'orangefox', 'flash'],
    aliases: ['install twrp', 'flash twrp', 'replace recovery'],
    related: ['fastboot-boot', 'fastboot-flash-boot']
  },
  {
    id: 'fastboot-flash-vbmeta',
    tool: 'fastboot',
    command: 'fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img',
    title: 'Flash vbmeta and disable AVB verification',
    description: 'Flashes the Verified Boot Metadata partition while explicitly patching security flags to allow booting custom or modified system partitions.',
    category: 'Flashing',
    syntax: 'fastboot flash vbmeta [--disable-verity] [--disable-verification] <vbmeta.img>',
    examples: [
      'fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img',
      'fastboot flash vbmeta vbmeta.img'
    ],
    options: [
      { flag: '--disable-verity', description: 'Disable dm-verity hash tree validation at boot.' },
      { flag: '--disable-verification', description: 'Disable cryptographic digital signature verification.' }
    ],
    requirements: ['Unlocked bootloader', 'Matching stock or blank vbmeta.img'],
    risk: 'destructive',
    riskExplanation: 'Disables Android hardware Verified Boot security layer. A factory reset is typically required upon first disabling verification.',
    tags: ['vbmeta', 'avb', 'verity', 'gsi', 'custom rom'],
    aliases: ['disable avb', 'flash vbmeta disable verification', 'bypass verity'],
    related: ['fastboot-flash-system', 'fastboot-flash-boot']
  },
  {
    id: 'fastboot-flash-system',
    tool: 'fastboot',
    command: 'fastboot flash system <system.img>',
    title: 'Flash OS system partition (GSI / ROM)',
    description: 'Writes a complete Android operating system system image or Generic System Image (GSI) to the system partition.',
    category: 'Flashing',
    syntax: 'fastboot flash system <system.img>',
    examples: [
      'fastboot flash system system.img',
      'fastboot flash system gsi_arm64-v8a.img'
    ],
    options: [],
    requirements: ['Unlocked bootloader', 'Sufficient partition size or FastbootD on dynamic partition devices'],
    risk: 'destructive',
    riskExplanation: 'Replaces the entire Android framework and OS userspace. Incompatible images will fail to boot.',
    tags: ['system', 'gsi', 'rom', 'flash', 'os'],
    aliases: ['flash gsi', 'install custom system', 'flash android os'],
    related: ['fastboot-flash-vbmeta', 'fastboot-erase-system']
  },
  {
    id: 'fastboot-flashall',
    tool: 'fastboot',
    command: 'fastboot flashall -w',
    title: 'Flash complete factory image package',
    description: 'Flashes all firmware images (bootloader, radio, boot, system, vendor, product) contained in the current directory matching Android factory specs.',
    category: 'Flashing',
    syntax: 'fastboot flashall [-w] [--skip-reboot]',
    examples: [
      'fastboot flashall -w',
      'fastboot flashall'
    ],
    options: [
      { flag: '-w', description: 'Wipes userdata and cache during flashing (full factory reset).' },
      { flag: '--skip-reboot', description: 'Do not automatically reboot the device after flashing finishes.' }
    ],
    requirements: ['Official factory firmware unzipped in current directory', 'Unlocked bootloader'],
    risk: 'destructive',
    riskExplanation: 'Reflashes the entire device. With -w flag, all personal files and data are permanently wiped.',
    tags: ['flashall', 'factory image', 'restore', 'unbrick', 'stock'],
    aliases: ['restore factory image', 'flash full firmware', 'unbrick device'],
    related: ['fastboot-erase-userdata', 'fastboot-flashing-lock']
  },

  // --- Erasing ---
  {
    id: 'fastboot-erase-userdata',
    tool: 'fastboot',
    command: 'fastboot erase userdata',
    title: 'Erase user data partition (Factory reset)',
    description: 'Performs a hardware-level raw sector wipe of the userdata partition, removing all user accounts, installed apps, photos, and settings.',
    category: 'Erasing',
    syntax: 'fastboot erase userdata',
    examples: [
      'fastboot erase userdata'
    ],
    options: [],
    requirements: ['Unlocked bootloader'],
    risk: 'destructive',
    riskExplanation: 'PERMANENT DATA LOSS: Destroys all files, accounts, cryptographic keys, and user settings on the phone storage.',
    tags: ['erase', 'userdata', 'wipe', 'factory reset', 'clean'],
    aliases: ['wipe userdata', 'fastboot factory reset', 'wipe phone'],
    related: ['fastboot-w', 'fastboot-erase-cache']
  },
  {
    id: 'fastboot-w',
    tool: 'fastboot',
    command: 'fastboot -w',
    title: 'Wipe both userdata and cache',
    description: 'Standard Fastboot shortcut to erase both the userdata partition and cache partition simultaneously before installing a clean ROM.',
    category: 'Erasing',
    syntax: 'fastboot -w',
    examples: [
      'fastboot -w'
    ],
    options: [],
    requirements: ['Unlocked bootloader'],
    risk: 'destructive',
    riskExplanation: 'Completely wipes user storage and cache.',
    tags: ['wipe', 'erase', 'clean flash', 'userdata'],
    aliases: ['clean flash wipe', 'wipe all data'],
    related: ['fastboot-erase-userdata', 'fastboot-flashall']
  },
  {
    id: 'fastboot-erase-system',
    tool: 'fastboot',
    command: 'fastboot erase system',
    title: 'Erase system partition',
    description: 'Wipes the system partition clean prior to flashing a fresh operating system image.',
    category: 'Erasing',
    syntax: 'fastboot erase system',
    examples: [
      'fastboot erase system'
    ],
    options: [],
    requirements: ['Unlocked bootloader'],
    risk: 'destructive',
    riskExplanation: 'Renders the phone unbootable until a replacement system image is flashed.',
    tags: ['erase', 'system', 'clean', 'purge'],
    aliases: ['wipe system', 'delete android system'],
    related: ['fastboot-flash-system', 'fastboot-erase-userdata']
  },

  // --- Partitions & A/B Slots ---
  {
    id: 'fastboot-set-active',
    tool: 'fastboot',
    command: 'fastboot set_active <a|b|other>',
    title: 'Switch active boot slot on A/B device',
    description: 'Changes the active bootable slot on dual-slot A/B partition architectures. Critical for recovering from a bad update on the other slot.',
    category: 'Partitions',
    syntax: 'fastboot set_active <a|b|other>',
    examples: [
      'fastboot set_active a',
      'fastboot set_active b',
      'fastboot set_active other'
    ],
    options: [
      { flag: 'other', description: 'Toggles active slot to whichever slot is not currently active.' }
    ],
    requirements: ['A/B dual-slot hardware architecture'],
    risk: 'caution',
    riskExplanation: 'If the target slot does not contain valid, bootable firmware, the phone will fail to boot until switched back.',
    tags: ['slots', 'a/b', 'active', 'switch slot', 'recover'],
    aliases: ['switch slot a to b', 'change boot slot', 'set slot a'],
    related: ['fastboot-getvar-slot', 'fastboot-reboot']
  },
  {
    id: 'fastboot-format-userdata',
    tool: 'fastboot',
    command: 'fastboot format:ext4 userdata',
    title: 'Format userdata partition with filesystem',
    description: 'Formats and creates a fresh filesystem (ext4 or f2fs) on the userdata partition. Essential when removing encryption or switching filesystem types.',
    category: 'Partitions',
    syntax: 'fastboot format[:<fs_type>] <partition>',
    examples: [
      'fastboot format:ext4 userdata',
      'fastboot format:f2fs userdata'
    ],
    options: [
      { flag: 'ext4', description: 'Format with fourth extended filesystem.' },
      { flag: 'f2fs', description: 'Format with Flash-Friendly File System.' }
    ],
    requirements: ['Unlocked bootloader'],
    risk: 'destructive',
    riskExplanation: 'Destroys existing partition filesystem and all stored contents.',
    tags: ['format', 'filesystem', 'f2fs', 'ext4', 'userdata'],
    aliases: ['format phone', 'format f2fs', 'remove encryption'],
    related: ['fastboot-erase-userdata']
  },

  // --- Advanced ---
  {
    id: 'fastboot-flash-slot-all',
    tool: 'fastboot',
    command: 'fastboot flash --slot=all boot boot.img',
    title: 'Flash partition to both A and B slots simultaneously',
    description: 'Flashes the specified image to both slot _a and slot _b in one command, ensuring slot parity.',
    category: 'Advanced',
    syntax: 'fastboot flash --slot=all <partition> <image.img>',
    examples: [
      'fastboot flash --slot=all boot boot.img',
      'fastboot flash --slot=all vbmeta vbmeta.img'
    ],
    options: [
      { flag: '--slot=all', description: 'Target both slot _a and slot _b.' }
    ],
    requirements: ['Unlocked bootloader', 'A/B partitioned device'],
    risk: 'caution',
    riskExplanation: 'Overwrites backup slot; both slots will share the newly flashed image.',
    tags: ['slot all', 'a/b', 'dual slot', 'sync'],
    aliases: ['flash both slots', 'sync slots', 'slot all'],
    related: ['fastboot-set-active', 'fastboot-flash-boot']
  },
  {
    id: 'fastboot-stage',
    tool: 'fastboot',
    command: 'fastboot stage <file>',
    title: 'Send raw data payload to bootloader memory',
    description: 'Uploads raw binary data to the bootloader buffer without writing it directly to a flash storage partition.',
    category: 'Advanced',
    syntax: 'fastboot stage <file>',
    examples: [
      'fastboot stage payload.bin'
    ],
    options: [],
    requirements: ['Unlocked bootloader or supported vendor protocol'],
    risk: 'safe',
    tags: ['stage', 'buffer', 'memory', 'payload'],
    aliases: ['upload payload', 'stage binary'],
    related: ['fastboot-boot']
  }
];
