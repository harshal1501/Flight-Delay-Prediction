export const getAllCities=async()=>{
    try {
        let response=await fetch("http://127.0.0.1:5000/api/cities",{
            method:'GET',
        })
        let json= await response.json()
        return json 
    } catch (error) {
        console.log(error)
    }
}
export const getstates=async(values)=>{
    try {
        console.log("values",values)
        let response=await fetch("http://127.0.0.1:5000/api/latlong",{
            method:"POST",
            body:JSON.stringify( values),
            headers: {
                'Content-Type': 'application/json'
                
            }
        })
        return response
    } catch (error) {
        console.log(error)
    }
}