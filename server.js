const express = require('express')
const app = express()

// panggil routers member
const member = require('./routes/member')
// const paket = require('./routers/paket')
const users = require('./routes/users')
// const transaksi = require("./routers/transaksi")
const outlet = require('./routes/outlet')
// const { login } = require('./routes/login')
const { port } = require("./config/config");
const login = require("./routes/login");

app.use('/api/outlet', outlet)
app.use('/api/member', member)
// app.use('/api/paket', paket)
app.use('/api/users',users)
// app.use('/api/transaksi', transaksi)
// app.use('/api/auth', login)
app.use("/api/login", login);

app.listen(port, () => {
    console.log(`app running in port ${port}`);
  });