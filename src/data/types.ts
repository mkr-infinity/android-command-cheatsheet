export type RiskLevel = 'safe' | 'caution' | 'destructive';
export type ToolType = 'adb' | 'fastboot';

export interface CommandOption {
  flag: string;
  description: string;
}

export interface CommandItem {
  id: string; // URL slug, e.g. 'devices', 'install-apk'
  tool: ToolType;
  command: string;
  title: string;
  description: string;
  category: string;
  syntax: string;
  examples: string[];
  options: CommandOption[];
  requirements: string[];
  risk: RiskLevel;
  riskExplanation?: string;
  tags: string[];
  aliases?: string[];
  related: string[]; // IDs of related commands
}
