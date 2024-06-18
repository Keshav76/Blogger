interface Props {
  content: string;
  author: string;
  designation: string;
}
function Quotation({ content, author, designation }: Props) {
  return (
    <div className="px-32 bg-slate-100 h-full flex flex-col justify-center">
      <div className="text-xl font-black">{`"${content}"`}</div>
      <div className="text-sm font-bold mt-3">{author}</div>
      <div className="text-sm font-normal text-gray-500">{designation}</div>
    </div>
  );
}
export default Quotation;
