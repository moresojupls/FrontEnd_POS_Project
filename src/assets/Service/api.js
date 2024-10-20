


class Api{

  constructor(_urlPath){
    this._urlPath = _urlPath
  }
  async getApi(){
  
    try{
      let resultApi=[] 
      const results = fetch(this._urlPath);
      await results.then(async (response)=>{
        await response.json().then((res)=>{
          resultApi = res
        })    
      })

      return resultApi;

    }catch(err){
      return {'error Because : ': err };

    }
   
  }
}

export default Api