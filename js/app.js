var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    databaseURL: "",
  };
firebase.initializeApp(firebaseConfig);


const newPostRef = firebase.database().ref();

var now = new Date();

$("#send").on("click", function () {
  newPostRef.push({
    title: $("#title").val(),
    author: $("#author").val(),
    category: $("#category").val(),
    pages: $("#pages").val(),
    notes: $("#notes").val(),
    date:
      now.getFullYear() +
      "/" +
      (now.getMonth() + 1) +
      "/" +
      now.getDate() +
      " ",
  });
  $("#title").val(""); //空にする
  $("#author").val(""); //空にする
  $("#category").val(""); //空にする
  $("#pages").val(""); //空にする
  $("#notes").val(""); //空にする
});

newPostRef.on("child_added", function (data) {
  let v = data.val();
  // let k = data.key;

  var readingData = [];

  readingData.push({ date: v.date, category: v.category, page: v.pages });

  for (var i = 0; i < readingData.length; ++i) {
    var readingDatum = readingData[i];

    $("#tbody").append(
      `<tr><td>${readingDatum["date"]}</td><td>${readingDatum["category"]}</td><td>${readingDatum["page"]}<br></td></tr>`
    );
    // var result = readingData.filter(function(){
    //   return readingDatum["category"] === "IT"
    // })

    if(readingDatum["category"] === "IT"){
      // console.log(readingDatum["page"]);
      var readingPage = Number(readingDatum["page"]);
      var readingTotal = 0;
      readingTotal += readingPage;
      console.log(readingTotal);
    }
    // var readingTotal = 0;
    // var readingPage = Number(readingTotal["page"])
    // console.log(readingPage);
    // readingTotal += readingPage
    // console.log(readingTotal);
  }
});

var ctx = $('#myChart');
var myBarChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["ビジネス", "IT", "小説", "学問","その他"], //v.categoryに登録したカテゴリーを並べたい
    datasets: [{
        backgroundColor: [
            "#c97586",
            "#bbbcde",
            "#93b881",
            "#e6b422"
        ],
        data: [45, 32, 18, 13, 5] //カテゴリ別の集計データを置きたい
    }]
  },
  options: {
    title: {
      display: true,
      //グラフタイトル
      text: '読書カテゴリ'
    }
  }
});
