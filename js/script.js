/* 
Descricao :
	Gerencia uma lista de livros lidos via DOM. 
  É possivel fazer a adição ou remoção de livros. 
  Os livros já adicinados ficam salvos no localStorage.
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

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("my.reading:books")) || [];
  },

  set(book) {
    localStorage.setItem("my.reading:books", JSON.stringify(book));
  },
};

const Book = {
  all: Storage.get(),

  addBook(book) {
    Book.all.push(book);

    App.releoad();
  },

  removeBook(index) {
    Book.all.splice(index, 1);

    App.releoad();
  },
};

document
  .getElementsByTagName("form")[0]
  .setAttribute("onsubmit", "Form.submit(event)");

const DOM = {
  bookContainer: document.querySelector("#container ul"),

  setBookLi(book, index) {
    const li = document.createElement("li");
    li.innerHTML = DOM.innerHTMLGetBook(book, index);
    li.dataset.index = index;
    DOM.bookContainer.appendChild(li);
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
    DOM.bookContainer.innerHTML = "";
  },
};

const Form = {
  title: document.querySelector("input[name='titulo']"),
  author: document.querySelector("input[name='autor']"),
  link: document.querySelector("input[name='link']"),
  isRead: document.querySelector("input[name='lido']"),

  getValues() {
    return {
      title: Form.title.value,
      author: Form.author.value,
      link: Form.link.value,
      isRead: Form.isRead.value,
    };
  },

  validateFields() {
    const { title, author, link } = Form.getValues();

    if (title.trim() === "" || author.trim() === "" || link.trim() === "") {
      throw new Error("Por favor preencha todos os campos.");
    }
  },

  clearFields() {
    Form.title.value = "";
    Form.author.value = "";
    Form.link.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();

      const data = Form.getValues();
      Book.addBook(data);
      Form.clearFields();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    checkEmptyList();
    Book.all.forEach(DOM.setBookLi);

    Storage.set(Book.all);
  },
  releoad() {
    DOM.clearBook();
    App.init();
  },
};

App.init();
