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
        <header className="sticky top-0 z-50 w-full px-6 py-4 transition-all duration-300 border-b backdrop-blur-md"
            style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                borderColor: 'var(--border)',
                color: 'var(--text)' 
            }}>
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
                <div className="flex items-center shrink-0 cursor-pointer" onClick={() => navigate('/')}>
                    <Logo width={160} />
                </div>

                {isLoggedIn ? (
                    <>
                        <div className="flex-1 max-w-xl">
                            <SearchBar />
                        </div>

                        <div className="flex items-center gap-5">
                            <button onClick={() => navigate('/user')}
                                className="p-2 transition-colors rounded-full hover:bg-slate-100 group"
                                aria-label="User Profile">
                                <User size={20} className="text-slate-600 group-hover:text-indigo-600" />
                            </button>

                            <button onClick={() => navigate('/wishlist')}
                                className="p-2 transition-colors rounded-full hover:bg-slate-100 group"
                                aria-label="Wishlist">
                                <Heart size={20} className="text-slate-600 group-hover:text-rose-500" />
                            </button>

                            <button onClick={() => navigate('/cart')}
                                className="relative flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white transition-all rounded-full hover:opacity-90 active:scale-95 shadow-md hover:shadow-lg"
                                style={{ backgroundColor: 'var(--cta)' }}>
                                <ShoppingCart size={18} />
                                <span>Cart</span>
                            </button>
                            
                            <button className="lg:hidden p-2">
                                <MenuIcon size={24} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate('/login')}
                            className="px-6 py-2.5 text-sm font-semibold transition-all rounded-full border border-slate-200 hover:bg-slate-50 active:scale-95">
                            Log In
                        </button>
                        <button onClick={() => navigate('/signup')}
                            className="px-6 py-2.5 text-sm font-semibold text-white transition-all rounded-full shadow-md hover:shadow-lg hover:opacity-90 active:scale-95"
                            style={{ backgroundColor: 'var(--cta)' }}>
                            Sign Up
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;