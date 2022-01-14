const {Book} = require("../../models/");


//todo: add filter on the book query



async function getAll(req, res) {
  const books = await Book.findAll();
   res.status(200).json(books);
}

async function getById(req, res) {
  const id = req.params.id;
  const book = await Book.findByPk(id);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function saveBook(req, res) {
  const id = req.params.id;
  if (id) {
    if (+req.body.id === +id) {
      await Book.update(req.body, {
        where: {
          id: id,
        },
      });
      console.log("updated the book:", id);
      res.status(200).end();
    } else {
      res
        .status(400)
        .send(
          `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
        );
    }
  } else {
    try {
      await Book.create(req.body);
      console.log("created a new book");
      res.status(201).end();
      
    } catch (error) {
      console.log(error.sqlMessage);
      res.status(500).send(error)
    }
      
  }
}

async function remove(req, res) {
  const id = req.params.id;
  await Book.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

module.exports = {
  getAll,
  getById,
  saveBook,
  remove,
};
