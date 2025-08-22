export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">

      <div className="flex items-stretch mt-4 h-96 gap-4">
        <div className="bg-gray-600 w-3/4 h-full rounded-lg p-4 flex items-center justify-center"></div>

        <div className="bg-gray-600 w-3/4 h-full rounded-lg ">
          <div className="rounded-lg h-4 bg-white text-black flex items-center m-4"></div>
          <div className="h-1/2 bg-white m-4 rounded-lg"></div>
          <div className="flex items-end h-1/4">
            <div className="w-1/2 h-full bg-white mx-4 rounded-lg"></div>
            <div className="w-1/2 h-full bg-white ml-auto mr-4 rounded-lg"></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-300 h-96 mt-4 rounded-lg pt-1">
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
        <div className="h-4 bg-gray-500 m-4 rounded-lg"></div>
      </div>
    </div>
  );
}
