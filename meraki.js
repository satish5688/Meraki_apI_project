const fs=require("fs")
const axios=require('axios')


async function get_data(){
    if(!(fs.existsSync("./all_courses.json"))){
        cources= await axios.get("https://api.merakilearn.org/courses")
        fs.writeFile("all_courses.json",JSON.stringify(cources.data,null,4),(err)=>{console.log(err.message);})

    }
}



module.exports={get_data}