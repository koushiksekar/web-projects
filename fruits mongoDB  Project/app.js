
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/peopleDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,"name required please check"]
    },
    Rating:{
        type:Number,
        min:1,
        max:10
    },
    Review:{
        type:String,
        required:[true,"please check amd enter the review"]
    }
})

const fruit = new mongoose.model("Fruit",fruitSchema);

const fruit1 = new fruit({
    Name:"Apple",
    Rating:7,
    Review: "my all time fav"
})

const fruit2 = new fruit({
    Name:"Mongo",
    Rating:9,
    Review:"wow awesome taste"
})

//  fruit2.save();

const peopleSchema = new mongoose.Schema({
    Name: {
        type: String,
        required:[true,"please check the data entry name not specified"]
    },
    Age: {
         type:Number,
         min:1,
         max:15
    },
    favouriteFruit: fruitSchema
    
}); 

const people = new mongoose.model("People",peopleSchema);
const people1 = new people({
    Name: "John",
    Age: 37
});

const people2 = new people({
    Name: "Koushik",
    Age: 23
})



const people3 = new people({
    Name: "Sekar",
    Age: 58
})

const people4 = new people({
    Name:"Susi",
    Age:44
})

// const people5 = new people({
//     Name:"Rathi priya",
//     Age:15,
//     favouriteFruit:fruit1
// })
//  people5.save();

// people.deleteMany({Name:"rathi priya"},function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("sucess");
//     }
// })

// people.deleteOne({Name:"Rathi priya"},function(err){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("sucess");
//         }
//     })

people.updateOne({Name:"Koushik"},{favouriteFruit:fruit2}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("sucess");
        }
    })

people.find(function(err,peoples){
    if(err){
        console.log(err);
    }else{
        mongoose.connection.close();
        peoples.forEach(function(people){
            console.log(people.Name);
        })
    }
})


// people.insertMany([people2,people3,people4],function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully inserted the datas");
//     }
// })