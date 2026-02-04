import { Idea } from '@/utils/ideas';
import { X } from 'lucide-react';
import React from 'react'

interface ViewIdeaProps {
    onClose: () => void;
    idea: {
        id: string;
        idea: string;
        description: string;
        createdOn: string;
        updatedOn: string;
    } | null;
}

const View_idea = ({ idea, onClose }: ViewIdeaProps) => {
    return (
        <>
            <div className="pointer-events-none w-full h-full fixed flex justify-end px-32.5 py-1.5">
                <div className='pointer-events-auto p-4 rounded-xl border-2 border-white/20 w-150 h-155 bg-white/2 backdrop-blur-md z-50'>
                    <div className="">
                        <div className="space-y-2">
                            <h2 className="text-white items-center text-3xl flex justify-between">{idea?.idea || "No idea available"}
                                <span className=""><X onClick={onClose} className="text-white size-4 hover:rotate-90 hover:text-[#bababa] transition-all ease-in-out duration-300 cursor-pointer" /></span>
                            </h2>
                            <p className="text-white/70 text-sm">{idea?.description || "No description available"}</p>
                            <div className="flex gap-8">
                                <p className="text-white/70 text-sm">Created On: <span className="text-white">{idea?.createdOn || "No description available"}</span></p>
                                <p className="text-white/70 text-sm">Updated On: <span className="text-white">{idea?.updatedOn || "No description available"}</span></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default View_idea