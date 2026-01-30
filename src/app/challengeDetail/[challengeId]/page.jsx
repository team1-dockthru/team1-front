'use client';

import { useState, useEffect, use } from 'react';
import { getChallengeDetail, joinChallenge, updateChallenge, deleteChallenge } from '@/services/challenge';
import { getCurrentUser } from '@/services/user';

import Gnb from '@/components/common/GNB/Gnb';
import StatusBanner from '@/components/challengeDetail/StatusBanner';
import ChallengeHeader from '@/components/challengeDetail/ChallengeHeader';
import ChallengeInfo from '@/components/challengeDetail/ChallengeInfo';
import TopTranslation from '@/components/challengeDetail/TopTranslation';
import ChallengeSidebar from '@/components/challengeDetail/ChallengeSidebar';
import ParticipationStatus from '@/components/challengeDetail/ParticipationStatus';

export default function ChallengeDetailPage({ params }) {
  const { challengeId } = use(params);
  const [challengeData, setChallengeData] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사용자 정보 로딩
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error('사용자 정보 조회 실패:', err);
      }
    };
    fetchUser();
  }, []);

  // 챌린지 데이터 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getChallengeDetail(challengeId);
        setChallengeData(data);
      } catch (err) {
        console.error('챌린지 조회 실패:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [challengeId]);

  // ========== 이벤트 핸들러 ==========

  // 챌린지 참여하기 / 도전 계속하기
  const handleJoinChallenge = async () => {
    try {
      await joinChallenge(challengeId);
      // TODO: 챌린지 작업 페이지로 이동
      console.log('챌린지 작업 페이지로 이동');
    } catch (err) {
      console.error('챌린지 참여 실패:', err);
      alert('챌린지 참여에 실패했습니다.');
    }
  };

  // 챌린지 수정
  const handleEdit = () => {
    // TODO: 챌린지 수정 페이지로 이동
    console.log('챌린지 수정 페이지로 이동');
  };

  // 챌린지 삭제
  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteChallenge(challengeId);
      // TODO: 챌린지 목록 페이지로 이동
      console.log('삭제 완료, 목록으로 이동');
    } catch (err) {
      console.error('챌린지 삭제 실패:', err);
      alert('챌린지 삭제에 실패했습니다.');
    }
  };

  // ========== 상태별 렌더링 ==========

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">로딩 중...</p>
      </div>
    );
  }

  // 에러
  if (error || !challengeData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-gray-500">
          {error || '챌린지를 찾을 수 없습니다.'}
        </p>
      </div>
    );
  }

  // ========== 메인 렌더링 ==========

  return (
    <div className="min-h-screen bg-white">
      {/* GNB */}
      <Gnb
        isLoggedIn={user?.isLoggedIn || false}
        role={user?.role || 'guest'}
        hasNotification={user?.hasNotification || false}
      />

      <main className="mx-auto w-full">
        {/* 반응형: Desktop 890px, iPad mini 696px, Mobile 343px */}
        <div className="mx-auto w-full px-4 pt-10 md:w-[696px] md:px-6 lg:w-[890px] lg:px-0">
          
          {/* 상단 배너 (마감됨/모집마감 시에만) */}
          <StatusBanner 
            status={challengeData.status} 
            deadline={challengeData.deadline}
            participantCount={challengeData.participantCount || 0}
            maxParticipants={challengeData.maxParticipants || 15}
          />

          {/* 메인 레이아웃: 좌측(제목+태그+소개글+작성자) + 우측(ActionCard) */}
          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* 좌측: 제목 + 태그 + 소개글 + 작성자 */}
            <div className="flex-1">
              <ChallengeHeader
                title={challengeData.title}
                isMine={challengeData.isMine}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              
              <ChallengeInfo
                type={challengeData.type}
                category={challengeData.category}
                description={challengeData.description}
                author={challengeData.author}
              />
            </div>

            {/* 우측: ActionCard (데스크탑에서만 표시) */}
            <div className="hidden lg:block lg:w-[340px]">
              <ChallengeSidebar
                deadline={challengeData.deadline}
                participantCount={challengeData.participantCount || 0}
                originalWorkId={challengeData.originalWorkId}
                isParticipating={challengeData.isParticipating}
                status={challengeData.status}
                onJoinChallenge={handleJoinChallenge}
                maxParticipants={challengeData.maxParticipants || 15}
              />
            </div>
          </div>

          {/* 모바일/태블릿: ActionCard */}
          <div className="mb-6 lg:hidden">
            <ChallengeSidebar
              deadline={challengeData.deadline}
              participantCount={challengeData.participantCount || 0}
              originalWorkId={challengeData.originalWorkId}
              isParticipating={challengeData.isParticipating}
              status={challengeData.status}
              onJoinChallenge={handleJoinChallenge}
              maxParticipants={challengeData.maxParticipants || 15}
            />
          </div>

          {/* 최다 추천작 */}
          {challengeData.status === 'closed' && challengeData.topTranslations.length > 0 && (
            <TopTranslation translations={challengeData.topTranslations} />
          )}

          {/* 참여 현황 */}
          <ParticipationStatus participants={challengeData.participants} />
        </div>
      </main>
    </div>
  );
}