import Link from 'next/link';

export function AboutLink() {
  return (
    <Link href="/about" className="underline transition-colors hover:text-foreground">
      About
    </Link>
  );
}
