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
            className=" w-full rounded-2xl mb-0.5  " 
            style={{
                backgroundColor: 'var(--footer-bg)',
                color: 'var(--footer-text)',
                border: "2px solid var(--border)",
                overflow:'auto'
                
            }}
        >

            <div className="grid grid-cols-4 gap-8 px-10 py-10">

                {/* Company Info */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center">
                                    <Logo width={140} />
                                </div>
                    <p className="text-xs" style={{ color: 'var(--footer-muted)' }}>
                        Your one stop shop for everything you need.
                    </p>
                </div>

            {isLoggedIn ?(
                <>
                  {/* Quick Links */}
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--footer-accent)' }}>
                        Quick Links
                    </h3>

                    {['Home', 'About', 'Cart', 'Add Product'].map((link) => (
                        <Button
                            key={link}
                            btnTxt={link}
                            onClick={() => navigate(`/${link.toLowerCase().replace(' ', '')}`)}
                            className="text-xs text-left bg-transparent border-none p-0 hover:text(--footer-text) text(--footer-muted)"
                        />
                    ))}
                </div>

                {/* Customer Service */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--footer-accent)' }}>
                        Customer Service
                    </h3>

                    {['FAQ', 'Shipping Policy', 'Return Policy', 'Track Order'].map((item) => (
                        <Button
                            key={item}
                            btnTxt={item}
                            className="text-xs text-left bg-transparent border-none p-0 hover:text(--footer-text) text(--footer-muted)"
                        />
                    ))}
                </div>
                </>
            ):(
                null
            )}
                {/* Contact */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--footer-accent)' }}>
                        Contact Us
                    </h3>
                    <p className="flex items-center gap-2 text-xs" style={{ color: 'var(--footer-muted)' }}>
                        <Mail size={14} /> sh.wahid2002@gmail.com
                    </p>
                    <p className="flex items-center gap-2 text-xs" style={{ color: 'var(--footer-muted)' }}>
                        <Phone size={14} /> +91 7006944631
                    </p>
                </div>

            </div>

            {/* Bottom Bar */}
            <div
                className="flex items-center justify-between px-10 py-4 text-xs"
                style={{ borderTop: '1px solid var(--footer-border)', color: 'var(--footer-muted)' }}
            >
                <p>© 2026 eCOM. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    
                    <span>Made by Wahid</span>
                </div>
            </div>

        </footer>
    );
};

export default Footer;