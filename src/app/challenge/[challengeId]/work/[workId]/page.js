'use client';

import { useState, useCallback, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/editor/RichTextEditor';
import WorkHeader from '@/components/work/WorkHeader';
import EditorToolbar from '@/components/work/EditorToolbar';
import SourceSidebar from '@/components/work/SourceSidebar';
import ConfirmLoadModal from '@/components/work/ConfirmLoadModal';
import DraftListModal from '@/components/work/DraftListModal';
import {
  getDraftsForWork,
  getSortedDraftsForWork,
  hasDraftsForWork,
  saveDraft,
} from '@/utils/draftStorage';
import { getChallengeDetail } from '@/services/challenge';
import ListIcon from '@/assets/icons/ic-list.svg';

export default function WorkPage({ params }) {
  const router = useRouter();
  const { challengeId, workId } = use(params);
  
  const [workData, setWorkData] = useState({
    title: '',
    content: '',
  });
  
  const [uiState, setUiState] = useState({
    isSidebarOpen: false,
    isDialogOpen: false,
    isConfirmOpen: false,
  });
  
  const [draftState, setDraftState] = useState({
    hasDraft: false,
    draftList: [],
    selectedDraft: null,
  });
  
  const [editor, setEditor] = useState(null);
  const [updateKey, setUpdateKey] = useState(0);
  const [sourceContent, setSourceContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 챌린지 정보 로드
  useEffect(() => {
    let isActive = true;
    const fetchChallengeData = async () => {
      try {
        setIsLoading(true);
        const challengeData = await getChallengeDetail(challengeId);
        if (!isActive) return;
        
        setWorkData(prev => ({
          ...prev,
          title: challengeData.title || '',
        }));
        setSourceContent(challengeData.sourceUrl || '');
      } catch (error) {
        console.error('챌린지 정보 로드 실패:', error);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };
    
    fetchChallengeData();
    return () => {
      isActive = false;
    };
  }, [challengeId]);
  
  // 임시저장 목록 로드
  useEffect(() => {
    const draftsForWork = getDraftsForWork(challengeId, workId);
    setDraftState({
      hasDraft: hasDraftsForWork(challengeId, workId),
      draftList: draftsForWork,
      selectedDraft: null,
    });
  }, [challengeId, workId]);

  const handleEditorReady = useCallback((editorInstance) => {
    setEditor(editorInstance);
  }, []);

  const handleSelectionUpdate = useCallback(() => {
    setUpdateKey((prev) => prev + 1);
  }, []);

  const handleGiveUp = useCallback(() => {
    if (confirm('작성 중인 내용이 모두 삭제됩니다. 정말 포기하시겠습니까?')) {
      setWorkData({ title: '', content: '' });
      if (editor) {
        editor.commands.clearContent();
      }
      router.push(`/challenge/${challengeId}`);
    }
  }, [editor, router, challengeId]);

  const handleSaveDraft = useCallback(() => {
    const savedDraft = saveDraft(challengeId, workId, workData.title, workData.content);
    if (savedDraft) {
      const draftsForWork = getDraftsForWork(challengeId, workId);
      setDraftState(prev => ({
        ...prev,
        draftList: draftsForWork,
        hasDraft: true,
      }));
      alert('임시저장되었습니다.');
    }
  }, [challengeId, workId, workData.title, workData.content]);

  const handleOpenDraftDialog = useCallback(() => {
    const sortedDrafts = getSortedDraftsForWork(challengeId, workId);
    setDraftState(prev => ({
      ...prev,
      draftList: sortedDrafts,
    }));
    setUiState(prev => ({
      ...prev,
      isDialogOpen: true,
    }));
  }, [challengeId, workId]);

  const handleSelectDraft = useCallback((draft) => {
    setDraftState(prev => ({
      ...prev,
      selectedDraft: draft,
    }));
    setUiState(prev => ({
      ...prev,
      isDialogOpen: false,
      isConfirmOpen: true,
    }));
  }, []);

  const handleConfirmLoad = useCallback(() => {
    if (draftState.selectedDraft) {
      setWorkData({
        title: draftState.selectedDraft.title || '',
        content: draftState.selectedDraft.content || '',
      });
      if (editor && draftState.selectedDraft.content) {
        editor.commands.setContent(draftState.selectedDraft.content, false);
      }
      setUiState(prev => ({
        ...prev,
        isConfirmOpen: false,
      }));
      setDraftState(prev => ({
        ...prev,
        selectedDraft: null,
      }));
    }
  }, [editor, draftState.selectedDraft]);

  const handleCancelLoad = useCallback(() => {
    setUiState(prev => ({
      ...prev,
      isConfirmOpen: false,
    }));
    setDraftState(prev => ({
      ...prev,
      selectedDraft: null,
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    console.log('제출 데이터:', { challengeId, workId, ...workData });
    alert('제출 기능은 추후 구현 예정입니다.');
  }, [challengeId, workId, workData]);

  const handleDismissDraftNotice = useCallback(() => {
    setDraftState(prev => ({
      ...prev,
      hasDraft: !hasDraftsForWork(challengeId, workId),
    }));
  }, [challengeId, workId]);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col md:flex-row relative">
        <SourceSidebar
          isOpen={uiState.isSidebarOpen}
          onClose={() => setUiState(prev => ({ ...prev, isSidebarOpen: false }))}
          sourceContent={sourceContent}
          isMobile={true}
        />
        
        <div className={`flex-1 transition-all duration-300 ${uiState.isSidebarOpen ? 'md:mr-[400px] lg:mr-[500px]' : ''} w-full max-w-full md:max-w-2xl lg:max-w-4xl mx-auto order-2`}>
          <WorkHeader
            title={workData.title}
            onTitleChange={(title) => setWorkData(prev => ({ ...prev, title }))}
            onGiveUp={handleGiveUp}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit}
            isSidebarOpen={uiState.isSidebarOpen}
            onToggleSidebar={() => setUiState(prev => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }))}
          />

          <div className="px-4 md:px-6 py-4 md:py-6">
            <EditorToolbar 
              editor={editor} 
              onUpdate={() => setUpdateKey((prev) => prev + 1)} 
            />

            <RichTextEditor
              content={workData.content}
              onChange={(content) => setWorkData(prev => ({ ...prev, content }))}
              placeholder="번역 내용을 적어주세요"
              onEditorReady={handleEditorReady}
              onSelectionUpdate={handleSelectionUpdate}
            />

            {draftState.hasDraft && (
              <div className="fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 max-w-md md:max-w-full">
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 md:gap-3">
                  <span className="text-xs md:text-sm text-gray-700 flex-1">
                    임시 저장된 작업물이 있어요. 저장된 작업물을 불러오시겠어요?
                  </span>
                  <Button
                    onClick={handleOpenDraftDialog}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-gray-900 text-white hover:bg-gray-800 border-0 flex-shrink-0"
                  >
                    불러오기
                  </Button>
                  <button
                    onClick={handleDismissDraftNotice}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
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
        </div>

        <button
          type="button"
          onClick={() => setUiState(prev => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }))}
          className={`fixed ${uiState.isSidebarOpen ? 'md:right-[50%] lg:right-[500px]' : 'right-0'} top-1/2 -translate-y-1/2 z-50 md:flex hidden flex-col items-center gap-2 p-3 bg-white border-l border-t border-b border-gray-200 rounded-l-lg shadow-sm hover:bg-gray-50 transition-all duration-300 ${
            uiState.isSidebarOpen ? 'bg-gray-50' : ''
          }`}
        >
          <ListIcon className="w-5 h-5 text-gray-600" />
          <span className="text-xs text-gray-600 writing-vertical-rl">원문</span>
        </button>

        <SourceSidebar
          isOpen={uiState.isSidebarOpen}
          onClose={() => setUiState(prev => ({ ...prev, isSidebarOpen: false }))}
          sourceContent={sourceContent}
          isMobile={false}
        />
      </div>

      <ConfirmLoadModal
        isOpen={uiState.isConfirmOpen}
        onClose={handleCancelLoad}
        onConfirm={handleConfirmLoad}
      />

      <DraftListModal
        isOpen={uiState.isDialogOpen}
        onClose={() => setUiState(prev => ({ ...prev, isDialogOpen: false }))}
        drafts={draftState.draftList}
        onSelectDraft={handleSelectDraft}
      />
    </div>
  );
}
