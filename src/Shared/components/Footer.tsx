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
            <div className="grid grid-cols-1 gap-12 px-6 py-16 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-4">
                {/* Company Info */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <Logo width={160} />
                    </div>
                    <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                        Elevate your shopping experience with curated collections and premium products delivered right to your door.
                    </p>
                    <div className="flex items-center gap-4">
                        {/* Placeholder for Social Icons if needed */}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-slate-900">
                        Quick Links
                    </h3>
                    <div className="flex flex-col items-start gap-3">
                        {['Home', 'About', 'Cart', 'Add Product'].map((link) => (
                            <button
                                key={link}
                                onClick={() => navigate(`/`)}
                                className="text-sm transition-colors duration-200 transform text-slate-500 hover:text-indigo-600 hover:translate-x-1"
                            >
                                {link}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Customer Service */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-slate-900">
                        Support
                    </h3>
                    <div className="flex flex-col items-start gap-3">
                        {['FAQ', 'Shipping Policy', 'Return Policy', 'Track Order'].map((item) => (
                            <button
                                key={item}
                                className="text-sm transition-colors duration-200 transform text-slate-500 hover:text-indigo-600 hover:translate-x-1"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-5">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-slate-900">
                        Contact Us
                    </h3>
                    <div className="flex flex-col gap-4">
                        <a href="mailto:sh.wahid2002@gmail.com" className="flex items-center gap-3 text-sm transition-colors text-slate-500 hover:text-indigo-600">
                            <div className="p-2 rounded-lg bg-slate-50"><Mail size={16} /></div>
                            sh.wahid2002@gmail.com
                        </a>
                        <a href="tel:+917006944631" className="flex items-center gap-3 text-sm transition-colors text-slate-500 hover:text-indigo-600">
                            <div className="p-2 rounded-lg bg-slate-50"><Phone size={16} /></div>
                            +91 7006944631
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex flex-col items-center justify-between gap-4 px-6 py-8 mx-auto text-sm max-w-7xl md:flex-row text-slate-500">
                    <p>© 2026 eCOM Marketplace. Built with passion.</p>
                    <div className="flex items-center gap-8">
                        <span className="transition-colors cursor-pointer hover:text-indigo-600">Privacy Policy</span>
                        <span className="transition-colors cursor-pointer hover:text-indigo-600">Terms of Service</span>
                        <span className="font-medium text-slate-900">Developed by Wahid</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;