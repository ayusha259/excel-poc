'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from "./page.module.css"

const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
    "Category 9",
    "Category 10",
    "Category 11",
    "Category 12",
    "Category 13",
    "Category 14",
    "Category 15",
    "",
    ""
]

const ScrollEffect = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Middle element is initially the 3rd one
  console.log("🚀 ~ ScrollEffect ~ activeIndex:", activeIndex)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isKey, setIsKey] = useState(false)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!containerRef.current) return;
    setIsKey(true)

    const container = containerRef.current;
    if (event.key === 'ArrowDown') {
      container.scrollBy({ top: container.clientHeight / 5, behavior: 'smooth' });
      if(activeIndex < (categories.length - 2)) {
        setActiveIndex(prev => prev + 1)
      }
    } else if (event.key === 'ArrowUp') {
      container.scrollBy({ top: -container.clientHeight / 5, behavior: 'smooth' });
      if(activeIndex > 0) {
        setActiveIndex(prev => prev - 1)
      }
    }
  };

  const handleScroll = (e: Event) => {
    if (!containerRef.current) return;
    e.preventDefault()
    setIsKey(false)
    if(isKey) return
    const elements = Array.from(containerRef.current.querySelectorAll(`.${styles.category}`));
    const containerCenter = containerRef.current.clientHeight / 2;

    let closestElementIndex = -1;
    let closestDistance = Infinity;

    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(containerCenter - elementCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestElementIndex = index;
      }
    });

    setActiveIndex(closestElementIndex);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeyDown)
      }
    };
  }, []);
  return (
    <div className={styles.scroll_container}>
        <div className={styles.scroll_side} ref={containerRef}>
            {categories.map((c, index) => <div data-index={index} key={index} className={`${styles.category} ${index === activeIndex ? styles.active : ''}`}>{c}</div>)}
        </div>
    </div>
  )
}

export default ScrollEffect