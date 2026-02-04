import React from 'react'


const Create_idea = () => {
    return (
        <>
            <div className="w-full h-full fixed flex justify-center items-center">
                <div className='p-4 rounded-lg border-2 border-white/20 w-150 h-fit bg-white/2 backdrop-blur-md z-50'>
                    <div className="">
                        <div className="space-y-2">
                            <h2 className="text-white items-center text-3xl flex justify-between">{"No idea available"}
                            </h2>
                            <p className="text-white/70 text-sm">{"No description available"}</p>
                            <div className="flex gap-8">
                                <p className="text-white/70 text-sm">Created On: <span className="text-white">{"No description available"}</span></p>
                                <p className="text-white/70 text-sm">Updated On: <span className="text-white">{"No description available"}</span></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Create_idea