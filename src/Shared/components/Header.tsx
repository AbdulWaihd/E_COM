import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Heart } from 'lucide-react';
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { MenuIcon } from 'lucide-react';
const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const isLoggedIn = token && user;

    return (
        <header className="flex items-center justify-between  px-6 py-6 rounded-md mt-1 mb-4 mx-0.5"
            style={{ backgroundColor: 'var(--header-main-bg)', color: 'var(--header-text)' }}>

            <div className="flex items-center">
                <Logo width={200} />
            </div>


            {isLoggedIn ? (
                <>
                    <div className="flex-1 max-w-2xl">
                        <SearchBar />
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={() => navigate('/user')}
                            className="text-sm font-medium bg-transparent border-none cursor-pointer hover:underline"
                            style={{ color: 'var(--header-text)' }}>
                            <User size={18} />
                        </button>

                        <button onClick={() => navigate('/wishlist')}
                            className="text-sm font-medium bg-transparent border-none cursor-pointer hover:underline"
                            style={{ color: 'var(--header-text)' }}>
                            <Heart size={18} />
                        </button>

                        <button onClick={() => navigate('/cart')}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border-none rounded-full cursor-pointer"
                            style={{ backgroundColor: 'var(--cta)', color: 'var(--text)' }}>

                            <MenuIcon size={18} />
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </>
            ) :
                (
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/login')}
                            className="px-4 py-2 text-sm font-medium border-none rounded-full cursor-pointer"
                            style={{ backgroundColor: 'var(--cta)', color: 'var(--text)' }}>
                            Log In
                        </button>
                        <button onClick={() => navigate('/signup')}
                            className="px-4 py-2 text-sm font-medium border-none rounded-full cursor-pointer"
                            style={{ backgroundColor: 'var(--cta)', color: 'var(--text)' }}>
                            Sign Up
                        </button>
                    </div>
                )}
        </header>
    );
};

export default Header;