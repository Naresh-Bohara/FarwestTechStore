export const WholePageLoader = ()=>{
    return(
        <>
           <div className="w-full h-full fixed top-0 left-0 bg-white flex items-center justify-center z-50">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-[#26adb7] border-gray-300 rounded-full animate-spin"></div>
                <p className="mt-4 text-[#39b8c1] font-semibold text-lg">
                  Loading, please wait...
                </p>
              </div>
            </div>
        </>
    )
}