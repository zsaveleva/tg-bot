import CampModel from "../models/camp.js";

export const get = async (req, res) => {
    try {
        const camps = await CampModel.find(req.query).exec();
        res.send(camps)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить данные',
        });
    }
};

export const remove = async (req, res) => {
    const campId = req.params.id
    CampModel.findOneAndDelete({ _id: campId })
        .then((foundCamp) => {
            if (foundCamp) {
                res.json({
                    success: true,
                    message: `Был удалён объект ${foundCamp.name}`
                })
            }
        })
        .catch((err, doc) => {
            console.log(err.message)
            res.status(500).json({
                message: 'Не удалось получить данные'
            })

            if (!doc) {
                return res.status(404).json({
                    message: 'Запись не найдена'
                })
            }
        })
}

export const create = async (req, res) => {
    try {
        const doc = new CampModel({
            name: req.body.name,
            geo: req.body.geo,
            info: {
                address: req.body.address,
                person: req.body.person,
                contacts: req.body.contacts,
                tax: req.body.tax,
                opf: req.body.opf,
                comment: req.body.comment
            },
            shifts: {
                first: req.body.first,
                second: req.body.second,
                third: req.body.third,
                fourth: req.body.fourth
            },
            vacancy: {
                value: req.body.value,
                description: req.body.description
            },
            date: {
                summer: req.body.summer,
                tematic: req.body.tematic
            },
            seasons: req.body.seasons,
            feedback: req.body.feedback
        })

        const camp = await doc.save()

        res.json({
            camp: camp,
            message: `Был создан объект ${camp.name}`
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать запись'
        })
    }
}

export const update = async (req, res) => {
    try {
        const campId = req.params.id
        await CampModel.updateOne({
            _id: campId
        }, {
            name: req.body.name,
            info: {
                address: req.body.address,
                person: req.body.person,
                contacts: req.body.contacts,
                tax: req.body.tax,
                opf: req.body.opf,
                comment: req.body.comment
            },
            shifts: {
                first: req.body.first,
                second: req.body.second,
                third: req.body.third,
                fourth: req.body.fourth
            },
            vacancy: req.body.vacancy,
            date: {
                summer: req.body.summer,
                tematic: req.body.tematic
            },
            seasons: req.body.seasons,
            feedback: req.body.feedback
        })

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить заметку'
        })
    }
}