import { getRoute } from '@/helpers/routes';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => (
  <Link href={getRoute('home')}>
    <a className="flex items-center gap-x-2 text-2xl text-blue-600 font-medium font-['Nunito']">
      <span className="sr-only">Home</span>
      <div className="-rotate-12 flex items-center">
        <Image src="/logo.svg" height={30} width={30} alt="Presentin Logo" />
      </div>{' '}
      Presentin
    </a>
  </Link>
);

export default Logo;
