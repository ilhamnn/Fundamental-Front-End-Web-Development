import notesData from "./data.js";

class InP extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>  
        .bg1 {
        text-align: center;
        }

        .in {
        align-items: center;
        margin: 20px auto;
        padding: 10px;
        border-radius: 15px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        width: 50%;
        position: relative;
        text-align: center;
        }

        .in:hover {
        transform: translateY(-5px);
        box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.08);
        }

        .in h3 {
        margin-bottom: 10px;
        }

        .in input,
        .in textarea,
        .in button {
        margin-bottom: 10px;
        display: block;
        width: calc(100% - 20px);
        margin-left: auto;
        margin-right: auto;
        }

        .in button {
        margin-top: 10px;
        width: 240px;
        height: 30px;
        border-radius: 10px;
        background-color: #7fffd4;
        }

        #title {
        height: 30px;
        border-radius: 10px;
        border-color: rgb(125, 125, 125);
        border-style: solid;
        }

        #Note {
        height: 190px;
        width: 98%;
        border-radius: 10px;
        padding-top: 10px;
        box-sizing: border-box;
        resize: none;
        overflow-y: auto;
        line-height: 1.5;
        border-color: rgb(125, 125, 125);
        border-style: solid;
        }

        .Show {
        margin: 10px;
        padding-top: 10px;
        padding: auto;
        text-align: center;
        }

        .notes-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        }

        .ntin {
        height: 150px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        white-space: pre-wrap;
        }

        .ntin h4 {
        margin: 0 0 10px 0;
        font-size: 1.2em;
        }

        .ntin p {
        margin: 0;
        font-size: 0.9em;
        }

        @media screen and (max-width: 482px) {
        .in button {
            margin-top: 10px;
            width: 40px;
            height: 30px;
            border-radius: 10px;
            background-color: #7fffd4;
        }
        }
      </style>
      <main>
        <div class="in">
          <h3>Masukkan aja Notenya</h3>
          <input type="text" id="title" placeholder="Title">
          <textarea id="Note" placeholder="Note"></textarea>
          <button id="addNoteButton">Add</button>
        </div>
        <div class="Show">
          <h3>Notenya</h3>
          <div id="notesContainer" class="notes-container">
          </div>
        </div>
      </main>
    `;

    const formatNoteContent = (content) => {
      const words = content.split(" ");
      let formattedContent = "";
      for (let i = 0; i < words.length; i += 5) {
        formattedContent += words.slice(i, i + 5).join(" ") + "\n";
      }
      return formattedContent;
    };

    const renderNotes = () => {
      const notesContainer = this.shadowRoot.getElementById("notesContainer");
      notesContainer.innerHTML = "";
      notesData.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("ntin");
        noteElement.innerHTML = `
          <h4>${note.title}</h4>
          <p>${formatNoteContent(note.body)}</p>
        `;
        notesContainer.appendChild(noteElement);
      });
    };

    const addNote = () => {
      const titleInput = this.shadowRoot.getElementById("title");
      const noteInput = this.shadowRoot.getElementById("Note");
      const newNote = {
        id: `notes-${Date.now()}`,
        title: titleInput.value,
        body: noteInput.value,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      notesData.push(newNote);
      renderNotes();
      titleInput.value = "";
      noteInput.value = "";
    };

    this.shadowRoot
      .getElementById("addNoteButton")
      .addEventListener("click", addNote);
    renderNotes();
  }
}

customElements.define("i-p", InP);
