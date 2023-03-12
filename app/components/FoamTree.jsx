import { useEffect, useRef } from "react";
import { FoamTree } from '@carrotsearch/foamtree';

function FoamTreeMap() {
    const element = useRef(null);
    const foamtree = useRef(null);
    useEffect(() => {
        foamtree.current = new FoamTree({
            element: element.current,
            pixelRatio: window.devicePixelRatio || 1,
            dataObject: {
                groups: [
                    { label: "Hello", weight: 10 },
                    { label: "world!", weight: 5 },
                    {},
                    {},
                    {},
                    {},
                    {} // some empty groups to fill the space
                ]
            }
        });
        return () => {
            if (foamtree.current) {
                foamtree.current.dispose();
            }
        };
    }, []);

    return <div className="FoamTree" ref={element} />;
};

export default memo(FoamTreeMap);