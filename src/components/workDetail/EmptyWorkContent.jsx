import Image from 'next/image';
import EmptyImage from '@/assets/images/empty-state.png';

export default function EmptyWorkContent() {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 py-16">
      {/* 이미지 */}
      <Image 
        src={EmptyImage} 
        alt="빈 상태" 
        width={320} 
        height={168}
        className="opacity-50"
      />
      
      {/* 텍스트 */}
      <p className="text-base font-normal text-[black]">
        아직 아무런 번역을 진행하지 않았어요!
      </p>
    </div>
  );
}