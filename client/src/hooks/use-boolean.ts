import { useState, useCallback } from "react";


interface UseBooleanReturn {
  value: boolean;
  onTrue: () => void;
  onFalse: () => void;
  onToggle: () => void;
  setValue: (value: boolean) => void;
}

export function useBoolean(defaultValue: boolean = false): UseBooleanReturn {
  const [value, setValue] = useState<boolean>(defaultValue);

  const onTrue = useCallback(() => {
    setValue(true);
  }, []);

  const onFalse = useCallback(() => {
    setValue(false);
  }, []);

  const onToggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
}
