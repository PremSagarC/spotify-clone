"use client"

import SongItem from '@/components/SongItem'
import useOnPlay from '@/hooks/useOnPlay'
import { Song } from '@/types'
import React from 'react'

interface PageContentProps {
    songs: Song[]
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {


    const onPlay = useOnPlay(songs)

    if (songs.length === 0) {
        return (
            <div className='flex items-center justify-center mt-[30%] text-[30px]'>
                No songs available.
            </div>
        )
    }

    return (
        <div
            className="
                grid 
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5 
                2xl:grid-cols-8 
                gap-5 
                mt-4
            "
        >
            {
                // Start the video from 3:05:04
                songs.map((song) => (
                    <SongItem
                        key={song.id}
                        onClick={(id: string) => onPlay(id)}
                        data={song}
                    />
                ))
            }
        </div>
    )
}

export default PageContent 