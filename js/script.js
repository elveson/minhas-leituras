/* 
Descricao :
	O que o arquivo faz ...
Aluno :
	Elveson S. Costa
Data :
	10 / 07 / 2021
*/

function checkEmptyList() {
  if (!document.querySelector("ul").childNodes.length) {
    document.querySelector("ul").innerHTML = "Adicione um livro abaixo!";
  }
}

const books = [
  {
    title: "As Cronicas de Narnia",
    author: "C. S. Lewis",
    url: "http://www.google.com",
    isRead: true,
  },
  {
    title: "1984",
    author: "George Orwell",
    url: "http://www.google.com",
    isRead: false,
  },
  {
    title:
      "Nama Nenê: Como Cuida de seu bebê para que durma a noite toda de forma natural",
    author: "Gary Ezzo",
    url: "http://www.google.com",
    isRead: true,
  },
];

// const Storage = {
//   get() {
//     return JSON.parse(localStorage.getItem("my.reading:books")) || []
//   },
//   set(books) {
//     localStorage.setItem("my.reading:books", JSON.stringify(books));
//   },
// },

const Book = {
  all: books,
  bookContainer: document.querySelector("#container ul"),

  addBook(book) {
    Book.all.push(book);
    App.releoad();
    console.log(Book.all);
  },

  removeBook(index) {
    Book.all.splice(index, 1);

    App.releoad();
  },

  setBookLi(book, index) {
    const li = document.createElement("li");
    li.innerHTML = Book.innerHTMLGetBook(book, index);
    li.dataset.index = index;
    Book.bookContainer.appendChild(li);
    // document.getElementsByTagName("li").className = "lido";
  },

  innerHTMLGetBook(book, index) {
    const html = `
        <span>${book.title} - ${book.author}</span>
        <span>
          <a href=${book.url}>
            <button class="btn-buy" onClick>
              <span class="material-icons">
                shopping_cart
              </span>  
            </button>
          </a>
          <button class="delete" onClick="Book.removeBook(${index})" >
              <span class="material-icons">
                delete
              </span>
          </button>
        </span>
    `;
    return html;
  },

  clearBook() {
    Book.bookContainer.innerHTML = "";
  },
};

const Form = {
  title: document.querySelector(".titulo"),
  author: document.querySelector(".autor"),
  link: document.querySelector(".link"),
  isRead: document.querySelector(".lido"),

  getValues() {
    return {
      title: Form.title.value,
      author: Form.author.value,
      link: Form.link.value,
      isRead: Form.isRead.value,
    };
  },

  validateForm() {
    const { title, author, link } = Form.getValues();

    if (title.trim() === "" || author.trim() === "" || link.trim() === "") {
      throw new Error("Por favor preencha todos os campos.");
    }
  },

  saveBook(book) {
    Book.addBook(book);
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateForm();

      Form.saveBook(Form.getValues());

      // App.releoad();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    Book.all.forEach((book, index) => {
      Book.setBookLi(book, index);
    });

    checkEmptyList();
  },
  releoad() {
    Book.clearBook();
    App.init();
  },
};

App.init();

// Book.addBook({
//   title: "Uma gloria peculiar",
//   author: "Jhon Piper",
//   url: "http://",
//   isRead: true,
// });
