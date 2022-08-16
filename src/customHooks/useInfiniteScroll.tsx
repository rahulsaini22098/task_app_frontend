import { useCallback, useRef } from 'react'

interface IntersectionOptions{
    root: any,
    rootMargin: string,
    threshold: number
}

function useInfiniteScroll(hasMore: boolean, loading: boolean, onIntersectionCallback: () => void){
  const observer = useRef<IntersectionObserver>()
  const lastElementRef = useCallback((node: HTMLDivElement) =>{
    
    if(loading) return

    if(observer.current) observer.current.disconnect()

    const options: IntersectionOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    observer.current = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting && hasMore){
        onIntersectionCallback()   
      }
    }, options)

    if(node) observer.current.observe(node)
  }, [loading, hasMore])

  return { lastElementRef }
}

export default useInfiniteScroll
