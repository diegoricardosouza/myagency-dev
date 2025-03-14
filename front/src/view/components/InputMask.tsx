import { useMask } from '@react-input/mask';
import { Input } from './ui/input';

interface InputMaskProps {
  mask: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  readOnly?: boolean;
}

export function InputMask({ mask, value, onChange, error, readOnly = false }: InputMaskProps) {
  const inputRef = useMask({ mask: mask, replacement: { _: /\d/ }, showMask: true });

  return (
    <>
      <Input ref={inputRef} value={value} onChange={onChange} error={error} readOnly={readOnly} />
    </>
  );
}
