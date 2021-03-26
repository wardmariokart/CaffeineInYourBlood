import { useEffect, useState } from 'react';

const useRefSize = (myRef) => {

    const [refSize, setRefSize] = useState({widthPx: 1, heightPx: 1});
    
    useEffect(() => {
        
        const resizeBroadcast = () => {
            if (myRef) {
                setRefSize({widthPx: myRef.current.offsetWidth, heightPx: myRef.current.offsetHeight});
            }
        }
        resizeBroadcast();
        window.addEventListener('resize', resizeBroadcast);
        return () => window.removeEventListener('resize', resizeBroadcast);
    }, [myRef]);

    return refSize;
}

export default useRefSize;