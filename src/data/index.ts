import { adbCommands } from './adb';
import { fastbootCommands } from './fastboot';
import type { CommandItem, ToolType, RiskLevel } from './types';

export * from './types';
export { adbCommands } from './adb';
export { fastbootCommands } from './fastboot';

export const allCommands: CommandItem[] = [...adbCommands, ...fastbootCommands];

export const adbCategories = [
  'All',
  'Device & Connection',
  'App Management',
  'Files & Storage',
  'Shell',
  'Debugging',
  'Logs',
  'Screenshots & Recording',
  'Reboot & Recovery',
  'Permissions',
  'Network',
  'System',
  'Advanced',
] as const;

export const fastbootCategories = [
  'All',
  'Device Detection',
  'Device Information',
  'Reboot',
  'Bootloader',
  'Partitions',
  'Flashing',
  'Erasing',
  'Unlock/Lock',
  'Boot Images',
  'Advanced',
] as const;

export function getCommandById(id: string): CommandItem | undefined {
  return allCommands.find((cmd) => cmd.id === id);
}

export function getCommandsByTool(tool: ToolType): CommandItem[] {
  return allCommands.filter((cmd) => cmd.tool === tool);
}

export function searchCommands(
  query: string,
  tool?: ToolType | 'all',
  category?: string,
  risk?: RiskLevel | 'all'
): CommandItem[] {
  const cleanQuery = query.trim().toLowerCase();

  return allCommands.filter((cmd) => {
    // Tool filter
    if (tool && tool !== 'all' && cmd.tool !== tool) {
      return false;
    }

    // Category filter
    if (category && category !== 'All' && cmd.category !== category) {
      return false;
    }

    // Risk filter
    if (risk && risk !== 'all' && cmd.risk !== risk) {
      return false;
    }

    // Query filter
    if (!cleanQuery) return true;

    // Check command, title, description, category, tags, aliases, syntax, examples
    const matchCommand = cmd.command.toLowerCase().includes(cleanQuery);
    const matchTitle = cmd.title.toLowerCase().includes(cleanQuery);
    const matchDesc = cmd.description.toLowerCase().includes(cleanQuery);
    const matchCat = cmd.category.toLowerCase().includes(cleanQuery);
    const matchSyntax = cmd.syntax.toLowerCase().includes(cleanQuery);
    const matchTags = cmd.tags.some((t) => t.toLowerCase().includes(cleanQuery));
    const matchAliases = cmd.aliases?.some((a) => a.toLowerCase().includes(cleanQuery)) ?? false;
    const matchExamples = cmd.examples.some((ex) => ex.toLowerCase().includes(cleanQuery));

    return (
      matchCommand ||
      matchTitle ||
      matchDesc ||
      matchCat ||
      matchSyntax ||
      matchTags ||
      matchAliases ||
      matchExamples
    );
  });
}
