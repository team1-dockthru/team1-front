'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import './editor.css';

export default function RichTextEditor({ content, onChange, placeholder = '번역 내용을 적어주세요', onEditorReady, onSelectionUpdate }) {
  // 콜백 함수들을 ref로 저장하여 useEditor가 매번 재생성되지 않도록 최적화
  const onChangeRef = useRef(onChange);
  const onSelectionUpdateRef = useRef(onSelectionUpdate);
  const onEditorReadyRef = useRef(onEditorReady);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onSelectionUpdateRef.current = onSelectionUpdate;
  }, [onSelectionUpdate]);

  useEffect(() => {
    onEditorReadyRef.current = onEditorReady;
  }, [onEditorReady]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: 'left',
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content,
    immediatelyRender: false, // SSR 환경에서 hydration 불일치 방지
    onUpdate: ({ editor }) => {
      onChangeRef.current?.(editor.getHTML());
    },
    onSelectionUpdate: () => {
      // 선택 영역이 변경될 때마다 부모 컴포넌트에 알림
      onSelectionUpdateRef.current?.();
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[600px] px-4 py-2 text-base leading-relaxed',
      },
    },
  });

  // editor가 준비되면 부모 컴포넌트에 전달 (한 번만)
  useEffect(() => {
    if (editor && onEditorReadyRef.current) {
      onEditorReadyRef.current(editor);
    }
  }, [editor]); // editor만 dependency로 하여 한 번만 호출

  // content prop이 변경되면 에디터 내용 업데이트
  useEffect(() => {
    if (editor && content !== undefined && editor.getHTML() !== content) {
      editor.commands.setContent(content, false); // emitUpdate: false로 설정하여 무한 루프 방지
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <EditorContent editor={editor} />
    </div>
  );
}
