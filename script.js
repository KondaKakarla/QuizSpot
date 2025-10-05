// ===== Users =====
function getUsers() { return JSON.parse(localStorage.getItem('users') || '[]'); }
function saveUsers(users) { localStorage.setItem('users', JSON.stringify(users)); }

// ===== Login / Signup / Forgot =====
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (document.getElementById('loginBtn')) {
    document.getElementById('loginBtn').onclick = () => {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            localStorage.setItem('currentUser', username);
            window.location.href = 'domains.html';
        } else alert('No user found or wrong password');
    };
}

if (document.getElementById('signupBtn')) {
    document.getElementById('signupBtn').onclick = () => {
        const username = document.getElementById('signupUsername').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        if (!username || !password) { alert('Enter both fields'); return; }
        const users = getUsers();
        if (users.some(u => u.username === username)) { alert('Username exists'); return; }
        users.push({ username, password, scores: [] });
        saveUsers(users);
        alert('Signup successful! Login now');
        showLoginForm();
    };
}

function showSignupForm() { if (loginForm) loginForm.style.display = 'none'; if (signupForm) signupForm.style.display = 'block'; }
function showLoginForm() { if (loginForm) loginForm.style.display = 'block'; if (signupForm) signupForm.style.display = 'none'; }

if (document.getElementById('showSignup')) document.getElementById('showSignup').onclick = showSignupForm;
if (document.getElementById('showLogin')) document.getElementById('showLogin').onclick = showLoginForm;

if (document.getElementById('forgotBtn')) document.getElementById('forgotBtn').onclick = () => {
    const username = prompt("Enter your username:")?.trim();
    if (!username) return;
    const users = getUsers();
    const user = users.find(u => u.username === username);
    if (user) {
        const newPass = prompt("Enter new password:").trim();
        user.password = newPass;
        saveUsers(users);
        alert("Password reset!");
    } else alert("User not found!");
};

// ===== Domains =====
const domains = [
    { name: "HTML", img: "images/html.png" },
    { name: "CSS", img: "images/css.png" },
    { name: "JavaScript", img: "images/js.png" },
    { name: "Python", img: "images/python.png" },
    { name: "C", img: "images/c.png" },
    { name: "C++", img: "images/cpp.png" },
    { name: "Java", img: "images/java.png" },
    { name: "React", img: "images/react.png" },
    { name: "Node.js", img: "images/node.png" },
    { name: "SQL", img: "images/sql.png" }
];

function renderDomains(filter = '') {
    const domainList = document.getElementById('domainList'); if (!domainList) return;
    domainList.innerHTML = '';
    domains
      .filter(d => d.name.toLowerCase().startsWith(filter.toLowerCase()))
      .forEach(d => {
            const div = document.createElement('div'); div.className = 'domain-card';
            div.innerHTML = `<img src="${d.img}" alt="${d.name}"><p>${d.name}</p>`;
            div.onclick = () => { localStorage.setItem('domain', d.name); window.location.href = 'quiz.html'; };
            domainList.appendChild(div);
        });
}

if (document.getElementById('domainSearch')) {
    document.getElementById('domainSearch').addEventListener('input', () => {
        renderDomains(document.getElementById('domainSearch').value);
    });
    renderDomains();
}

// ===== Quizzes =====
const quizzes = {
    HTML: [
    { q: "What is the purpose of HTML?", options: ["Structure web content", "Style web pages", "Store data"], answer: 0 },
    { q: "Which HTML element is used to link to external files?", options: ["link", "script", "a"], answer: 0 },
    { q: "What does the 'alt' attribute in <img> specify?", options: ["Alternative text for image", "Image title", "Image link"], answer: 0 },
    { q: "What is semantic HTML?", options: ["HTML that conveys meaning", "HTML with style", "HTML with scripts"], answer: 0 },
    { q: "Which attribute specifies an element’s unique identifier?", options: ["id", "class", "name"], answer: 0 },
    { q: "Viewport meta tag is used for?", options: ["Responsive design", "Adding scripts", "SEO optimization"], answer: 0 },
    { q: "Which attribute is used to open links in a new tab?", options: ["target='_blank'", "href='_new'", "link='_tab'"], answer: 0 },
    { q: "Which HTML element represents navigation links?", options: ["nav", "menu", "section"], answer: 0 },
    { q: "What is the purpose of the <meta> tag?", options: ["Provide metadata", "Insert images", "Create forms"], answer: 0 },
    { q: "Which HTML element is used for a self-contained composition?", options: ["article", "div", "span"], answer: 0 }
],

    CSS: [
        { q: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], answer: 0 },
        { q: "Property for text color?", options: ["color", "background", "font-style"], answer: 0 },
        { q: "Property for font size?", options: ["font-size", "text-size", "size"], answer: 0 },
        { q: "To center content?", options: ["text-align:center", "align:center", "center:both"], answer: 0 },
        { q: "Selector for class?", options: [".class", "#id", "*"], answer: 0 },
        { q: "Property for background color?", options: ["background-color", "color", "bgcolor"], answer: 0 },
        { q: "Display flex?", options: ["display:flex", "display:block", "display:grid"], answer: 0 },
        { q: "Margin property?", options: ["margin", "padding", "spacing"], answer: 0 },
        { q: "Padding property?", options: ["padding", "margin", "space"], answer: 0 },
        { q: "Border-radius?", options: ["border-radius", "border-style", "border-width"], answer: 0 }
    ],
    C: [
        { q: "Which function is used to dynamically allocate memory in C?", options: ["new", "malloc()", "create"], answer: 1 },
        { q: "What does the & operator do in C?", options: ["Value at address", "Address of variable", "Bitwise AND"], answer: 1 },
        { q: "The standard header for input/output in C is?", options: ["iostream.h", "stdio.h", "stdlib.h"], answer: 1 },
        { q: "Which loop guarantees at least one execution?", options: ["for", "while", "do-while"], answer: 2 },
        { q: "What is the size of a character variable in C (in bytes)?", options: ["1", "2", "4"], answer: 0 },
        { q: "Which operator is used to access the member of a structure through its pointer?", options: ["->", ".", "::"], answer: 0 },
        { q: "The process of linking libraries to an executable is known as:", options: ["Preprocessing", "Compilation", "Linking"], answer: 2 },
        { q: "What is the return type of the main() function in C?", options: ["void", "int", "char"], answer: 1 },
        { q: "Which keyword is used to prevent any changes in the variable's value?", options: ["static", "volatile", "const"], answer: 2 },
        { q: "The function free(ptr) is used to:", options: ["Reset the pointer", "De-allocate memory", "Clear the variable"], answer: 1 }
    ],
    Java: [
        { q: "Java is primarily a _________ language.", options: ["Procedural", "Object-Oriented", "Scripting"], answer: 1 },
        { q: "Which keyword prevents a class from being subclassed?", options: ["static", "abstract", "final"], answer: 2 },
        { q: "What is the parent class of all classes in Java?", options: ["Main", "Object", "System"], answer: 1 },
        { q: "Which of these is not a Java primitive data type?", options: ["int", "String", "boolean"], answer: 1 },
        { q: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Validation Method", "Junction Vector Module"], answer: 0 },
        { q: "Which method must be implemented by any class that implements the Runnable interface?", options: ["execute()", "start()", "run()"], answer: 2 },
        { q: "Which block always executes, whether an exception is thrown or not?", options: ["try", "catch", "finally"], answer: 2 },
        { q: "Java code is compiled into what format?", options: ["Executable files", "Bytecode", "Assembly code"], answer: 1 },
        { q: "What is the default value of a boolean primitive variable in Java?", options: ["1", "false", "true"], answer: 1 },
        { q: "Which access modifier means the member is accessible only within its own class?", options: ["protected", "private", "default"], answer: 1 }
    ],
    'C++': [
        { q: "What is the primary feature C++ adds over C for OOP?", options: ["Headers", "Classes", "Pointers"], answer: 1 },
        { q: "Which symbol is used for the scope resolution operator?", options: [".", "->", "::"], answer: 2 },
        { q: "What keyword is used for runtime polymorphism?", options: ["virtual", "override", "dynamic"], answer: 0 },
        { q: "Which is a stream object for standard output?", options: ["cin", "cout", "cerr"], answer: 1 },
        { q: "C++ comments start with?", options: ["//", "#", "/*"], answer: 0 },
        { q: "What is an alias to an existing variable in C++?", options: ["Pointer", "Reference", "Object"], answer: 1 },
        { q: "Which memory allocation operator is type-safe?", options: ["malloc", "new", "calloc"], answer: 1 },
        { q: "The concept of hiding implementation details from the user is called:", options: ["Polymorphism", "Inheritance", "Encapsulation"], answer: 2 },
        { q: "Which STL container stores unique elements in sorted order?", options: ["vector", "list", "set"], answer: 2 },
        { q: "What is the default access specifier for members of a class in C++?", options: ["public", "private", "protected"], answer: 1 }
    ],
    JavaScript: [
        { q: "Which keyword creates a variable with block scope?", options: ["var", "let", "const"], answer: 1 },
        { q: "What does === check for?", options: ["Value only", "Type only", "Value and type"], answer: 2 },
        { q: "How do you handle asynchronous operations (pre-ES6)?", options: ["Promises", "Callbacks", "Async/Await"], answer: 1 },
        { q: "The JavaScript engine is typically single-threaded. True or False?", options: ["True", "False"], answer: 0 },
        { q: "What is JavaScript's historical bug for typeof null?", options: ["'null'", "'object'", "'undefined'"], answer: 1 },
        { q: "Which method adds a new element to the end of an array?", options: ["shift()", "push()", "pop()"], answer: 1 },
        { q: "The concept of moving variable and function declarations to the top of their scope is called:", options: ["Scoping", "Hoisting", "Casting"], answer: 1 },
        { q: "The operator ! performs which kind of operation?", options: ["Logical OR", "Logical NOT", "Strict Equality"], answer: 1 },
        { q: "What object represents structured data in a key:value format?", options: ["Array", "Object", "String"], answer: 1 },
        { q: "What is the global scope object in a web browser?", options: ["document", "window", "process"], answer: 1 }
    ],
    React: [
        { q: "What is the name for the in-memory representation of the DOM?", options: ["Real DOM", "Shadow DOM", "Virtual DOM"], answer: 2 },
        { q: "The special prop used to pass content between component tags is?", options: ["props", "children", "content"], answer: 1 },
        { q: "Which Hook manages changing data in a functional component?", options: ["useEffect", "useContext", "useState"], answer: 2 },
        { q: "JSX stands for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON Xpress"], answer: 0 },
        { q: "React uses which approach for re-rendering?", options: ["Imperative", "Declarative"], answer: 1 },
        { q: "To perform side effects like data fetching, you use which Hook?", options: ["useState", "useEffect", "useCallback"], answer: 1 },
        { q: "Which lifecycle method is the closest equivalent to the useEffect cleanup return?", options: ["componentDidMount", "componentWillUnmount", "shouldComponentUpdate"], answer: 1 },
        { q: "React components must return a single root element. True or False?", options: ["True", "False"], answer: 0 },
        { q: "How do you conditionally render an element in JSX?", options: ["If/Else statements", "Ternary operator or logical AND (&&)", "The Switch statement"], answer: 1 },
        { q: "Data passed from a parent component to a child is called:", options: ["State", "Hooks", "Props"], answer: 2 }
    ],
    'Nodejs': [
        { q: "Node.js is built on which JavaScript engine?", options: ["SpiderMonkey", "V8", "Chakra"], answer: 1 },
        { q: "Node.js is famous for its _________ architecture.", options: ["Blocking", "Synchronous", "Non-blocking"], answer: 2 },
        { q: "The primary tool for managing Node.js packages is?", options: ["Yarn", "NPM", "Bundler"], answer: 1 },
        { q: "Which global object is similar to the browser's window object?", options: ["global", "process", "console"], answer: 0 },
        { q: "How is asynchronous I/O typically handled?", options: ["Event Loop", "Thread Pool", "Async Queue"], answer: 0 },
        { q: "Which module is used for working with file systems?", options: ["http", "fs", "path"], answer: 1 },
        { q: "What is the package manifest file in a Node.js project?", options: ["index.js", "package.json", "config.js"], answer: 1 },
        { q: "What does REPL stand for in the context of Node.js?", options: ["Run Execute Print Loop", "Read Execute Print Loop", "Rapid Environment Protocol Loop"], answer: 1 },
        { q: "Which framework is commonly used for building web APIs in Node.js?", options: ["React", "Express", "Angular"], answer: 1 },
        { q: "When using the require() function, what is the default file extension assumed?", options: [".js", ".node", ".json"], answer: 0 }
    ],
    SQL: [
        { q: "Which command retrieves data from a database?", options: ["GET", "SELECT", "PULL"], answer: 1 },
        { q: "Which JOIN returns matched records from both tables?", options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN"], answer: 2 },
        { q: "Which clause filters records after grouping?", options: ["WHERE", "GROUP BY", "HAVING"], answer: 2 },
        { q: "What language is SQL?", options: ["Procedural", "Declarative", "Markup"], answer: 1 },
        { q: "Which command changes a table's structure?", options: ["UPDATE TABLE", "MODIFY TABLE", "ALTER TABLE"], answer: 2 },
        { q: "Which clause is used to sort the result-set of a query?", options: ["SORT BY", "ORDER BY", "ARRANGE BY"], answer: 1 },
        { q: "What command adds new rows of data to a table?", options: ["ADD", "CREATE", "INSERT INTO"], answer: 2 },
        { q: "Which constraint ensures all values in a column are different?", options: ["NOT NULL", "PRIMARY KEY", "UNIQUE"], answer: 2 },
        { q: "Which type of command is CREATE TABLE?", options: ["DML (Data Manipulation)", "DDL (Data Definition)", "DCL (Data Control)"], answer: 1 },
        { q: "The term for a vertical column in a table is:", options: ["Row", "Record", "Field"], answer: 2 }
    ],
    Python: [
            { q: "Which data structure is an ordered, immutable sequence of elements?", options: ["List", "Set", "Tuple"], answer: 2 },
            { q: "What is the primary purpose of the yield keyword?", options: ["To exit a function", "To define a generator", "To handle exceptions"], answer: 1 },
            { q: "Which statement is used for anonymous single-expression functions?", options: ["func", "def", "lambda"], answer: 2 },
            { q: "What is the correct way to open a file for writing (and overwrite existing content)?", options: ["open('file.txt', 'r')", "open('file.txt', 'w')", "open('file.txt', 'a')"], answer: 1 },
            { q: "Which method is used to add an element to the end of a list?", options: ["insert()", "add()", "append()"], answer: 2 },
            { q: "What is the term for converting a value from one data type to another?", options: ["Casting", "Type Coercion", "Type Conversion"], answer: 2 },
            { q: "What does the pass statement do?", options: ["Skips the current loop iteration", "Ignores an error", "Acts as a placeholder for code"], answer: 2 },
            { q: "Which symbol denotes a comment in Python?", options: ["//", "/* */", "#"], answer: 2 },
            { q: "What is the correct way to check if a key exists in a dictionary d?", options: ["'key' in d", "d.has_key('key')", "d.exists('key')"], answer: 0 },
            { q: "Python runs on an interpreter. True or False?", options: ["True", "False"], answer: 0 }
        ]
};

// ===== Quiz Logic (only runs when on quiz.html) =====
function createQuizLogic() {
    // load domain for this quiz
    let domain = localStorage.getItem('domain');
    if (!domain || !quizzes[domain] || quizzes[domain].length === 0) {
        alert("Please select a domain first!");
        window.location.href = 'domains.html';
        return;
    }

    let currentQuiz = quizzes[domain];
    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 60;
    let timerInterval = null;

    function startTimer() {
        const timerEl = document.getElementById('timer'); if (!timerEl) return;
        timerEl.innerText = `Time Left: ${timeLeft}s`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.innerText = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                // redirect to score when time up
                saveScore();
            }
        }, 1000);
    }

    function renderQuestion() {
        const container = document.getElementById('questionContainer'); 
        if (!container) return;
        container.innerHTML = '';

        // If finished, save and go to score
        if (currentQuestion >= currentQuiz.length) {
            saveScore();
            return;
        }

        const q = currentQuiz[currentQuestion];
        container.innerHTML = `
            <div class="quiz-card">
                <p class="question-text">${currentQuestion + 1}. ${q.q}</p>
                <div class="options-container">
                    ${q.options.map((o, i) => `<button class="optionBtn" data-index="${i}">${o}</button>`).join('')}
                </div>
            </div>
        `;

        const scoreEl = document.getElementById('liveScore'); 
        if (scoreEl) scoreEl.innerText = `Score: ${score}`;

        const optionBtns = container.querySelectorAll('.optionBtn');
        optionBtns.forEach(btn => {
            btn.onclick = () => {
                // disable all to avoid double clicks
                optionBtns.forEach(b => b.disabled = true);

                const index = parseInt(btn.dataset.index);
                if (index === q.answer) { 
                    btn.classList.add('correct'); 
                    score++; 
                } else { 
                    btn.classList.add('wrong'); 
                }

                if (scoreEl) scoreEl.innerText = `Score: ${score}`;

                // small delay for feedback then proceed
                setTimeout(()=> {
                    currentQuestion++;
                    if (currentQuestion >= currentQuiz.length) {
                        saveScore(); // go to score page
                    } else {
                        renderQuestion();
                    }
                }, 600);
            };
        });
    }

    // Save score and redirect
    function saveScore(){
        clearInterval(timerInterval);
        localStorage.setItem('score', score);
        localStorage.setItem('scoreUser', localStorage.getItem('currentUser') || 'Guest');
        localStorage.setItem('domain', domain);
        // Use replace so back doesn't return to quiz state
        window.location.replace('score.html');
    }

    // start quiz
    renderQuestion();
    startTimer();
}

// ===== Score page logic (only runs on score.html) =====
function createScorePage() {
    const scoreBox = document.getElementById('scoreBox');
    if (!scoreBox) return;

    const user = localStorage.getItem('scoreUser') || "Guest";
    const scoreValue = Number(localStorage.getItem('score') || 0);
    const domainName = localStorage.getItem('domain') || "Unknown";

    scoreBox.innerHTML = `
        <h2>🎉 Congratulations, ${user}! 🎉</h2>
        <p>You completed the <strong>${domainName}</strong> quiz.</p>
        <h1>Your Score: ${scoreValue}</h1>
    `;

    // small play again action: if Play Again clicked on page it goes to domains or quiz depending
    // (You already have play-again button markup in HTML that points to quiz.html; if you want change to domains.html edit HTML)

    // Confetti / sprinkle effect using confettiCanvas if present, else simple sprinkles
    const canvas = document.getElementById('confettiCanvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Confetti {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * -canvas.height;
                this.size = Math.random() * 7 + 4;
                this.speedY = Math.random() * 3 + 2;
                this.color = `hsl(${Math.random()*360},70%,60%)`;
                this.tilt = Math.random() * 10 - 5;
            }
            update() {
                this.y += this.speedY;
                this.x += Math.sin(this.y * 0.02);
                if (this.y > canvas.height) this.y = -this.size;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.moveTo(this.x + this.tilt, this.y);
                ctx.lineTo(this.x + this.tilt + this.size / 2, this.y + this.size);
                ctx.lineTo(this.x + this.tilt - this.size / 2, this.y + this.size);
                ctx.closePath();
                ctx.fill();
            }
        }

        const confettis = [];
        for (let i=0; i<120; i++) confettis.push(new Confetti());
        function animate() {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            confettis.forEach(c => { c.update(); c.draw(); });
            requestAnimationFrame(animate);
        }
        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    } else {
        // fallback: little DOM sprinkles
        for (let i = 0; i < 30; i++) {
            const s = document.createElement('div');
            s.className = 'sprinkle';
            s.style.left = Math.random()*100 + 'vw';
            s.style.top = (Math.random()*30) + 'vh';
            document.body.appendChild(s);
        }
    }
}

// ===== Initialize only appropriate page logic (VERY IMPORTANT) =====
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('questionContainer')) {
        // we are on quiz page -> create quiz logic
        createQuizLogic();
    } else if (document.getElementById('scoreBox')) {
        // we are on score page -> show score and confetti
        createScorePage();
    } else {
        // other pages (auth/domains) — nothing extra needed
    }
});
