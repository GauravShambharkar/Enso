import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <div className="">
                <div className="border mt-15 h-screen fixed min-w-48">
                </div>
                <div className="ml-48">
                    {children}
                </div>
            </div>
        </>
    )
}

export default layout