const http = require('http');
const path = require('path');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const _config = require('../_config');

let _user;

const createUser = (req, res) => {
    const user = req.body;
    _user.create(user)
        .then((data) => {
            res.status(200);
            res.json({ msg: "Usuario creado correctamente", data: data });
        })
        .catch((err) => {
            res.status(400);
            res.json({ msg: "Error!!!!", data: err });
        })
}

const findAll = (req, res) => {
    _user.find()
        .then((data) => {
            if (data.length == 0) {
                res.status(status.NO_CONTENT);
                res.json({ msg: "No se encontraron usuarios" });
            } else {
                res.status(status.OK);
                res.json({ msg: "Éxito!!!", data: data });
            }
        })
        .catch((err) => {
            res.status(status.BAD_REQUEST);
            res.json({ msg: "Error!!!" });
        });
}

const deleteByID = (req, res) => {
    const { id } = req.params;
    // const id = req.params.id;

    const params = {
        _id: id
    };

    _user.findByIdAndRemove(params)
        .then((data) => {
            res.status(status.OK);
            res.json({ msg: "Éxito!!!", data: data });
        })
        .catch((err) => {
            res.status(status.NOT_FOUND);
            res.json({ msg: "Error!!! No se encontró", err: err });
        });

}

const login = (req, res) => {
    const { email, password } = req.params;
    let query = { email: email, password: password };
    _user.findOne(query, "-password")
        .then((user) => {
            if (user) {
                const token = jwt.sign({ email: email }, _config.SECRETJWT);
                res.status(status.OK);
                res.json({
                    msg: "Acceso exitoso",
                    data: {
                        user: user,
                        token: token
                    }
                });
            } else {
                res.status(status.NOT_FOUND);
                res.json({ msg: "Error!!! No se encontró" });
            }
        })
        .catch((err) => {
            res.status(status.NOT_FOUND);
            res.json({ msg: "Error!!! No se encontró", err: err });
        });
};

module.exports = (User) => {
    _user = User;
    return ({
        createUser,
        findAll,
        deleteByID,
        login
    });
}
