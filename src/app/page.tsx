export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">POC: E-commerce Upsell page</h1>
      <p className="mt-4 text-lg text-slate-700 p-2 text-left">
        This is a standalone, high converting upsell page using a custom design
        and an engaging, original offer to boost checkout revenue, AOV, and
        customer satisfaction.
      </p>
      <p className="mt-4 text-lg text-slate-500">
        Click the button below to proceed to the upsell page.
      </p>
      <a
        href="/upsell"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Upsell
      </a>
      <a
        href="/thankyou"
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded"
      >
        Go to Thank You page
      </a>
    </div>
  );
}
