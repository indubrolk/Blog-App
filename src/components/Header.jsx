import React from "react";
import { images } from "../constants/index.js"; // Importing as a named export

const Header = () => {
    return (
        <section>
            <header className="container mx-auto px-5 flex justify-between"> {/* Changed Header to lowercase 'header' (React components should not use the same name for elements) */}
                <div className="h-10 w-10">
                    <img src={images.logo} alt="Logo" />
                </div>
                <div className="flex gap-x-5">
                    <ul className="flex gap-x-5">
                        <li>
                            <a href="">Home</a>
                        </li>
                        <li>
                            <a href="">Articles</a>
                        </li>
                        <li>
                            <a href="">Pages</a>
                        </li>
                        <li>
                            <a href="">FAQ</a>
                        </li>
                    </ul>
                    <button>Sign In</button>
                </div>
            </header>
        </section>
    );
};

export default Header;
