export default function InfoComponent({ toggleExpand }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center cursor-pointer select-none"
      onClick={toggleExpand}
    >
      <h2 className="text-2xl font-semibold">Info Component</h2>
    </div>
  );
}
