/* eslint-disable react/no-unescaped-entities */
export const PreHeader = () => {
  return (
    <div className="text-left text-black p-4 font-semibold tracking-[0.6px] bg-slate-100 pre-header">
      You're almost done! As a thank you for your order, you've unlocked a
      special gift from us!
      <br />
      <div className="progress-bar w-full bg-gray-300 h-2 mt-2 rounded-full">
        <div className="progress bg-green-500 h-full w-3/4 rounded-full"></div>
      </div>
    </div>
  );
};
