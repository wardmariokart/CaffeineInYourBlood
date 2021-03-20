import { useLayoutEffect, useState } from 'react';

const useWindowSize = () => {

    const [windowSize, setWindowSize] = useState({widthPx: 0, heightPx: 0});
    
    
    useLayoutEffect(() => {
        
        const resizeBroadcast = () => {
            setWindowSize({widthPx: window.inneWidth, heightPx: window.innerHeight});
        }
        window.addEventListener('resize', resizeBroadcast);
        resizeBroadcast();
        
        return () => window.removeEventListener('resize', resizeBroadcast);
    }, []);

    return windowSize;
}

export default useWindowSize;