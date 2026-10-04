// it decides the remark using if, else if, else
function evaluateScore(score) {
  if (score >= 90 && score <= 100) {
    return "Excellent";
  } else if (score >= 75 && score <= 89) {
    return "Passed";
  } else if (score > 0 && score < 75) {
    return "Failed";
  } else {
    return "Invalid score";
  }
}

// Returns an error message, or "" (blank) if the input is valid
function checkInput(name, text) {
  if (name === null || text === null) return "Input was cancelled.";
  if (name.trim() === "" || text.trim() === "")
    return "Name and score must not be empty.";
  var score = Number(text);
  if (isNaN(score)) return "Score must be a number.";
  if (score === 0) return "Score cannot be zero.";
  if (score < 0) return "Score cannot be negative.";
  if (score > 100) return "Score cannot be more than 100.";
  return "";
}

// Shows the result on the webpage
function showResult(remark, line1, line2) {
  document.getElementById("result").innerHTML =
    '<div class="result-box ' +
    remark.split(" ")[0] +
    '">' +
    '<div class="stamp">' +
    remark +
    "</div>" +
    '<div class="details"><p class="name">' +
    line1 +
    "</p><p>" +
    line2 +
    "</p></div></div>";
}

// Past results
var records = [];
function addHistory(name, score, remark) {
  records.unshift(
    "<li><span>" +
      name +
      " (" +
      score +
      ")</span><span>" +
      remark +
      "</span></li>",
  );
  document.getElementById("historyList").innerHTML = records.join("");
  document.getElementById("historyBox").hidden = false;
}

// main program
function start() {
  alert("Welcome to the Score Evaluator!");
  var name = prompt("Please Enter your Full Name:");
  var text = prompt("Please Enter your Score (1 - 100):");

  var error = checkInput(name, text);
  if (error !== "") {
    alert("Error: " + error);
    showResult("Invalid score!", "Error", error);
    return;
  }

  if (!confirm("Boolaga " + name.trim() + "! Do you want to continue?")) {
    return;
  }

  var score = Number(text);
  var remark = evaluateScore(score);
  var safeName = name.trim().replace(/</g, "&lt;");
  showResult(remark, safeName, "Score: " + score);
  addHistory(safeName, score, remark);
  document.getElementById("againBtn").hidden = false;
}

document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("againBtn").addEventListener("click", start);

// Change and reset the background image
document.getElementById("bgInput").addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (file) {
    document.documentElement.style.setProperty(
      "--bg-image",
      'url("' + URL.createObjectURL(file) + '")',
    );
  }
});
document.getElementById("resetBg").addEventListener("click", function () {
  document.documentElement.style.removeProperty("--bg-image");
});
