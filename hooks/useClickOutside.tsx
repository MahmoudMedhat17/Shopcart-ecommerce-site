// This is a custom hook to ref for areas that need to use ref on it.

import { useEffect, useRef } from "react";

// A function that takes a T Generic and callBack function as an argument
function useClickOutside<T extends HTMLElement>(callBack: () => void) {
    // Defining a Ref.
    const ref = useRef<T>(null);

    useEffect(() => {
        // A function that handles Ref that takes e as an argument
        const handleRef = (e: MouseEvent) => {
            // Condition if the Ref is available and is not available too "Sidebar which black background is available and the black background with shadow doesn't has a ref so when user clicks on the shadow background it closes".
            if (ref.current && !ref.current.contains(e.target as Node)) {
                // Return the function that the useClickOutside takes.
                return callBack();
            }
        };

        document.addEventListener("click", handleRef);

        return () => document.removeEventListener("click", handleRef);
        // useEffect relays on the callBack function that the useClickOutside takes.
    }, [callBack]);

    // Return the value of the Ref.
    return ref;
}

export default useClickOutside;