import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";

function TableOfContent({ content }) {
    const [openTable, setTableOpen] = useState(true);
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const contentRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        if (content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            
            const headingElements = Array.from(tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            
            const processedHeadings = headingElements.map((heading, index) => {
                let id = heading.id;
                if (!id) {
                    id = `section-${index}-${heading.textContent
                        .toLowerCase()
                        .replace(/[^\w\s]/g, '')
                        .replace(/\s+/g, '-')}`;
                }
                return {
                    text: heading.textContent,
                    id: id,
                    level: parseInt(heading.tagName.substring(1))
                };
            });

            setHeadings(processedHeadings);
            tempDiv.remove();
        }
    }, [content]);

    useEffect(() => {
        // Set up IntersectionObserver to track which heading is in view
        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        observerRef.current = new IntersectionObserver(callback, {
            rootMargin: '-100px 0px -50% 0px', // Adjust these values to fine-tune when a heading is considered "active"
            threshold: 1.0
        });

        // Observe all headings
        headings.forEach(heading => {
            const element = document.getElementById(heading.id);
            if (element) {
                observerRef.current.observe(element);
            }
        });

        // Clean up observer on unmount
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [headings]);

    useEffect(() => {
        // Ensure content headings have proper IDs
        if (headings.length > 0) {
            const contentElement = document.querySelector('.blog_content');
            if (contentElement) {
                headings.forEach((heading, index) => {
                    const domHeading = contentElement.querySelector(`h${heading.level}:nth-of-type(${index + 1})`);
                    if (domHeading && !domHeading.id) {
                        domHeading.id = heading.id;
                    }
                });
            }
        }
    }, [headings]);

    const scrollToHeading = (id, event) => {
        event.preventDefault();
        setActiveId(id); // Immediately set as active when clicked
        
        let element = document.getElementById(id);
        if (!element) {
            setTimeout(() => {
                element = document.getElementById(id);
                if (element) {
                    performScroll(element);
                }
            }, 100);
            return;
        }
        
        performScroll(element);
    };

    const performScroll = (element) => {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        window.history.pushState(null, null, `#${element.id}`);
    };

    return (
        <div className='sticky z-40 top-5'>
            <div className='bg-white rounded-lg border shadow overflow-hidden'>
                <div 
                    className='flex items-center justify-between p-4 cursor-pointer'
                    onClick={() => setTableOpen(!openTable)}
                >
                    <h5 className='text-lg font-semibold'>Table of Contents</h5>
                    <IoIosArrowDown className={`transition-transform ${openTable ? 'rotate-180' : ''}`} />
                </div>
                
                {openTable && (
                    <div className='border-t max-h-96 overflow-y-auto'>
                        <ul className='p-4 space-y-2'>
                            {headings.map((heading, index) => (
                                <li 
                                    key={`${heading.id}-${index}`} 
                                    className={`text-sm hover:text-[#4440E6] cursor-pointer transition-colors ${
                                        heading.level === 1 ? 'pl-0 font-semibold' : 
                                        heading.level === 2 ? 'pl-2' : 
                                        'pl-4'
                                    } ${
                                        activeId === heading.id ? 'text-[#4440E6] font-medium' : 'text-gray-700'
                                    }`}
                                >
                                    <a 
                                        href={`#${heading.id}`}
                                        onClick={(e) => scrollToHeading(heading.id, e)}
                                        className=' hover:underline hover:text-[#4440E6] flex items-start'
                                    >
                                        <span style={{fontSize:'15px'}} className={`mr-2 min-w-[20px] ${
                                            activeId === heading.id ? 'text-[#FF6B00]' : 'text-gray-500'
                                        }`}>
                                            {index + 1}.
                                        </span>
                                        <span style={{fontSize:'15px'}}>
                                            {heading.text.length > 30 
                                                ? `${heading.text.substring(0, 30)}...` 
                                                : heading.text}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TableOfContent;