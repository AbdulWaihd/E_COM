import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Heart } from 'lucide-react';


const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between  px-6 py-4 rounded-md mt-1 mb-4 mx-0.5"
            style={{ backgroundColor: 'var(--header-main-bg)', color: 'var(--header-text)' }}>

            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--header-accent)' }}>
                    <span style={{ color: 'var(--header-text)' }}>e</span>COM
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <button onClick={() => navigate('/user')}
                    className="text-sm font-medium hover:underline cursor-pointer bg-transparent border-none"
                    style={{ color: 'var(--header-text)' }}>
                    <User size={18} />
                </button>

                <button onClick={() => navigate('/wishlist')}
                    className="text-sm font-medium hover:underline cursor-pointer bg-transparent border-none"
                    style={{ color: 'var(--header-text)' }}>
                    <Heart size={18} />
                </button>

                <button onClick={() => navigate('/cart')}
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full cursor-pointer border-none"
                    style={{ backgroundColor: 'var(--cta)', color: 'var(--text)' }}>

                    <ShoppingCart size={18} />
                </button>
            </div>

        </header>
    );
};

export default Header;