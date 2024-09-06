
import { resolveInclude } from "ejs";
import db from "../models/index";
import CRUDService from "../services/CRUDService";
import { response } from "express";


let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }

}

let getCrud = (req, res) => {
    return res.render("crud.ejs");
}

let postCrud = async (req, res) => {
    let meesage = await CRUDService.createNewUser(req.body);
    console.log(meesage);
    return res.send('Post crud from server');
}

//Hiển thị

let displaygetCrud = async (req, res) => {
    let allUser = await CRUDService.getAllUser();
    return res.render('displayCrud.ejs', {
        dataTable: allUser
    });
}
//Chỉnh sửa data
let getEditCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserById(userId);
        return res.render('editCrud', {
            user: userData
        });
    }
    else {
        return res.send('User not found');
    }
}

let putCrud = async (req, res) => {
    let data = req.body;
    let allUser = await CRUDService.updateUserData(data);
    return res.render('displayCrud.ejs', {
        dataTable: allUser
    });
}

let deleteCrud = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delet the user succeed')
    }
    else {
        return res.send('User not found')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    postCrud: postCrud,
    displaygetCrud: displaygetCrud,
    getEditCrud: getEditCrud,
    putCrud: putCrud,
    deleteCrud: deleteCrud,
}