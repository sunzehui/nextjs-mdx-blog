'use client'
import useProgress from '@/hooks/useProgress';
import useScrollSpy from '@/hooks/useScrollSpy';
import { clsxm } from '@/utils/helper';
import { useReducedMotion, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ProgressBar from './progress-bar';

/**
 * This offset is meant for the smooth scrolling and
 * Scrollspy to take into account the header height
 */
const TableOfContent = () => {
  const [ids, setIds] = useState<Array<{ id: string; title: string }>>(
    []
  );

  useEffect(() => {
    /**
     * Working around some race condition quirks :) (don't judge)
     * TODO @MaximeHeckel: see if there's a better way through a remark plugin to do this
     */
    setTimeout(() => {
      const titles = document.querySelectorAll('h2');
      const idArrays = Array.prototype.slice
        .call(titles)
        .map((title) => ({ id: title.id, title: title.innerText })) as Array<{
          id: string;
          title: string;
        }>;
      setIds(idArrays);
    }, 500);
  }, []);


  const shouldReduceMotion = useReducedMotion();
  const readingProgress = useProgress();

  /**
   * Only show the table of content between 7% and 95%
   * of the page scrolled.
   */
  const shouldShowTableOfContent =
    readingProgress > 0.02 && readingProgress < 0.95;

  /**
   * Variants handling hidding/showing the table of content
   * based on the amount scrolled by the reader
   */
  const variants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: (shouldShowTableOfContent: boolean) => ({
      opacity: shouldReduceMotion || shouldShowTableOfContent ? 1 : 0,
    }),
  };

  /**
   * Handles clicks on links of the table of content and smooth
   * scrolls to the corresponding section.
   * @param {React.MouseEvent} event the click event
   * @param {string} id the id of the section to scroll to
   */
  const handleLinkClick = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    console.log('click', id);

    const element = document.getElementById(id)!;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;

    /**
     * Note @MaximeHeckel: This doesn't work on Safari :(
     * TODO: find an alternative for Safari
     */
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  };
  /**
   * Get the index of the current active section that needs
   * to have its corresponding title highlighted in the
   * table of content
   */
  const [currentActiveIndex] = useScrollSpy(
    ids.map(
      (item) => document.querySelector(`[id="${item.id}"]`)!
    ),
  );

  return (
    <motion.div
      style={{
        width: 'calc(calc(100vw - 1024px) / 2 )'
      }}
      className='fixed desktop:flex hidden pl-3 left-3 top-1/2 -translate-y-1/2' hidden={!shouldShowTableOfContent}>
      <ProgressBar progress={readingProgress} />

      {ids.length > 0 ? (
        <ul className='flex flex-col space-y-4 ml-3'>
          {ids.map((item, index) => {
            return (
              <motion.li
                initial="hide"
                className={clsxm({
                  'text-blue-500': currentActiveIndex === index
                })}
                variants={variants}
                animate="show"
                transition={{ type: 'spring' }}
                key={item.id}
                custom={shouldShowTableOfContent}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(event) =>
                    handleLinkClick(event, item.id)
                  }
                >
                  {item.title}
                </a>
              </motion.li>
            );
          })}
        </ul>
      ) : null}
    </motion.div>
  );
};

export default TableOfContent;
