/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */

'use client';

import { ComponentProps, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { Button } from '../../../components/ui/button';
import { cn } from '../../../lib/utils';
import { darkContrast, hexToRgba } from '../../../utils/Color';

export type ColorPickerProps = Omit<ComponentProps<typeof HexColorPicker>, 'color'> & {
  value: string;
};

export function ColorPicker({ value: color, ...props }: ColorPickerProps) {
  const [isOpened, setIsOpened] = useState(false);

  const applyLightBorder = darkContrast(hexToRgba(color));

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          'aspect-square w-12 rounded-md border-2 shadow-inner',
          applyLightBorder && 'border-foreground',
          !applyLightBorder && 'border-muted-foreground',
        )}
        style={{ backgroundColor: color }}
        onClick={() => setIsOpened(true)}
      />

      {isOpened && (
        <div className="absolute z-10">
          <HexColorPicker color={color} {...props} />

          <Button type="button" variant="secondary" onClick={() => setIsOpened(false)} className="w-full">
            Ok
          </Button>
        </div>
      )}
    </div>
  );
}
