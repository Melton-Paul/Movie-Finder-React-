import React from "react"

export default function usePageLogic(){
    const [watchlistStorage, setWatchlistStorage] = React.useState(JSON.parse(window.localStorage.getItem("watchlist")) || [])
    const [watchlistPage, setWatchlistPage ] = React.useState(JSON.parse(window.localStorage.getItem("page")))

    function addStorage(id){
        setWatchlistStorage(prev => {
            return [...prev, id]
        })
    }

    function removeStorage(id){
        const location = watchlistStorage.indexOf(id)
        const arr = watchlistStorage
        arr.splice(location, 1)
        setWatchlistStorage(arr)
        window.localStorage.setItem("watchlist", JSON.stringify(watchlistStorage))
        if(watchlistPage){
        document.location.reload()}
    }

    window.localStorage.setItem("watchlist", JSON.stringify(watchlistStorage))
    window.localStorage.setItem("page", JSON.stringify(watchlistPage))

    return {setWatchlistPage, watchlistStorage, removeStorage, addStorage, watchlistPage}
    
}

