const authors = [
  {
    name: "J.K. Rowling",
    biography: "J.K. Rowling is a British author, best known for creating the Harry Potter fantasy series. The series has gained immense popularity worldwide and has been adapted into a successful film series.",
  },
  {
    name: "Stephen King",
    biography: "Stephen King is an American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels. Many of his books have been adapted into films, TV series, and miniseries.",
  },
  {
    name: "Haruki Murakami",
    biography: "Haruki Murakami is a Japanese author and translator, known for his surrealistic and melancholic novels and short stories. His works often explore themes of loneliness, alienation, and the search for identity.",
  },
  {
    name: "Margaret Atwood",
    biography: "Margaret Atwood is a Canadian author known for her novels, poetry, and essays. She is best known for her dystopian novel 'The Handmaid's Tale,' which has been adapted into a popular TV series.",
  },
  {
    name: "George R.R. Martin",
    biography: "George R.R. Martin is an American author and screenwriter, known for his epic fantasy series 'A Song of Ice and Fire,' which was adapted into the TV series 'Game of Thrones.'",
  },
  {
    name: "Agatha Christie",
    biography: "Agatha Christie was an English writer known for her detective novels and short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple.",
  },
  {
    name: "Toni Morrison",
    biography: "Toni Morrison was an American novelist, essayist, editor, and professor, known for her novels exploring the African American experience, including 'Beloved' and 'The Bluest Eye.'",
  },
  {
    name: "J.R.R. Tolkien",
    biography: "J.R.R. Tolkien was an English writer, poet, philologist, and university professor, best known for his high fantasy works 'The Hobbit' and 'The Lord of the Rings.'",
  },
  {
    name: "Jane Austen",
    biography: "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique, and comment upon the British landed gentry at the end of the 18th century.",
  },
  {
    name: "Charles Dickens",
    biography: "Charles Dickens was an English writer and social critic. He created some of the world's best-known fictional characters and is regarded by many as the greatest novelist of the Victorian era.",
  },
];

const books = [
  {
    author: "J.K. Rowling",
    title: "Harry Potter and the Sorcerer's Stone",
    isbn: "9780590353427",
    price: 10.99,
    description: "The first book in the Harry Potter series.",
    genre: "Fantasy",
    quantity: 100,
  },
  {
    author: "Stephen King",
    title: "The Shining",
    isbn: "9780307743657",
    price: 8.99,
    description: "A psychological horror novel.",
    genre: "Horror",
    quantity: 50,
  },
  {
    author: "Haruki Murakami",
    title: "Norwegian Wood",
    isbn: "9780375704024",
    price: 9.99,
    description: "A nostalgic novel about love and loss.",
    genre: "Fiction",
    quantity: 75,
  },
  {
    author: "Margaret Atwood",
    title: "The Handmaid's Tale",
    isbn: "9780385490818",
    price: 11.99,
    description: "A dystopian novel set in a totalitarian society.",
    genre: "Science Fiction",
    quantity: 60,
  },
  {
    author: "George R.R. Martin",
    title: "A Game of Thrones",
    isbn: "9780553381689",
    price: 12.99,
    description: "The first book in the 'A Song of Ice and Fire' series.",
    genre: "Fantasy",
    quantity: 80,
  },
  {
    author: "Agatha Christie",
    title: "Murder on the Orient Express",
    isbn: "9780062693662",
    price: 7.99,
    description: "A classic detective novel featuring Hercule Poirot.",
    genre: "Mystery",
    quantity: 40,
  },
  {
    author: "Toni Morrison",
    title: "Beloved",
    isbn: "9781400033416",
    price: 10.99,
    description: "A novel about slavery and its aftermath.",
    genre: "Fiction",
    quantity: 55,
  },
  {
    author: "J.R.R. Tolkien",
    title: "The Hobbit",
    isbn: "9780345534835",
    price: 9.99,
    description: "A fantasy novel about a hobbit on a quest.",
    genre: "Fantasy",
    quantity: 70,
  },
  {
    author: "Jane Austen",
    title: "Pride and Prejudice",
    isbn: "9780141439518",
    price: 8.99,
    description: "A romantic novel set in Georgian England.",
    genre: "Romance",
    quantity: 45,
  },
  {
    author: "Charles Dickens",
    title: "Great Expectations",
    isbn: "9780141439563",
    price: 7.99,
    description: "A novel about the life of an orphan named Pip.",
    genre: "Classic",
    quantity: 65,
  },
];


module.exports = {
  authors,
  books
}

