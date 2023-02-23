import { useState, useEffect } from 'react';

import { Droppable } from 'react-beautiful-dnd';

/** 
 * This component is used to prevent "Cannot find droppable entry id" error
 */
const StrictModeDroppable = (props) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        }
    }, []);

    if (!enabled) {
        return null;
    }

    return (
        <Droppable {...props}>{props.children}</Droppable>
    )
}

export default StrictModeDroppable;