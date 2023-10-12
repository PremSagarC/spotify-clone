"use client"

import Box from "@/components/Box"

const Error = () => {
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="text-red-500 font-semibold">
                Something Went Wrong!
            </div>
        </Box>
    )
}

export default Error