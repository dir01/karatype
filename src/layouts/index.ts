import KeyboardLayout, { TLayout } from "./KeyboardLayout";
import rawLayouts from "./rawLayouts";

const layouts: { [name: string]: TLayout } = {};

// @ts-ignore
for (const [name, layout] of Object.entries(rawLayouts)) {
  layouts[name] = new KeyboardLayout(layout).rows;
}

export default layouts;
