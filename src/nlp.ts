import axios from 'axios';

class Nlp {
	constructor(){}
	async getIntent(msg){
		const res = await axios.get("https://api.wit.ai/message", {
			params : {
				v:"20201208",
				q:msg
			}, 
			headers:{
				"Authorization":"Bearer K633DJCQJPV3ZLRSMVDFGTV43UUPFQRZ"
			}
		})
		return res.data.intents
	}
}

const nlp = new Nlp()

export default nlp

