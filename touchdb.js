async function getNameInDb() {
  try {
    let result = await db.query("select firstname as name from testingdb")
    return result[0];
  }
  catch (error) {
    console.log(error);
    ctx.throw(400, 'INVALID_DATA')
  }
}

module.exports = getName;
