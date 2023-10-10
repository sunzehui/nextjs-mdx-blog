import { useEffect, useState } from 'react';

function useLastVisibleElementIndex(elements: HTMLElement[]) {
  const [lastVisibleIndex, setLastVisibleIndex] = useState(-1);

  useEffect(() => {
    function handleScroll() {

      const overEles = []
      elements.forEach((element, index) => {
        const elOffsetY = element.offsetTop;

        const isOver = (
          elOffsetY <= (window.scrollY + window.innerHeight)
        );
        if (isOver) {
          overEles.push(index)
        }
      });

      // 设置最后一个可见元素的下标
      setLastVisibleIndex(overEles.length - 1);
    }

    // 监听滚动事件
    window.addEventListener('scroll', handleScroll);

    // 初始计算一次
    handleScroll();

    // 在组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elements]);

  return lastVisibleIndex;
}

export default useLastVisibleElementIndex;
