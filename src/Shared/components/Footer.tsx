import {  Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Logo from "./Logo"

const Footer = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const isLoggedIn = token && user;

    return (
        <footer
            className="w-full mt-20 border-t" 
            style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Company Info */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <Logo width={160} />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-500 max-w-xs">
                        Elevate your shopping experience with curated collections and premium products delivered right to your door.
                    </p>
                    <div className="flex items-center gap-4">
                        {/* Placeholder for Social Icons if needed */}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                        Quick Links
                    </h3>
                    <div className="flex flex-col gap-3 items-start">
                        {['Home', 'About', 'Cart', 'Add Product'].map((link) => (
                            <button
                                key={link}
                                onClick={() => navigate(`/${link.toLowerCase().replace(' ', '')}`)}
                                className="text-sm text-slate-500 transition-colors hover:text-indigo-600 hover:translate-x-1 duration-200 transform"
                            >
                                {link}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Customer Service */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                        Support
                    </h3>
                    <div className="flex flex-col gap-3 items-start">
                        {['FAQ', 'Shipping Policy', 'Return Policy', 'Track Order'].map((item) => (
                            <button
                                key={item}
                                className="text-sm text-slate-500 transition-colors hover:text-indigo-600 hover:translate-x-1 duration-200 transform"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                        Contact Us
                    </h3>
                    <div className="flex flex-col gap-4">
                        <a href="mailto:sh.wahid2002@gmail.com" className="flex items-center gap-3 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                            <div className="p-2 bg-slate-50 rounded-lg"><Mail size={16} /></div>
                            sh.wahid2002@gmail.com
                        </a>
                        <a href="tel:+917006944631" className="flex items-center gap-3 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                            <div className="p-2 bg-slate-50 rounded-lg"><Phone size={16} /></div>
                            +91 7006944631
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>© 2026 eCOM Marketplace. Built with passion.</p>
                    <div className="flex items-center gap-8">
                        <span className="cursor-pointer hover:text-indigo-600 transition-colors">Privacy Policy</span>
                        <span className="cursor-pointer hover:text-indigo-600 transition-colors">Terms of Service</span>
                        <span className="font-medium text-slate-900">Developed by Wahid</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;