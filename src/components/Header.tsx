import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">
          <p className="text-2xl">INVITATION PLATFORM</p>
        </Link>

        <Link href="/invitation/new">
          <p className="text-neutral-200 text-xl">
            <span className="text2xl text-blue-500">+</span> Create New Invitation
          </p>
        </Link>
      </nav>
    </header>
  );
}
