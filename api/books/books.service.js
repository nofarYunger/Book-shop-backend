module.exports = {
  query,
  remove,
  add,
  update,
  getById,
};

function query(filterBy = {}) {
  console.log("so u wonna get some books ha?");
  const keyword = filterBy.keyword || "";
  const query = `SELECT * FROM books WHERE book.title LIKE '%${keyword}%' 
  OR book.description LIKE '%${keyword}%' 
  OR book.categories LIKE '%${keyword}%' 
  OR book.authors LIKE '%${keyword}%' 
  OR book.subtitle LIKE '%${keyword}%'`;
  return DBService.runSQL(query);
}

function add(book) {
  console.log(book);
  const query = `INSERT INTO books
VALUES ("${book.title}",
"${book.subtitle}",
                "${book.authors}",
                "${book.publishedDate}",
                "${book.description}",
                "${book.pageCount}",
                "${book.categories}",
                "${book.amount}",
                "${book.lannguage}",
                "${book.price}",
                "${book.currencyCode}",
                "${book.thumbnail}",
                "${book.isOnSale}")`;

  console.log(query);
  return DBService.runSQL(query);
}

function remove(bookId) {
  const query = `DELETE FROM books WHERE id = ${bookId};`;
  return DBService.runSQL(query);
}

async function update(book) {
  const query = `UPDATE book set 
  title= ${book.title},
  subtitle = ${book.subtitle},
  authors = ${book.authors},
  publishedDate = ${book.publishedDate},
  description = ${book.description},
  pageCount = ${book.pageCount},
  categories = ${book.categories},
  amount = ${book.amount},
  lannguage = ${book.lannguage},
  price = ${book.price},
  currencyCode = ${book.currencyCode},
  thumbnail = ${book.thumbnail},
  isOnSale =${book.isOnSale}
              WHERE book.id = ${book.id}`;

  const okPacket = await DBService.runSQL(query);
  console.log(okPacket);
  if (okPacket.affectedRows !== 0) return okPacket;
  throw new Error(`No book updated - book id ${book.id}`);
}

async function getById(bookId) {
  const query = `SELECT * FROM books WHERE book.id = ${bookId}`;

  const books = await DBService.runSQL(query);
  if (books.length === 1) return books[0];
  throw new Error(`book id ${bookId} not found`);
}
