'use client';

import { useState, useCallback, use } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { Image } from 'lucide-react';
import Link from 'next/link';
import BoldIcon from '@/assets/icons/ic-writing-bold.svg';
import ItalicIcon from '@/assets/icons/ic-writing-italic.svg';
import UnderlineIcon from '@/assets/icons/ic-writing-underline.svg';
import AlignLeftIcon from '@/assets/icons/ic-alignment-left.svg';
import AlignCenterIcon from '@/assets/icons/ic-alignment-center.svg';
import AlignRightIcon from '@/assets/icons/ic-alignment-right.svg';
import BulletIcon from '@/assets/icons/ic-writing-bullet.svg';
import NumberingIcon from '@/assets/icons/ic-writing-numbering.svg';
import DocumentIcon from '@/assets/icons/ic-document.svg';
import LogoIcon from '@/assets/icons/logo.svg';
import ListIcon from '@/assets/icons/ic-list.svg';

export default function WorkPage({ params }) {
  // Next.js 16에서는 params가 Promise이므로 React.use()로 unwrap해야 합니다
  const { id } = use(params);
  const challengeId = id;
  const [title, setTitle] = useState('개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)');
  const [content, setContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editor, setEditor] = useState(null);
  const [updateKey, setUpdateKey] = useState(0); // 활성 상태 업데이트를 위한 카운터
  // 원문 데이터는 다른 페이지에서 받아올 예정
  const [sourceContent, setSourceContent] = useState('https://ui.shadcn.com/docs/components');

  const handleEditorReady = useCallback((editorInstance) => {
    setEditor(editorInstance);
  }, []);

  // 선택 영역이 변경될 때마다 리렌더링을 트리거 (카운터 증가로 강제 업데이트)
  const handleSelectionUpdate = useCallback(() => {
    setUpdateKey((prev) => prev + 1);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo and Title */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className={`max-w-4xl mx-auto flex items-center justify-between gap-4 ${isSidebarOpen ? 'mr-[616px]' : ''}`}>
            {/* Left: Logo and Title */}
            <div className="flex items-center gap-6 flex-1 min-w-0">
              <Link href="/" className="inline-flex items-center gap-2 flex-shrink-0">
                <LogoIcon className="w-[17.55px] h-[20.25px]" />
                <span className="text-gray-900 font-bold text-sm">Docthru</span>
              </Link>
              <div className="flex-1 max-w-3xl min-w-0">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-semibold border-none shadow-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent truncate"
                  placeholder="제목을 입력하세요"
                />
              </div>
            </div>
            {/* Right: Action Buttons */}
            <div className="flex gap-2 flex-shrink-0">
              <Button
                className="bg-pink-100 text-red-600 hover:bg-pink-200 hover:text-red-700 rounded-lg px-4 py-2 h-auto"
              >
                <DocumentIcon className="w-4 h-4 mr-2" />
                포기
              </Button>
              <Button variant="outline" className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50 rounded-lg px-4 py-2 h-auto">
                임시저장
              </Button>
              <Button variant="outline" className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-4 py-2 h-auto">
                제출하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-[616px]' : ''} max-w-4xl mx-auto px-6 py-6`}>
          {/* Formatting Toolbar */}
          <div className="bg-white border border-gray-200 rounded-lg p-2 mb-4 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center overflow-visible ${
                editor?.isActive('bold') ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().toggleBold().run();
                setUpdateKey((prev) => prev + 1); // 즉시 업데이트
              }}
              disabled={!editor}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <BoldIcon className="w-full h-full" style={{ display: 'block', lineHeight: 0 }} />
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center overflow-visible ${
                editor?.isActive('italic') ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().toggleItalic().run();
                setUpdateKey((prev) => prev + 1);
              }}
              disabled={!editor}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <ItalicIcon className="w-full h-full" style={{ display: 'block', lineHeight: 0 }} />
              </div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center p-1 overflow-visible ${
                editor?.isActive('underline') ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().toggleUnderline().run();
                setUpdateKey((prev) => prev + 1);
              }}
              disabled={!editor}
            >
              <UnderlineIcon className="w-6 h-6 flex-shrink-0" style={{ display: 'block', lineHeight: 0 }} />
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center p-1 overflow-visible ${
                editor?.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().setTextAlign('left').run();
                setUpdateKey((prev) => prev + 1);
              }}
              disabled={!editor}
            >
              <AlignLeftIcon className="w-6 h-6 flex-shrink-0" style={{ display: 'block', lineHeight: 0 }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center p-1 overflow-visible ${
                editor?.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().setTextAlign('center').run();
                setUpdateKey((prev) => prev + 1);
              }}
              disabled={!editor}
            >
              <AlignCenterIcon className="w-6 h-6 flex-shrink-0" style={{ display: 'block', lineHeight: 0 }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center p-1 overflow-visible ${
                editor?.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().setTextAlign('right').run();
                setUpdateKey((prev) => prev + 1);
              }}
              disabled={!editor}
            >
              <AlignRightIcon className="w-6 h-6 flex-shrink-0" style={{ display: 'block', lineHeight: 0 }} />
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center p-1 overflow-visible ${
                editor?.isActive('bulletList') ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().toggleBulletList().run();
                setUpdateKey((prev) => prev + 1);
              }}
              disabled={!editor}
            >
              <BulletIcon className="w-6 h-6 flex-shrink-0" style={{ display: 'block', lineHeight: 0 }} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center p-1 overflow-visible ${
                editor?.isActive('orderedList') ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().toggleOrderedList().run();
                setUpdateKey((prev) => prev + 1);
              }}
              disabled={!editor}
            >
              <NumberingIcon className="w-6 h-6 flex-shrink-0" style={{ display: 'block', lineHeight: 0 }} />
            </Button>
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 flex items-center justify-center p-1 overflow-visible"
              onClick={() => {
                // 이미지 업로드 기능은 추후 구현
                const url = window.prompt('이미지 URL을 입력하세요:');
                if (url) {
                  editor?.chain().focus().setImage({ src: url }).run();
                }
              }}
              disabled={!editor}
            >
              <Image className="w-6 h-6 flex-shrink-0" />
            </Button>
          </div>

          {/* Content Editor */}
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="번역 내용을 적어주세요"
            onEditorReady={handleEditorReady}
            onSelectionUpdate={handleSelectionUpdate}
          />
        </div>

        {/* Right Sidebar - Toggle 형태 */}
        <>
          {/* Toggle Button */}
          <div className="w-16 border-l border-gray-200 flex flex-col items-center pt-6">
            <button
              type="button"
              className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                isSidebarOpen ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <ListIcon className="w-5 h-5" />
            </button>
            <span className="mt-2 text-xs text-gray-500">원문</span>
          </div>

          {/* Sidebar Content */}
          {isSidebarOpen && (
            <div className="fixed right-0 top-0 h-full w-[600px] bg-white border-l border-gray-200 shadow-lg z-40 flex flex-col">
              {/* 접기 버튼 */}
              <button
                type="button"
                className="absolute top-4 right-4 z-50 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center bg-white border border-gray-200"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="원문 접기"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex-1 overflow-hidden">
                {sourceContent ? (
                  <iframe
                    src={sourceContent}
                    className="w-full h-full border-0"
                    title="원문 콘텐츠"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                  />
                ) : (
                  <div className="text-sm text-gray-500 text-center py-8 p-6">
                    원문이 표시됩니다
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

