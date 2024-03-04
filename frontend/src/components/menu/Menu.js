import React, { useRef, useState, useEffect, createRef, useContext } from 'react';
import './Menu.css';
import { gsap } from 'gsap';
import { LoginContext } from '../../contexts/LoginContext';


const Menu = ({ items, handleLogout }) => {
    const $root = useRef();
    const $indicator1 = useRef();
    const $indicator2 = useRef();
    const $items = useRef(items.map(createRef));
    const [active, setActive] = useState(0);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const { loginInfo, setLoginInfo } = useContext(LoginContext);

    const animate = () => {
        const menuOffset = $root.current.getBoundingClientRect();
        const activeItem = $items.current[active].current;
        const { width, height, top, left } = activeItem.getBoundingClientRect();

        const settings = {
            x: left - menuOffset.x,
            y: top - menuOffset.y,
            width: width,
            height: height,
            backgroundColor: items[active].color,
            ease: 'elastic.out(.7, .7)',
            duration: 0.8
        };

        gsap.to($indicator1.current, {
            ...settings
        });

        gsap.to($indicator2.current, {
            ...settings,
            duration: 1
        });
    };

    useEffect(() => {
        animate();
        window.addEventListener('resize', animate);

        return () => {
            window.removeEventListener('resize', animate);
        };
    }, [active]);

    const handleItemClick = (index) => {
        setActive(index);


        switch (items[index].name) {
            case "About":
                window.location.href = "/about";
                break;
            case "LogOut":
                handleLogout();
                break;
            case "MyPage":
                window.location.href = `/member-service/detail/${loginInfo.LOGINER}`;
                break;
            case "LogIn":
                window.location.href = "/member-service/login";
                break;
            case "작품등록":
                window.location.href = "/item-service/insert";
                break;
            case "GALLERY":
                window.location.href = "/item-service/list";
                break;
            case "CONTACT":
                window.location.href = "/contact";
                break;
            default:
                console.log(`Unhandled menu item: ${items[index].name}`);
        }
    };
    return (
        <div ref={$root} className="menu">
            <div
                className={`hamburger-menu ${isMouseOver ? 'open' : ''}`}
                onMouseEnter={() => setIsMouseOver(true)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div
                className={`menu-items ${isMouseOver ? 'open' : ''}`}
                onMouseLeave={() => setIsMouseOver(false)}
            >
                {items.map((item, index) => (
                    <a
                        key={item.name}
                        ref={$items.current[index]}
                        className={`item ${active === index ? 'active' : ''}`}
                        onMouseEnter={() => {
                            setActive(index);
                        }}
                        onClick={() => handleItemClick(index)}
                        href={item.href}
                    >
                        {item.name}
                    </a>
                ))}
            </div>
            <div ref={$indicator1} className="indicator" />
            <div ref={$indicator2} className="indicator" />
        </div>
    );
};

export default Menu;
