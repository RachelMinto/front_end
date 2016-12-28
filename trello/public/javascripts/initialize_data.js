App.user = new User()

App.board = new Board();
App.board.fetch({ 
  url: "/data/default_board.json", 
  success: function() {
    console.log("JSON file load was successful", board);
    },
  error: function(){
    console.log('There was some error in loading and processing the JSON file');
  }
});