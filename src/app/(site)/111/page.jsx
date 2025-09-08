"use client"
import React, { useCallback, useMemo, useState } from "react";

const List = React.memo(({ items, onItemClick }) => {
    console.log("List rendered");
    return items.map((item, i) => (
        <div key={i} onClick={() => onItemClick(item)}>{item}</div>
    ));
});

export default function App() {
    const [count, setCount] = useState(0);

    const items = ["A", "B", "C"];
    const handleClick = useCallback((item) => {
        console.log("Clicked:", item);
    }, []);

    return (
        <p>Test deployment from GitHub ActionsS 🚀</p>

    );
}
