'use client';

import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import BoldIcon from '@/assets/icons/ic-writing-bold.svg';
import ItalicIcon from '@/assets/icons/ic-writing-italic.svg';
import UnderlineIcon from '@/assets/icons/ic-writing-underline.svg';
import AlignLeftIcon from '@/assets/icons/ic-alignment-left.svg';
import AlignCenterIcon from '@/assets/icons/ic-alignment-center.svg';
import AlignRightIcon from '@/assets/icons/ic-alignment-right.svg';
import BulletIcon from '@/assets/icons/ic-writing-bullet.svg';
import NumberingIcon from '@/assets/icons/ic-writing-numbering.svg';

const Divider = () => (
  <div className="w-px h-5 md:h-6 bg-gray-200 mx-0.5 md:mx-1 flex-shrink-0" />
);

const ToolbarButton = ({ 
  isActive, 
  onClick, 
  disabled, 
  icon: Icon, 
  wrapperClassName = '',
  iconClassName = 'w-5 h-5 md:w-6 md:h-6',
  isImageIcon = false
}) => {
  if (isImageIcon) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 md:h-10 md:w-10 flex items-center justify-center p-0.5 md:p-1 overflow-visible flex-shrink-0 ${isActive ? 'bg-gray-200' : ''} ${wrapperClassName}`}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className={`${iconClassName} flex-shrink-0`} />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-8 w-8 md:h-10 md:w-10 flex items-center justify-center overflow-visible flex-shrink-0 ${isActive ? 'bg-gray-200' : ''} ${wrapperClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6">
        <Icon className="w-full h-full" style={{ display: 'block', lineHeight: 0 }} />
      </div>
    </Button>
  );
};

export default function EditorToolbar({ editor, onUpdate }) {
  const handleCommand = (command) => {
    if (!editor) return;
    command(editor);
    onUpdate?.();
  };

  const toolbarButtons = [
    {
      icon: BoldIcon,
      isActive: () => editor?.isActive('bold'),
      command: (editor) => editor.chain().focus().toggleBold().run(),
    },
    {
      icon: ItalicIcon,
      isActive: () => editor?.isActive('italic'),
      command: (editor) => editor.chain().focus().toggleItalic().run(),
    },
    {
      icon: UnderlineIcon,
      isActive: () => editor?.isActive('underline'),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      className: 'p-0.5 md:p-1',
      iconClassName: 'w-5 h-5 md:w-6 md:h-6',
    },
    { type: 'divider' },
    {
      icon: AlignLeftIcon,
      isActive: () => editor?.isActive({ textAlign: 'left' }),
      command: (editor) => editor.chain().focus().setTextAlign('left').run(),
      className: 'p-0.5 md:p-1',
      iconClassName: 'w-5 h-5 md:w-6 md:h-6',
    },
    {
      icon: AlignCenterIcon,
      isActive: () => editor?.isActive({ textAlign: 'center' }),
      command: (editor) => editor.chain().focus().setTextAlign('center').run(),
      className: 'p-0.5 md:p-1',
      iconClassName: 'w-5 h-5 md:w-6 md:h-6',
    },
    {
      icon: AlignRightIcon,
      isActive: () => editor?.isActive({ textAlign: 'right' }),
      command: (editor) => editor.chain().focus().setTextAlign('right').run(),
      className: 'p-0.5 md:p-1',
      iconClassName: 'w-5 h-5 md:w-6 md:h-6',
    },
    { type: 'divider' },
    {
      icon: BulletIcon,
      isActive: () => editor?.isActive('bulletList'),
      command: (editor) => editor.chain().focus().toggleBulletList().run(),
      className: 'p-0.5 md:p-1',
      iconClassName: 'w-5 h-5 md:w-6 md:h-6',
    },
    {
      icon: NumberingIcon,
      isActive: () => editor?.isActive('orderedList'),
      command: (editor) => editor.chain().focus().toggleOrderedList().run(),
      className: 'p-0.5 md:p-1',
      iconClassName: 'w-5 h-5 md:w-6 md:h-6',
    },
    { type: 'divider' },
    {
      icon: Image,
      isActive: () => false,
      command: (editor) => {
        const url = window.prompt('이미지 URL을 입력하세요:');
        if (url) {
          editor.chain().focus().setImage({ src: url }).run();
        }
      },
      className: 'p-0.5 md:p-1',
      iconClassName: 'w-5 h-5 md:w-6 md:h-6',
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-1.5 md:p-2 mb-4 flex items-center gap-0.5 md:gap-1 overflow-x-auto">
      {toolbarButtons.map((button, index) => {
        if (button.type === 'divider') {
          return <Divider key={`divider-${index}`} />;
        }

        return (
          <ToolbarButton
            key={`toolbar-${index}`}
            isActive={button.isActive()}
            onClick={() => handleCommand(button.command)}
            disabled={!editor}
            icon={button.icon}
            wrapperClassName={button.className || ''}
            iconClassName={button.iconClassName || 'w-5 h-5 md:w-6 md:h-6'}
            isImageIcon={button.icon === Image}
          />
        );
      })}
    </div>
  );
}

