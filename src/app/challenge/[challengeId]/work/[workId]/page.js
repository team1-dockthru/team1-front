'use client';

import { useState, useCallback, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

const STORAGE_KEY = 'work_drafts';

export default function WorkPage({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const { challengeId, workId } = use(params);
  const [title, setTitle] = useState('개발자로써 자신만의 브랜드를 구축하는 방법(dailydev)');
  const [content, setContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editor, setEditor] = useState(null);
  const [updateKey, setUpdateKey] = useState(0);
  const [hasDraft, setHasDraft] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftList, setDraftList] = useState([]);
  const [sourceContent, setSourceContent] = useState('https://ui.shadcn.com/docs/components');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const draftsForWork = drafts.filter((d) => d.challengeId === challengeId && d.workId === workId);
      setHasDraft(draftsForWork.length > 0);
      setDraftList(draftsForWork);
    }
  }, [challengeId, workId]);

  const handleEditorReady = useCallback((editorInstance) => {
    setEditor(editorInstance);
  }, []);

  const handleSelectionUpdate = useCallback(() => {
    setUpdateKey((prev) => prev + 1);
  }, []);

  const handleGiveUp = useCallback(() => {
    if (confirm('작성 중인 내용이 모두 삭제됩니다. 정말 포기하시겠습니까?')) {
      setTitle('');
      setContent('');
      if (editor) {
        editor.commands.clearContent();
      }
      router.push(`/challenge/${challengeId}`);
    }
  }, [editor, router, challengeId]);

  const handleSaveDraft = useCallback(() => {
    if (typeof window !== 'undefined') {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      
      const draftData = {
        draftId: `${challengeId}_${workId}_${Date.now()}`,
        challengeId,
        workId,
        title,
        content,
        savedAt: new Date().toISOString(),
      };

      drafts.push(draftData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
      const draftsForWork = drafts.filter((d) => d.challengeId === challengeId && d.workId === workId);
      setDraftList(draftsForWork);
      setHasDraft(true);
      alert('임시저장되었습니다.');
    }
  }, [challengeId, workId, title, content]);

  const handleOpenDraftDialog = useCallback(() => {
    if (typeof window !== 'undefined') {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const draftsForWork = drafts.filter((d) => d.challengeId === challengeId && d.workId === workId).sort((a, b) => {
        return new Date(b.savedAt) - new Date(a.savedAt);
      });
      setDraftList(draftsForWork);
      setIsDialogOpen(true);
    }
  }, [challengeId, workId]);

  const handleSelectDraft = useCallback((draft) => {
    setTitle(draft.title || '');
    setContent(draft.content || '');
    if (editor && draft.content) {
      editor.commands.setContent(draft.content, false);
    }
    setIsDialogOpen(false);
  }, [editor]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }, []);

  const handleSubmit = useCallback(async () => {
    console.log('제출 데이터:', { challengeId, workId, title, content });
    alert('제출 기능은 추후 구현 예정입니다.');
  }, [challengeId, workId, title, content]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white">
          <div className={`max-w-4xl mx-auto px-6 py-2 ${isSidebarOpen ? 'mr-[500px]' : ''}`}>
          <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-2">
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="inline-flex items-center gap-2">
                <LogoIcon className="w-[17.55px] h-[20.25px]" />
                <span className="text-gray-900 font-bold text-sm">Docthru</span>
              </Link>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button
                onClick={handleGiveUp}
                className="bg-pink-100 text-red-600 hover:bg-pink-200 hover:text-red-700 rounded-lg px-3 py-1 h-auto text-sm"
              >
                포기
              </Button>
              <Button 
                onClick={handleSaveDraft}
                variant="outline" 
                className="bg-white text-gray-900 border-gray-300 hover:bg-gray-50 rounded-lg px-3 py-1.5 h-auto text-sm"
              >
                임시저장
              </Button>
              <Button 
                onClick={handleSubmit}
                variant="outline" 
                className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-3 py-1.5 h-auto text-sm"
              >
                제출하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
          <div className={`max-w-4xl mx-auto px-6 py-1.5 ${isSidebarOpen ? 'mr-[500px]' : ''}`}>
          <div className="border-b border-gray-200 pb-2">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-semibold border-none shadow-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent truncate w-full"
              placeholder="제목을 입력하세요"
            />
          </div>
        </div>
      </div>

      <div className="flex relative">
        <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'mr-[500px]' : ''} max-w-4xl mx-auto px-6 py-6`}>
          <div className="bg-white border border-gray-200 rounded-lg p-2 mb-4 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 flex items-center justify-center overflow-visible ${
                editor?.isActive('bold') ? 'bg-gray-200' : ''
              }`}
              onClick={() => {
                editor?.chain().focus().toggleBold().run();
                setUpdateKey((prev) => prev + 1);
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

          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="번역 내용을 적어주세요"
            onEditorReady={handleEditorReady}
            onSelectionUpdate={handleSelectionUpdate}
          />

          {hasDraft && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 flex items-center gap-3">
                <span className="text-sm text-gray-700">임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요?</span>
                <Button
                  onClick={handleOpenDraftDialog}
                  variant="outline"
                  size="sm"
                  className="text-xs bg-gray-900 text-white hover:bg-gray-800 border-0"
                >
                  불러오기
                </Button>
                <button
                  onClick={() => {
                    const drafts = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') : [];
                    const draftsForWork = drafts.filter((d) => d.challengeId === challengeId && d.workId === workId);
                    setHasDraft(draftsForWork.length === 0);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="닫기"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`fixed ${isSidebarOpen ? 'right-[500px]' : 'right-0'} top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 p-3 bg-white border-l border-t border-b border-gray-200 rounded-l-lg shadow-sm hover:bg-gray-50 transition-all duration-300 ${
            isSidebarOpen ? 'bg-gray-50' : ''
          }`}
        >
          <ListIcon className="w-5 h-5 text-gray-600" />
          <span className="text-xs text-gray-600 writing-vertical-rl">원문</span>
        </button>

        {isSidebarOpen && (
          <>
            <div className="fixed right-0 top-0 h-full w-[500px] bg-white border-l border-gray-200 shadow-lg z-40 flex flex-col">
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
          </>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>임시 저장 불러오기</DialogTitle>
            <DialogDescription>
              불러올 임시 저장을 선택해주세요.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            {draftList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                저장된 임시저장이 없습니다.
              </div>
            ) : (
              draftList.map((draft, index) => (
                <div
                  key={draft.draftId || `${draft.challengeId}_${draft.workId}_${draft.savedAt}_${index}`}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div 
                      className="flex-1 min-w-0"
                      onClick={() => handleSelectDraft(draft)}
                    >
                      <h3 className="font-semibold text-gray-900 truncate mb-1">
                        {draft.title || '(제목 없음)'}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {draft.content ? draft.content.replace(/<[^>]*>/g, '').substring(0, 100) : '(내용 없음)'}
                        {draft.content && draft.content.replace(/<[^>]*>/g, '').length > 100 ? '...' : ''}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatDate(draft.savedAt)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0"
                      onClick={() => handleSelectDraft(draft)}
                    >
                      불러오기
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

