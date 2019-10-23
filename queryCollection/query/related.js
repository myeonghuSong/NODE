const req = require('./req');

module.exports = async (arr)=> {

    // let res= arr.map( async (qs)=> {
    //     let store = [];
    //     await req(qs).then((data) => {
    //         console.log('aa',data);
    //         store.push(data);
    //     });
    //     return store;
    // })
    let store = [];
    for(let i=0; i<arr.length; i++){
        await req(arr[i]).then((data) => {
            store.push(data);
        })
    }
    return store;
};