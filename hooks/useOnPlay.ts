import { Song } from "@/types"
import usePlayer from "./usePlayer"
import useAuthModal from "./useAuthModel"
import { useUser } from "./useUser"
import useSubscribeModal from "./useSubscribeModal"


const useOnPlay = (songs: Song[]) => {
    const player = usePlayer()
    const subscribeModal = useSubscribeModal()
    const authModal = useAuthModal()
    const { user, subscription } = useUser()

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen()
        }

        // USE the below if song play is only on subscribe mode

        // if (!subscription) {
        //     return subscribeModal.onOpen();
        // }

        player.setId(id)
        player.setIds(songs.map((song) => song.id))
    }

    return onPlay
}

export default useOnPlay