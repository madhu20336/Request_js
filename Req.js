const axios = require("axios");
const  readline = require("readline-sync");
let fs = require("fs");
const Console  = require("console");
const API =axios.get("http://saral.navgurukul.org/api/courses")
    .then((Response) => {
        let data = Response.data
        let myJson = JSON.stringify(data,null,4);
        fs.writeFileSync("SARAL_DATA.json",myJson)
        serial_no = 1
        for (courses of data["availableCourses"]){
            console.log(`${serial_no++}.${courses.name}  ${courses.id}`)
        };
        let courses_name = readline.questionInt("Enter the any courses number who you want :" )
        console.log(data["availableCourses"][courses_name-1]["name"])
        let id = data["availableCourses"][courses_name-1]["id"]
        const api = axios.get("http://saral.navgurukul.org/api/courses/"+String(data["availableCourses"][courses_name-1]["id"])+"/exercises")
        .then(Response =>{
            let data1 = Response.data
            let myJsondata = JSON.stringify(data1,null,2);
            fs.writeFileSync("parant.json",myJsondata)
            no = 1
            serial = 1
            for( parant of data1["data"]){
                if(parant["childExercises"].length == 0){
                    console.log("  ",no,".",parant["name"])
                    console.log("    ",serial,".",parant["slug"])
                    no++
                }else{
                    let number = 1
                    console.log("  ",no,".",parant["name"])
                    for(Question of parant["childExercises"]){
                        console.log("      ",number,".",Question["name"])
                        number++
                    };
                    no++  
                };
            };
            const user_Name = readline.questionInt("Enter the topic number: ")
            console.log(data1["data"][user_Name-1]["name"])
            let NUMBER = 1
            if (data1["data"][user_Name-1]["childExercises"].length == 0){
                console.log(parant["slug"])
                const user_name = readline.questionInt("Enter the topic number: ")
                SARAL_API =  axios.get("http://saral.navgurukul.org/api/courses/"+String(data["availableCourses"][courses_name-1]["id"])+"/exercise/getBySlug?slug="+String(data1["data"][user_Name-1]["slug"]))
                .then((Response) => {
                    let data_2 = Response.data
                    let myJsondata_1 = JSON.stringify(data_2,null,4)
                    fs.writeFileSync("content.json",myJsondata_1)
                    console.log(data_2["content"])
                })
            }
            else{
                (data1["data"][user_Name-1]["childExercises"].length != 0)
                let NO = 1
                for (Slug of data1["data"][user_Name-1]["childExercises"] ){
                console.log("   ",NO,".",Slug["name"])
                NO++
                }
                const user_name = readline.questionInt("Enter the topic number: ")
                let url = axios.get("http://saral.navgurukul.org/api/courses/"+String(data["availableCourses"][courses_name-1]["id"])+"/exercise/getBySlug?slug="+String(data1["data"][user_Name-1]["childExercises"][user_name-1]["slug"]))
                .then((Response) => {
                let data_2 = Response.data
                let myJsondata_1 = JSON.stringify(data_2,null,4)
                fs.writeFileSync("content.json",myJsondata_1)
                console.log(data_2["content"])
                })
            }
        })
});