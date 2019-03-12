 //////////////////////////////////////////////////////////////////////////////
 // crystal-game/assets/javascript/game.js
 // jQuery Crystal Game
 //
 // 2040 Monday, 11 March 2019 (EDT) [17966]
 //
 // University of Richmond Coding Boot Camp run by Trilogy Education Services
 // Austin Kim
 //
 // Modified:
 //   0032 Tuesday, 12 March 2019 (EDT) [17967]
 //////////////////////////////////////////////////////////////////////////////

 // GLOBAL PARAMETERS, VARIABLES, AND OBJECTS

 // Game parameters
var goalRangeLower = 19                  // Lower and...
var goalRangeUpper = 120                 // ...upper range of random point goal
var crystalRangeLower = 1                // Lower and...
var crystalRangeUpper = 12               // ...upper range of crystal point goal

 // Player names
var player1, player2

 // Player scores
var score = {
  p1: 0,
  p2: 0}

 // Which player went first in the most recent game
 //   (0 = no one; 1 = player 1; 2 = player 2)
var whoWentFirst = 0

 // Game over status
var gameOver

 // GAME OBJECT
var game = {
   // Object member variables
  goal: 0,                               // Point goal for the game
  crystal0: 0,                           // Crystal 0's point value
  crystal1: 0,                           // Crystal 1's point value
  crystal2: 0,                           // Crystal 2's point value
  crystal3: 0,                           // Crystal 3's point value
  p1points: 0,                           // Player 1's points
  p2points: 0,                           // Player 2's points
  turn: 0,                               // Player turn (1 = pl. 1, 2 = pl. 2)
  p1pass: false,                         // Player 1 passed last go-round
  p2pass: false,                         // Player 2 passed last go-round

 // init():  Initialize game
  init() {
   // Set game goal points
    this.goal = Math.floor((goalRangeUpper - goalRangeLower + 1) *
      Math.random()) + goalRangeLower
    var element = document.getElementById('goal')
    element.textContent = this.goal.toString()
   // Set crystal point values
    this.crystal0 = Math.floor((crystalRangeUpper - crystalRangeLower + 1) *
      Math.random()) + crystalRangeLower
    this.crystal1 = Math.floor((crystalRangeUpper - crystalRangeLower + 1) *
      Math.random()) + crystalRangeLower
    this.crystal2 = Math.floor((crystalRangeUpper - crystalRangeLower + 1) *
      Math.random()) + crystalRangeLower
    this.crystal3 = Math.floor((crystalRangeUpper - crystalRangeLower + 1) *
      Math.random()) + crystalRangeLower
   // Reset player points for this game
    this.p2points = this.p1points = 0
    updatePoints()
   // Use jQuery to clear crystal collections
    $('#p1crystals').empty()
    $('#p2crystals').empty()
   // Initialize player turn
     // If this be the first game, toss a coin
    if (whoWentFirst === 0) this.turn = Math.floor(2 * Math.random()) + 1
     // Otherwise, alternate
      else this.turn = 3 - whoWentFirst
    whoWentFirst = this.turn
    this.p2pass = this.p1pass = false
   // Update player turn on page
    this.updateTurn()
   // Start a new game
    gameOver = false
    return},

 // addCrystal(crystal):  Use jQuery to add crystal to crystal collection
  addCrystal(crystal) {
   // Set crystal image per crystal parameter to method
    var image
    switch (crystal) {
      case 0:
        image = "<img class='crystal' src='assets/images/crystal0alpha.png'/>"
        break
      case 1:
        image = "<img class='crystal' src='assets/images/crystal1alpha.png'/>"
        break
      case 2:
        image = "<img class='crystal' src='assets/images/crystal2alpha.png'/>"
        break
      case 3:
        image = "<img class='crystal' src='assets/images/crystal3alpha.png'/>"
        }
   // Add specified crystal image to current player's crystal collection
    if (this.turn === 1) $('#p1crystals').append(image)
      else               $('#p2crystals').append(image)
    return},

 // updateTurn():  Update player turn on page
  updateTurn() {
   // Update player 1 turn field
    var element = document.getElementById('p1turn')
    if (this.turn === 1) element.textContent = 'Your turn'
      else element.textContent = this.p1pass ? 'Pass' : ''
   // Update player 2 turn field
    element = document.getElementById('p2turn')
    if (this.turn === 2) element.textContent = 'Your turn'
      else element.textContent = this.p2pass ? 'Pass' : ''
    return}
  }

 // GLOBAL FUNCTIONS

 // Global resetAll() function (called at beginning and when button is pressed)
function resetAll() {
   // Set player 1 name
  var playername = document.getElementById('player1name')
  var player = document.getElementById('player1')
  if (playername.value  === '') player1 = 'Player 1'
    else player1 = playername.value
  player.textContent = player1
   // Set player 2 name
  playername = document.getElementById('player2name')
  player = document.getElementById('player2')
  if (playername.value === '') player2 = 'Player 2'
    else player2 = playername.value
  player.textContent = player2
   // Reset scores
  score.p2 = score.p1 = 0
  var scorediv = document.getElementById('p1score')
  scorediv.textContent = score.p1
  scorediv = document.getElementById('p2score')
  scorediv.textContent = score.p2
   // Initialize game
  game.init()
  return}

 // Global updateScore() function to update players' scores on page
function updateScore() {
  var element = document.getElementById('p1score')
  element.textContent = score.p1.toString()
  element = document.getElementById('p2score')
  element.textContent = score.p2.toString()
  return}

 // Global updatePoints() function to update players' points on page
function updatePoints() {
  var element = document.getElementById('p1points')
  element.textContent = game.p1points.toString()
  element = document.getElementById('p2points')
  element.textContent = game.p2points.toString()
  return}

 // MODAL CALLBACK FUNCTIONS

 // If _Reset All_ be clicked, stop any currently playing game
var element = document.getElementById('resetAll')
element.onclick = function() {
  gameOver = true
  return}

 // Likewise, if _New Game_ be clicked, stop any currently playing game
element = document.getElementById('newGame')
element.onclick = function() {
  gameOver= true
  return}

 // When the reset modal is activated, autofocus on the player name input field
$('#resetModal').on('shown.bs.modal', function() {
  $('#player1name').trigger('focus')}
  )

 // These two callback functions are called when a user clicks on either _OK_
 //   or _Cancel_ (but not _Close_) in the player-name-setting reset modal,
 //   either of which will start the game
$('#resetModalOK').click(function() {
  resetAll()}
  )
$('#resetModalCancel').click(function() {
  resetAll()}
  )

 // When the settings modal is activated, autofocus on the first input field
$('#settingsModal').on('shown.bs.modal', function() {
  $('#goalRangeLower').trigger('focus')}
  )

 // This function is called when a user clicks on _OK_ in the settings modal
$('#settingsModalOK').click(function() {
   // String and number variables for validation
  var value, number
   // Get goal range lower limit
  var element = document.getElementById('goalRangeLower')
  value = element.value
  if (value === '') number = goalRangeLower
    else number = parseInt(value)
   // Validate goal range lower limit
  if (isNaN(number)) $('#invalidGoalRangeModal').modal('show')
    else if (number < 1) $('#invalidGoalRangeModal').modal('show')
      else {
        goalRangeLower = number
   // Get goal range upper limit
        element = document.getElementById('goalRangeUpper')
        value = element.value
        if (value === '') number = goalRangeUpper
          else number = parseInt(value)
   // Validate goal range upper limit
        if (isNaN(number)) $('#invalidGoalRangeModal').modal('show')
          else if (number < goalRangeLower)
            $('#invalidGoalRangeModal').modal('show')
            else {
              goalRangeUpper = number
   // Get crystal point range lower limit
              element = document.getElementById('crystalRangeLower')
              value = element.value
              if (value === '') number = crystalRangeLower
                else number = parseInt(value)
   // Validate crystal point range lower limit
              if (isNaN(number)) $('#invalidCrystalPointModal').modal('show')
                else if (number < 1)
                  $('#invalidCrystalPointModal').modal('show')
                  else {
                    crystalRangeLower = number
   // Get crystal point range upper limit
                    element = document.getElementById('crystalRangeUpper')
                    value = element.value
                    if (value === '') number = crystalRangeUpper
                      else number = parseInt(value)
   // Validate crystal point range upper limit
                    if (isNaN(number))
                      $('#invalidCrystalPointModal').modal('show')
                      else if (number < crystalRangeLower ||
                       goalRangeUpper < number)
                        $('#invalidCrystalPointModal').modal('show')
                        else {
                          crystalRangeUpper = number
   // Finally, update the instructions with these new numbers
                          element = document.getElementById('instructionsText')
                          var instructions = 'Enter your player names (or ' +
                            'click on Cancel to accept the defaults); then ' +
                            'take turns collecting (clicking on) crystals ' +
                            'to add them to your collection.  Each crystal ' +
                            'has a random point value from ' +
                            crystalRangeLower.toString() +
                            (crystalRangeLower === 1 ? ' point ' : ' points ') +
                            'to ' + crystalRangeUpper.toString() +
                            (crystalRangeUpper === 1 ? ' point ' : ' points ') +
                            '(which is fixed for the duration of the game).  ' +
                            'Your goal is to collect crystals in order to ' +
                            'accumulate points up to, but not exceeding, ' +
                            'the point goal, which is a random number from ' +
                            goalRangeLower.toString() + ' to ' +
                            goalRangeUpper.toString() +
                            (goalRangeUpper === 1 ? ' point ' : ' points ') +
                            '(also fixed for the duration of the game).'
                          element.textContent = instructions}
                    }
              }
        }
  })

 // This function is called when a user clicks on _OK_ in the invalid goal
 //   range modal
$('#invalidGoalRangeOK').click(function() {
   // Return to settings modal
  $('#settingsModal').modal('show')}
  )

 // This function is called when a user clicks on _OK_ in the invalid crystal
 //   point range modal
$('#invalidCrystalPointOK').click(function() {
   // Return to settings modal
  $('#settingsModal').modal('show')}
  )

 // This function is called when a user clicks on the _New Game_ button
$('#newGame').click(function() {
   // Initialize game
  game.init()}
  )

 // These functions are called when a user clicks on the corresponding crystals
 //   or on the Pass button
$('#pass').click(function() {
  addCrystal(-1)}
  )
$('#crystal0').click(function() {
  addCrystal(0)}
  )
$('#crystal1').click(function() {
  addCrystal(1)}
  )
$('#crystal2').click(function() {
  addCrystal(2)}
  )
$('#crystal3').click(function() {
  addCrystal(3)}
  )

 // This main function is called when a user has clicked on a crystal (or Pass)
function addCrystal(crystal) {
  var element                            // DOM element pointer
  if (gameOver) return
  switch (crystal) {
   // Case -1:  User has clicked on the Pass button
    case -1:
      if (game.turn === 1 && game.p2pass || game.turn === 2 && game.p1pass) {
        if (game.p1points > game.p2points) {
          element = document.getElementById('p1turn')
          element.textContent = 'You win'
          element = document.getElementById('p2turn')
          element.textContent = 'Pass'
          ++score.p1}
          else if (game.p2points > game.p1points) {
            element = document.getElementById('p2turn')
            element.textContent = 'You win'
            element = document.getElementById('p1turn')
            element.textContent = 'Pass'
            ++score.p2}
            else {
              element = document.getElementById('p1turn')
              element.textContent = 'You tie'
              element = document.getElementById('p2turn')
              element.textContent = 'You tie'
              score.p1 += 0.5
              score.p2 += 0.5}
        updateScore()
        gameOver = true}
        else {
          if (game.turn === 1) game.p1pass = true
            else               game.p2pass = true
          game.turn = 3 - game.turn
          game.updateTurn()}
      return
   // Cases 0--3:  User has clicked on the corresponding crystal
    case 0:
      if (game.turn === 1) game.p1points += game.crystal0
        else               game.p2points += game.crystal0
      break
    case 1:
      if (game.turn === 1) game.p1points += game.crystal1
        else               game.p2points += game.crystal1
      break
    case 2:
      if (game.turn === 1) game.p1points += game.crystal2
        else               game.p2points += game.crystal2
      break
    case 3:
      if (game.turn === 1) game.p1points += game.crystal3
        else               game.p2points += game.crystal3
      }
  if (game.turn === 1) game.p1pass = false
    else               game.p2pass = false
  game.addCrystal(crystal)
  updatePoints()
  if (game.p1points === game.goal) {
    element = document.getElementById('p1turn')
    element.textContent = 'You win'
    ++score.p1
    updateScore()
    gameOver = true}
    else if (game.p2points === game.goal) {
      element = document.getElementById('p2turn')
      element.textContent = 'You win'
      ++score.p2
      updateScore()
      gameOver = true}
      else if (game.p1points > game.goal) {
        element = document.getElementById('p1turn')
        element.textContent = 'Bust'
        element = document.getElementById('p2turn')
        element.textContent = 'You win'
        ++score.p2
        updateScore()
        gameOver = true}
        else if (game.p2points > game.goal) {
          element = document.getElementById('p2turn')
          element.textContent = 'Bust'
          element = document.getElementById('p1turn')
          element.textContent = 'You win'
          ++score.p1
          updateScore()
          gameOver = true}
          else {
            game.turn = 3 - game.turn
            game.updateTurn()}
  return}

 // Show reset modal to start it all
$(document).ready(function() {
  $('#resetModal').modal('show')}
  )
