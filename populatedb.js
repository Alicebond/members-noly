#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const Post = require("./models/post");
const User = require("./models/user");
const { username, password } = require("./config");

const posts = [];
const users = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = `mongodb+srv://${username}:${password}@cluster0.bcxtiqx.mongodb.net/clubhouse?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createPosts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function userCreate(index, firstname, lastname, username, password) {
  const userDetail = { firstname, lastname, username, password };

  const user = new User(userDetail);

  await user.save();
  users[index] = user;
  console.log(`Added author: ${firstname} ${lastname}`);
}

async function postCreate(index, title, content, author) {
  const postDetail = { title, content, author };

  const post = new Post(postDetail);
  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(0, "Patrick", "Rothfuss", "PP", "88888"),
    userCreate(1, "Ben", "Bova", "BB", "88888"),
    userCreate(2, "Isaac", "Asimov", "IA", "88888"),
    userCreate(3, "Jim", "Jones", "JJ", "88888"),
  ]);
}

async function createPosts() {
  console.log("Adding Books");
  await Promise.all([
    postCreate(
      0,
      "The Name of the Wind (The Kingkiller Chronicle, #1)",
      "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.",
      users[0]
    ),
    postCreate(
      1,
      "The Wise Man's Fear (The Kingkiller Chronicle, #2)",
      "Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.",
      users[0]
    ),
    postCreate(
      2,
      "The Slow Regard of Silent Things (Kingkiller Chronicle)",
      "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.",
      users[0]
    ),
    postCreate(
      3,
      "Apes and Angels",
      "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...",
      users[1]
    ),
    postCreate(
      4,
      "Death Wave",
      "In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...",
      users[2]
    ),
    postCreate(
      5,
      "Test Book 1",
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat amet odit dignissimos, aut fuga nisi maiores minima incidunt. Nostrum veritatis sunt deserunt excepturi animi delectus. Quas, repellat doloremque. Iusto, deserunt.",
      users[3]
    ),
    postCreate(
      6,
      "Test Book 2",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat expedita vero in earum, quis dolorem voluptas pariatur mollitia veniam nobis.",
      users[3]
    ),
  ]);
}
