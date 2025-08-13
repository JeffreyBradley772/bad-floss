'use client';

export function GradientLine() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-3/4">
      <div className="absolute bottom-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
      <div className="absolute bottom-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />
      <div className="absolute bottom-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-full blur-sm" />
      <div className="absolute bottom-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-full" />
    </div>
  );
}
