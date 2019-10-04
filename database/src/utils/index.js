exports.formatData = (obj={})=>{
    let {data=[],code=1000,msg='success'} = obj;

    if(code===250){
        msg = 'fail'
    }
    return {
        code,
        data,
        msg
    }
}