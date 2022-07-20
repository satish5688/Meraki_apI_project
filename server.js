
const express = require("express")
const app = express()
const fs = require("fs")
const { get_data } = require("./meraki")

get_data()
app.use(express.json())

app.get("/courses", (req, res) => {
    const data = fs.readFileSync("./all_courses.json", "utf-8", "r")
    const Proper_data = JSON.parse(data)
    if (Proper_data.length == 0) {
        res.send({
            "status": "error",
            "message": "Not able find courses"
        })
    } else {
        res.send({
            "status": "success",
            "count": Proper_data.length,
            "data": JSON.parse(data)
        })
    }
})



app.get("/courses/:id", (req, res) => {
    const id = req.params.id
    const data = fs.readFileSync("./all_courses.json", "utf-8", "r")
    const Proper_data = JSON.parse(data)
    const count = Proper_data.length
    let number = 0
    for (s of Proper_data) {
        number += 1
        if (s['id'] == id) {
            res.send({
                "status": "success",
                "data": s
            })
            break
        } else if (number == count) {
            res.send({
                "status": "error",
                "message": "Inavalid ID."
            })
        }
    }


})






app.post("/courses", (req, res) => {
    const data = fs.readFileSync("./all_courses.json", "utf-8", "r")
    const Proper_data = JSON.parse(data)
    const info = req.body
    const id = req.body.id
    const count = Proper_data.length
    let number = 0

    if (Object.keys(info).length === 0) {
        res.send({
            "status": "error",
            "message": "you can not add empty data"
        })
    } else {
        for (s of Proper_data) {
            number += 1
            if (s['id'] == id) {
                res.send({
                    "status": "error",
                    "message": "Course alrealy exist"
                })
                break
            } else if (number == count) {
                Proper_data.push(info)
                fs.writeFileSync("./all_courses.json", JSON.stringify(Proper_data, null, 4))
                res.send({
                    "status": "success",
                    "data": info
                })
            }
        }
    }

})






app.delete("/courses/:id", (req, res) => {
    const id = req.params.id
    const data = fs.readFileSync("./all_courses.json", "utf-8", "r")
    const Proper_data = JSON.parse(data)
    const count = Proper_data.length
    let number = 0
    for (s of Proper_data) {
        number += 1
        if (s['id'] == id) {
            res.send({
                "status": "success",
                "data": s
            })
            Proper_data.splice(number - 1, 1)
            fs.writeFileSync("./all_courses.json", JSON.stringify(Proper_data, null, 4))


            break
        } else if (number == count) {
            res.send({
                "status": "error",
                "message": "Inavalid ID."
            })
        }
    }

})



app.put("/courses/:id", (req, res) => {
    const id = req.params.id
    const data = fs.readFileSync("./all_courses.json", "utf-8", "r")
    const Proper_data = JSON.parse(data)
    const info = req.body
    const count = Proper_data.length
    let number = 0
    for (s of Proper_data) {
        number += 1
        if (s['id'] == id) {
            Proper_data[number - 1] = info
            fs.writeFileSync("./all_courses.json", JSON.stringify(Proper_data, null, 4))
            res.send({
                "status": "success",
                "data": info
            })

            break
        } else if (number == count) {
            res.send({
                "status": "error",
                "message": "Inavalid ID."
            })
        }
    }
})



app.listen(3000)