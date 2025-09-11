import * as bcrypt from 'bcrypt';
function hashPassword(password) {
  const saltRounds = 10;
  console.log("here is hash:")
  console.log( bcrypt.hashSync(password, saltRounds));
}
hashPassword('pass@123')