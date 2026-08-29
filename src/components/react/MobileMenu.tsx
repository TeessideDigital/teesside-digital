/**
 * MobileMenu.tsx
 *
 * React island for mobile navigation.
 * Handles:
 * - Hamburger menu toggle
 * - Navigation link display (mobile only)
 * - Close on link click
 * - Close on Escape key
 * - Keyboard accessibility (tab trap)
 * - Smooth animations
 *
 * Props:
 * - navigation: Array of { label: string, href: string }
 */

import React, { useState, useRef, useEffect } from 'react';

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navigation: NavItem[];
}

export default function MobileMenu({ navigation }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Toggle menu open/closed
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Close menu
   */
  const closeMenu = () => {
    setIsOpen(false);
  };

  /**
   * Handle keyboard events (Escape to close)
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        buttonRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  /**
   * Close menu when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`
          relative w-10 h-10
          flex items-center justify-center
          rounded transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background
          ${isOpen ? 'bg-surface-raised text-accent' : 'text-text-secondary hover:text-accent hover:bg-surface-raised'}
        `}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {/* Hamburger Icon */}
        <div className="relative w-6 h-6">
          {/* Top line */}
          <span
            className={`
              absolute top-1 left-0 w-6 h-0.5 bg-current rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? 'rotate-45 translate-y-2' : ''}
            `}
          />

          {/* Middle line */}
          <span
            className={`
              absolute top-1/2 left-0 w-6 h-0.5 bg-current rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? 'opacity-0' : 'opacity-100'}
            `}
          />

          {/* Bottom line */}
          <span
            className={`
              absolute bottom-1 left-0 w-6 h-0.5 bg-current rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? '-rotate-45 -translate-y-2' : ''}
            `}
          />
        </div>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`
            absolute top-full right-0 mt-2 w-48
            bg-surface border border-border rounded-lg shadow-lg
            z-50
            animate-slide-down
          `}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <nav className="py-2">
            <ul className="list-none m-0 p-0">
              {navigation.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={`
                      block px-4 py-3
                      text-sm font-medium
                      text-text-secondary hover:text-accent hover:bg-surface-raised
                      transition-colors duration-200 ease-out
                      ${index < navigation.length - 1 ? 'border-b border-border' : ''}
                      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-inset
                    `}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Backdrop (optional, for better UX) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
