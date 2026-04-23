import { expect, test } from "vite-plus/test";

import { cn } from "./cn";

test("merges conditional classes and resolves Tailwind conflicts", () => {
  expect(cn("px-2", "px-4", null, ["text-slate-11"])).toBe("px-4 text-slate-11");
});
