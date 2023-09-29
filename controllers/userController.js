import fs from "fs";
import { getProductSlug, getRandomUserID } from "../helpers/helpers.js";
import nodemailer from "nodemailer";
import axios from "axios";

// show all user page
export const showUserPage = (req, res) => {
  // get data from db
  const usersData = JSON.parse(fs.readFileSync("db/users.json").toString());
  res.render("users", {
    users: usersData,
  });
};

// show create user page
export const showCreateUserPage = (req, res) => {
  res.render("create");
};

// show edit user page
export const showEditUserPage = (req, res) => {
  const { id } = req.params;

  // get data from db
  const usersData = JSON.parse(fs.readFileSync("db/users.json").toString());

  // find data
  const singleUser = usersData.find((data) => data.id === id);

  res.render("edit", {
    singleUser,
  });
};

// show single user page
export const showSingleUserPage = (req, res) => {
  const { slug } = req.params;

  // get data from db
  const usersData = JSON.parse(fs.readFileSync("db/users.json").toString());

  // find data
  const singleUser = usersData.find((data) => data.slug === slug);

  res.render("singleProduct", {
    singleUser,
  });
};

// create user
export const createUser = async (req, res) => {
  // destructure
  const { f_name, l_name, age, address, phone, email } = req.body;
  const name = f_name + " " + l_name;

  /**
   * send email
   */

  //create mail transport
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASS,
    },
  });

  //sending email
  await transport.sendMail({
    from: `Ashik Group <${process.env.MAIL_ADDRESS}>`,
    subject: "Email for Welcome",
    to: email,
    html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>email template</title>
        <style>
          body {
            margin: 0;
            padding: 0;
    
            box-sizing: border-box;
            height: 100vh;
            background-color: #dddcdc;
          }
          .container {
            width: 60%;
            margin: 50px auto;
          }
          .mail-head {
            text-align: center;
          }
          .mail-head img {
            width: 100px;
          }
          .mail-body {
            background-color: #fff;
            padding: 15px;
          }
          .mail-body img {
            width: 100%;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="mail-head">
            <img
              src="https://cutewallpaper.org/24/react-logo-png/react-js-logo-clipart-5374089-pinclipart.png"
              alt=""
            />
          </div>
          <div class="mail-body">
            <img
              style="max-width: 100%"
              src="https://media.emailonacid.com/wp-content/uploads/2014/02/2014-ResponsiveDesignTut.jpg"
              alt=""
            />
    
            <h2>Hi, ${name}</h2>
            <h5>Phone: ${phone}</h5>
            <h5>Email: ${email}</h5>
            <p>
            Hello ${name},Your registration has been completed successfully. Welcome to our company.
            Thank you very much.
            </p>
          </div>
        </div>
      </body>
    </html>    
    `,
  });
  // email sending ends here

  /**
   * send sms by "BULK SMS BD"
   */

  axios.get(
    `http://bulksmsbd.net/api/smsapi?api_key=4TZJ5ZeJXC6XM1mNEpb7&type=text&number=(${phone})&senderid=8809617612989&message=Hello ${name},Your registration has been completed successfully. Welcome to our company.
    .
    --Ashik`
  );

  // get data from db
  const usersData = JSON.parse(fs.readFileSync("db/users.json").toString());

  // user data
  const user = {
    id: getRandomUserID(),
    f_name: f_name.trim(),
    l_name: l_name.trim(),
    slug: getProductSlug(name),
    age,
    address,
    phone,
    email,
    photo: req.file.filename,
  };

  // data push
  usersData.push(user);

  // save data to LS
  fs.writeFileSync("db/users.json", JSON.stringify(usersData));

  res.redirect("/");
};

// update user
export const updateUser = (req, res) => {
  const { id } = req.params;
  const { f_name, l_name, age, address, phone, email } = req.body;
  const name = f_name + " " + l_name;

  // get data from db
  const usersData = JSON.parse(fs.readFileSync("db/users.json").toString());

  // photo manage
  let photo_name =
    usersData[usersData.findIndex((data) => data.id === id)].photo;

  if (req?.file?.filename) {
    photo_name = req.file.filename;
  }

  usersData[usersData.findIndex((data) => data.id === id)] = {
    id: id,
    f_name: f_name.trim(),
    l_name: l_name.trim(),
    slug: getProductSlug(name),
    age,
    address,
    phone,
    email,
    photo: photo_name,
  };

  // save data to LS
  fs.writeFileSync("db/users.json", JSON.stringify(usersData));

  res.redirect("/");
};

// delete user
export const deleteUser = (req, res) => {
  const { id } = req.params;

  // get data from db
  const usersData = JSON.parse(fs.readFileSync("db/users.json").toString());

  //   update data after delete
  const updatedData = usersData.filter((data) => data.id !== id);

  // save data to LS
  fs.writeFileSync("db/users.json", JSON.stringify(updatedData));

  res.redirect("/");
};
