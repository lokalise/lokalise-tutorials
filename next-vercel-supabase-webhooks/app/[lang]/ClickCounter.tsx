// src/components/ClickCounter.tsx
'use client';

import { useState, useCallback } from 'react';

type Props = {
  buttonText: string;
  pluralText: (count: number) => string;
};

export default function ClickCounter({ buttonText, pluralText }: Props) {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <button
        onClick={handleClick}
        aria-label={`${buttonText}, clicked ${count} time${count !== 1 ? 's' : ''}`}
      >
        {buttonText}
      </button>
      <p aria-live="polite">{pluralText(count)}</p>
    </div>
  );
}
