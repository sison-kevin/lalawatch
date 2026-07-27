import Link from "next/link";
import { Search } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="bg-white text-gray-800 shadow-md">
            <div className=" mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Left Side */}

                <div className= "flex items-center gap-8"> 
                    <Link href="/" className="text-2xl font-bold text-purple-400">
                        LalaWatch
                    </Link>

                    <Link href="/" className="hover:text-purple-400">
                       Home
                    </Link>

                    <Link href="/movies" className="hover:text-purple-400">
                        Movies
                    </Link>

                    <Link href="/tv-shows" className="hover:text-purple-400">
                        TV Shows
                    </Link>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-5">
                    <button className="hover:text-purple-400">
                        <Search size={22} />
                    </button>

                    <button className="rounded-lg bg-purple-400 px-4 py-2 text-white hover:bg-purple-500">
                        Log In
                    </button>
                </div>
            </div>
        </nav>
    );
}