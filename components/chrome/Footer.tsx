import { CASE } from "@/lib/module3";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-paper print:hidden">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-8 md:px-6">
        <p className="text-caption text-ash">
          AION UX Class — {CASE.module}. Case company: {CASE.company} (fictional,
          for training use). Your work is saved to this browser only; nothing
          leaves your device.
        </p>
      </div>
    </footer>
  );
}
