import { topFooterData } from "@/src/constants/data";

const Topfooter = () => {
    return (
        <div className="border-t border-b grid grid-cols-2 lg:grid-cols-4 gap-8">
            {
                topFooterData?.map((data, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 group hover:bg-gray-50 hoverEffect transition-colors">
                        {data.icon}
                        <div className="flex flex-col">
                            <h3 className="text-gray-900 group-hover:text-black font-semibold hoverEffect">
                                {data.title}
                            </h3>
                            <p className="text-gray-600 group-hover:text-gray-900 text-sm mt-1 hoverEffect">
                                {data.subTitle}
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Topfooter;