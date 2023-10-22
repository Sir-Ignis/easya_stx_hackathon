# Import flask and datetime module for showing date and time
from flask import Flask
from flask import request
import datetime
from typing import Dict 
from nft_mapper import NFT, NFTCollection
from model import fetch_document_content, compare_documents
x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)



@app.route("/nft/user_id")
def get_token_id():
    """ 
    Get token id associated with NFT 
	Need to pass the user wallet hash
    Used to pass user id from frontend to backend
    """
    token_id = request.args.get('token_id')
    return token_id

@app.route("/doc/content")
def get_doc_content():
	""" Gets the song content """
	url = request.args.get('url')
	content = fetch_document_content(url)
	return {"content":content}

@app.route("/doc/compare_documents")
def compare_docs():
	"""
	Compares two songs, called 'docs' from url
    Returns the plagiarism result and the similarity ratio
	/doc/compare_documents?doc_url1&doc_url2
 	"""
	doc_url1 = request.args.get('doc_url1')
	doc_url2 = request.args.get('doc_url2')
	result = compare_documents(doc_url1, doc_url2)
	return {"plagiarism":result[0], "similarity_ratio": result[1]}
	
	
@app.route("/nft/addTraits")
def set_nft_traits():
	""" 
	Mocks traits for nft given it's id and associates it to user 
	e.g. /nft/addTraits?user_hash&topic&title&length
	"""
	user_hash = request.args.get('user_hash')
	topic = request.args.get('topic')
	title = request.args.get('title')
	length = request.args.get('length')
	user_nft = NFT(user_hash, title=title, genre=topic, length=length)
	# need to also add it to user collections
    # would
	return {"success": f"Added NFT with title={user_nft.title} to wallet_id{user_nft.id}"}

# Route for seeing a data
@app.route("/nft/traits")
def get_nft_traits(args:Dict):
	""" Need to pass NFT map converted to python dict """
	topic = args.get("topic")
	title = args.get("title")
	length = args.get("length")
 	# Returning an api for showing in reactjs
	return {
		"topic":topic, 
		"title":title,
		"length":length, 
	}

@app.route("/nft")
def NFTMintedMessage():
    return {
		"success": "NFT was minted!" 
	}
 
# Running app
if __name__ == '__main__':
	app.run(port=9600, debug=True)
