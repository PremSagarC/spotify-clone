"use client"

import React from 'react'

import Box from '@/components/Box'
import { SyncLoader } from 'react-spinners'

const Loading = () => {
    return (
        <Box className='h-full flex items-center justify-center'>
            <SyncLoader color='#4287f5' size={10} />
        </Box>
    )
}

export default Loading