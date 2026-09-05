import Link from "next/link";
export default function NotFound() { return <div className="px-5 py-24 text-center"><h1 className="text-6xl">404</h1><p className="mt-4">Page not found</p><Link href="/" className="mt-6 inline-block underline">Go home</Link></div>; }
