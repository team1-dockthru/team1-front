// 내용 있는 화면

export default function WorkContent({ content }) {
  return (
    <article className="py-6 pb-16">
      <div 
        className="prose prose-gray max-w-none text-base leading-relaxed text-[#404040]
          prose-headings:text-[#171717] prose-headings:font-semibold
          prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
          prose-p:my-3
          prose-a:text-blue-600 prose-a:underline
          prose-strong:font-semibold prose-strong:text-[#171717]
          prose-ul:list-disc prose-ul:pl-6
          prose-ol:list-decimal prose-ol:pl-6
          prose-li:my-1
          prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic
          prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}