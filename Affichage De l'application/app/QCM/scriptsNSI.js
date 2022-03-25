//
// lib/lib.js
//
var Question = function (questionObj) {
  this.value = {
    text: "Question",
    answers: []
  };

  this.selectedAnswer = null;
  this.html = null;
  this.questionText = null;
  this.questionAnswers = null;
  this.questionFeedback = null;

  this.value = Object.assign(this.value, questionObj);

  this.onQuestionAnswered = ({ detail }) => {
    this.selectedAnswer = {
      value: detail.answer,
      html: detail.answerHtml
    };
    this.update();

    document.dispatchEvent(
      new CustomEvent("question-answered", {
        detail: {
          question: this,
          answer: detail.answer
        }
      })
    );
  };

  this.create = function () {
    this.html = document.createElement("div");
    this.html.classList.add("question");

    this.questionText = document.createElement("h2");
    this.questionText.textContent = this.value.text;

    this.questionAnswers = document.createElement("div");
    this.questionAnswers.classList.add("answers");

    for (let i = 0; i < this.value.answers.length; i++) {
      const ansObj = this.value.answers[i];
      let answer = createAnswer(ansObj);

      answer.onclick = (ev) => {
        if (this.selectedAnswer !== null) {
          this.selectedAnswer.html.classList.remove("selected");
        }

        answer.classList.add("selected");

        this.html.dispatchEvent(
          new CustomEvent("question-answered", {
            detail: {
              answer: ansObj,
              answerHtml: answer
            }
          })
        );
      };

      this.questionAnswers.appendChild(answer);
    }

    this.questionFeedback = document.createElement("div");
    this.questionFeedback.classList.add("question-feedback");

    this.html.appendChild(this.questionText);
    this.html.appendChild(this.questionAnswers);
    this.html.appendChild(this.questionFeedback);

    this.html.addEventListener("question-answered", this.onQuestionAnswered);

    return this.html;
  };

  this.disable = function () {
    this.html.classList.add("disabled");
    this.html.onclick = (ev) => {
      ev.stopPropagation();
    };

    this.html.removeEventListener("question-answered", this.onQuestionAnswered);

    let answers = this.html.querySelectorAll(".answer");
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      answer.onclick = null;
    }
  };

  this.remove = function () {
    let children = this.html.querySelectorAll("*");
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      this.html.removeChild(child);
    }

    this.html.removeEventListener("question-answered", this.onQuestionAnswered);

    this.html.parentNode.removeChild(this.html);
    this.html = null;
  };

  this.update = function () {
    let correctFeedback, incorrectFeedback;
    this.html = this.html || document.createElement("div");

  

    if (this.selectedAnswer !== null) {
      if (this.selectedAnswer.value.isCorrect) {
        this.html.classList.add("correct");
        this.html.classList.remove("incorrect");
        this.questionFeedback.innerHTML = correctFeedback;
      } else {
        this.html.classList.add("incorrect");
        this.html.classList.remove("correct");
        this.questionFeedback.innerHTML = incorrectFeedback;
      }
    }
  };

  function createAnswer(obj) {
    this.value = {
      text: "Answer",
      isCorrect: false
    };

    this.value = Object.assign(this.value, obj);

    this.html = document.createElement("button");
    this.html.classList.add("answer");

    this.html.textContent = this.value.text;

    return this.html;
  }
};

let questionsData = [
  {
    text: "Quelle est l'écriture de  –58 codé en complément à deux sur un octet ? ",
    answers: [
      {
        text: "0011 1010",
        isCorrect: false
      },
      {
        text: "1011 1010",
        isCorrect: false
      },
      {
        text: "1100 0100",
        isCorrect: false
      },
      {
        text: "1100 0110",
        isCorrect: true
      }
    ]
  },
  {
    text: "Quelle est la représentation hexadécimale de 0100 1001 1101 0011 ?",
    answers: [
      {
        text: "18899",
        isCorrect: false
      },
      {
        text: "3D94",
        isCorrect: false
      },
      {
        text: "49D3",
        isCorrect: true
      },
      {
        text: "93A3",
        isCorrect: false
      }
    ]
  },
  {
    text: "Si on tape dans la console:[1,4,3] + [2,4,5]; Qu'obtient-on ?",
    answers: [
      {
        text: "[3, 8, 8]",
        isCorrect: false
      },
      {
        text: "[19]",
        isCorrect: false
      },
      {
        text: "un message d'erreur",
        isCorrect: false
      },
      {
        text: "[1, 4, 3, 2, 4, 5]",
        isCorrect: true
      }
    ]
  },
  {
    text: "Sous Unix, quelle commande permet de créer un nouveau répertoire ?",
    answers: [
      {
        text: "mkdir",
        isCorrect: true
      },
      {
        text: "echo",
        isCorrect: false
      },
      {
        text: "rm",
        isCorrect: false
      },
      {
        text: "ls",
        isCorrect: false
      }
    ]
  },
  {
    text: " Soit: tableau = [[1,3,4],[2,7,8],[9,10,6],[12,11,5]] Pour accéder à la valeur 12, on écrit pour cela :",
    answers: [
      {
        text: "tableau[4][1]",
        isCorrect: false
      },
      {
        text: "tableau[1][4]",
        isCorrect: false
      },
      {
        text: "tableau[3][0]",
        isCorrect: true
      },
      {
        text: "tableau[0][3]",
        isCorrect: false
      }
    ]
  },
  {
    text: "Le premier élément d'une liste Python L est noté :",
    answers: [
      {
        text: "L(0)",
        isCorrect: false
      },
      {
        text: "L(1)",
        isCorrect: false
      },
      {
        text: "L[0]",
        isCorrect: true
      },
      {
        text: "L[1]",
        isCorrect: false
      }
    ]
  },
  {
    text: "On se propose de créer une base 4 avec les symboles {0, 1, 2 et 3} Le nombre décimale (15)10 sera converti en base 4 par :",
    answers: [
      {
        text: "32",
        isCorrect: false
      },
      {
        text: "33",
        isCorrect: true
      },
      {
        text: "41",
        isCorrect: false
      },
      {
        text: "21",
        isCorrect: false
      }
    ]
  },
  {
    text: "Quelle est, en écriture décimale, la somme d'entiers dont l'écriture en base 16 est 2A + 2 ?",
    answers: [
      {
        text: "22",
        isCorrect: false
      },
      {
        text: "31",
        isCorrect: false
      },
      {
        text: "49",
        isCorrect: false
      },
      {
        text: "44",
        isCorrect: true
      }
    ]
  },
  {
    text: "Quelle est l'écriture décimale du nombre qui s'écrit 11,0101 en binaire ?",
    answers: [
      {
        text: "3",
        isCorrect: false
      },
      {
        text: "3,0101",
        isCorrect: false
      },
      {
        text: "3,05",
        isCorrect: false
      },
      {
        text: "3,3125",
        isCorrect: true
      }
    ]
  },
  {
    text: "On considère l'instruction: resultat = [0] * 7 Que contient la variable resultat après son exécution ?",
    answers: [
      {
        text: "0",
        isCorrect: false
      },
      {
        text: "[0]",
        isCorrect: false
      },
      {
        text: "[[0], [0], [0], [0], [0], [0], [0]]",
        isCorrect: false
      },
      {
        text: "[0, 0, 0, 0, 0, 0, 0]",
        isCorrect: true
      }
    ]
  },
  {
    text: "Qu'effectue-t-on en lançant la commande suivante dans un terminal Linux : cp /etc/professeur/fichier.conf /home/nsi/fichier.conf",
    answers: [
      {
        text: "un déplacement de fichier",
        isCorrect: false
      },
      {
        text: "une copie de fichier",
        isCorrect: true
      },
      {
        text: "un renommage de fichier",
        isCorrect: false
      },
      {
        text: "un changement de répertoire",
        isCorrect: false
      }
    ]
  },
  {
    text: "Parmi les propositions suivantes, laquelle est la représentation binaire de 761 ?",
    answers: [
      {
        text: "11 1100 1101",
        isCorrect: false
      },
      {
        text: "11 1110 0101 ",
        isCorrect: false
      },
      {
        text: "10 0111 1001 ",
        isCorrect: true
      },
      {
        text: "10 1111 0001",
        isCorrect: false
      }
    ]
  },
  {
    text: "Quelle expression a pour valeur la liste des carrés des premiers entiers qui ne sont pas multiples de 5 ? ",
    answers: [
      {
        text: " [x*x for x in range (11) if x//5 != 0] ",
        isCorrect: false
      },
      {
        text: "[x*x if x%5 != 0 for x in range (11)] ",
        isCorrect: true
      },
      {
        text: " [x*x for x in range (11) if x%5 != 0]",
        isCorrect: false
      },
      {
        text: " [x*x if x//5 != 0 for x in range (11)] ",
        isCorrect: false
      }
    ]
  },
  {
    text: "La couleur « vert impérial » est codée, en écriture décimale, par (0, 86, 27). Le codage hexadécimal correspondant est : ",
    answers: [
      {
        text: "(0, 134, 39)",
        isCorrect: false
      },
      {
        text: "(0, 134, 1B)",
        isCorrect: false
      },
      {
        text: "(0, 56, 1B) ",
        isCorrect: true
      },
      {
        text: "(0, 56, 39) ",
        isCorrect: false
      }
    ]
  },
  {
    text: "On définit : notes = [('Toto', 20), ('John', 12), ('Johnny', 2), ('Superman', 16)] Quelle est l'expression donnant la note de Superman ?",
    answers: [
      {
        text: "notes[4][2] ",
        isCorrect: false
      },
      {
        text: "notes[3][1] ",
        isCorrect: true
      },
      {
        text: "notes[Superman]",
        isCorrect: false
      },
      {
        text: "notes['Superman']",
        isCorrect: false
      }
    ]
  },
  {
    text: "Quelle est celle qui correspond au résultat de la soustraction en écriture binaire 1010 1101 - 101 1000 ? ",
    answers: [
      {
        text: "101 0101",
        isCorrect: true
      },
      {
        text: "110 0001 ",
        isCorrect: false
      },
      {
        text: "100 1111 ",
        isCorrect: false
      },
      {
        text: "1 1000 0111",
        isCorrect: false
      }
    ]
  },
  {
    text: "Un nombre entier signé est codé en complément à deux sur 8 bits par : 0111 0101. Que peut-on dire ?",
    answers: [
      {
        text: "c'est un nombre positif ",
        isCorrect: true
      },
      {
        text: " c'est un nombre négatif",
        isCorrect: false
      },
      {
        text: "c'est un nombre pair ",
        isCorrect: false
      },
      {
        text: " 7 bits auraient suffi à représenter cet entier signé en complément à deux",
        isCorrect: false
      }
    ]
  },
  {
    text: "La variable x contient la valeur 3, la variable y contient la variable 4. Quelle expression s'évalue en True ? ",
    answers: [
      {
        text: "x == 3 or y == 5 ",
        isCorrect: true
      },
      {
        text: "x == 3 and y == 5 ",
        isCorrect: false
      },
      {
        text: "x != 3 or y == 5 ",
        isCorrect: false
      },
      {
        text: "y < 4 ",
        isCorrect: false
      }
    ]
  },
  {
    text: "Quel est celui dont la représentation sous forme de nombre flottant peut être écrite de manière exacte avec un nombre fini de chiffres en base 2 ? ",
    answers: [
      {
        text: " 1/5 ",
        isCorrect: false
      },
      {
        text: "1/6 ",
        isCorrect: false
      },
      {
        text: "1/7",
        isCorrect: false
      },
      {
        text: "1/8 ",
        isCorrect: true
      }
    ]
  },
  {
    text: "Quel est le nombre minimum de bits qui permet de représenter les 26 lettres majuscules de l'alphabet ?",
    answers: [
      {
        text: "4",
        isCorrect: false
      },
      {
        text: "5",
        isCorrect: true
      },
      {
        text: "25",
        isCorrect: false
      },
      {
        text: "26",
        isCorrect: false
      }
    ]
  }
];

// variables initialization
let questions = [];
let score = 0,
  answeredQuestions = 0;
let appContainer = document.getElementById("questions-container");
let scoreContainer = document.getElementById("score-container");
scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;

/**
 * Shuffles array in place. ES6 version
 * @param {Array} arr items An array containing the items.
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

shuffle(questionsData);

// creating questions
for (var i = 0; i < questionsData.length; i++) {
  let question = new Question({
    text: questionsData[i].text,
    answers: questionsData[i].answers
  });

  appContainer.appendChild(question.create());
  questions.push(question);
}

document.addEventListener("question-answered", ({ detail }) => {
  if (detail.answer.isCorrect) {
    score++;
  }

  answeredQuestions++;
  scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
  detail.question.disable();

  if (answeredQuestions == questions.length) {
    setTimeout(function () {
      alert(`Quiz completed! \nFinal score: ${score}/${questions.length}`);
    }, 100);
  }
});

console.log(questions, questionsData);
