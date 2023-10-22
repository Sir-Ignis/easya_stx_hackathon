
"""NFT Collection Mockup"""
class NFT:
    def __init__(self, id_, title:str, genre:str, length:int):
        self.id = id_
        self.title = title
        self.genre = genre
        self.length = length
        
    def editTitle(self, title):
        self.title = title
    
class NFTCollection:
    def __init__(self, user_hash:str):
        self.user_hash = user_hash
        self.user_nfts = None #store as dict?
    def addToCollection(self, nft:NFT):
        if len(self.user_nfts) == 0:
            self.user_nfts = list(nft)
        else:
            self.user_nfts.append(nft)

def mockStorage():
    #define user hash
    user_hash = "would_be_a_hash"
    # examples of general nfts
    easyANFT = NFT(user_hash, "easyA", "hackathon", 120)
    stashNFT = NFT(user_hash, "stash","crypto", 60)
    # music specific NFTs
    awesomeSongNFT = NFT(user_hash, "One", "pop", 180)
    sadSongNFT = NFT(user_hash, "Sad song", "edm", 240)
    
    user_collection = NFTCollection(user_hash)
    nfts = list(easyANFT, stashNFT, awesomeSongNFT, sadSongNFT)
    for nft in nfts:
        user_collection.addToCollection(nft)
    