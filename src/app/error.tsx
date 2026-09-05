"use client";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="px-5 py-24 text-center"><h1 className="text-3xl">This page didn&apos;t load</h1><p className="mt-4">Please try again.</p><button onClick={reset} className="mt-6 rounded-full bg-primary px-6 py-3 text-primary-foreground">Try again</button></div>; }
