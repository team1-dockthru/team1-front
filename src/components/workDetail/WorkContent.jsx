// 내용 있는 화면

export default function WorkContent({ content }) {
  return (
    <article className="py-6 pb-16">
      <div className="whitespace-pre-wrap text-base font-normal leading-relaxed text-[#404040]">
        {content}
      </div>
    </article>
  );
}