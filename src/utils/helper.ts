import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export const clsxm = (...args: any[]) => {
  return twMerge(clsx(args))
}
function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}
export function smoothScroll(hash: `#${string}`) {
  // 根据 hash 获取目标元素
  const title = hash.replace('#', '')
  const selector = decodeURIComponent(title);
  const target = document.getElementById(selector);

  if (!target) return;

  // 目标元素距离页面顶部的scrollTop值
  const targetScrollTop = target.offsetTop;

  // 当前的scrollTop值
  let currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  const startTime = Date.now();
  function scroll() {
    const elapsedTime = Date.now() - startTime;

    // 计算当前进度 
    const progress = elapsedTime / 800;

    // 根据 easedSine 计算当前滚动距离
    const deltaScrollTop = targetScrollTop * easeOutSine(progress);

    currentScrollTop = deltaScrollTop;
    window.scrollTo(0, currentScrollTop);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  scroll();
}
