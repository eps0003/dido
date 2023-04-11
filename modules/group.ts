import { Module } from "../module";
import { Map } from "./map";

export type GroupOutput<Group extends string, Input> = Record<Group, Input[]>;

/**
 * Partitions elements of the input array into any number of groups.
 */
export class Group<Input, Group extends string>
  implements Module<Input[], GroupOutput<Group, Input>>
{
  constructor(private grouping: Module<Input, Group | Group[]>) {}

  async process(data: Input[]): Promise<GroupOutput<Group, Input>> {
    const output: GroupOutput<string, Input> = {};

    const allGroups = await new Map({ module: this.grouping }).process(data);

    data.forEach((value, index) => {
      const anyGroup = allGroups[index];
      const groups = typeof anyGroup === "string" ? [anyGroup] : anyGroup;

      for (const group of groups) {
        output[group] ??= [];
        output[group].push(value);
      }
    });

    return output;
  }
}
